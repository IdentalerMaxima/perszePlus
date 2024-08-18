<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Settings;
use App\Jobs\SendEmailJob;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with([
            'users' => function ($query) {
                $query->withPivot('status'); // Include 'status' pivot attribute
            }
        ])
            ->orderBy('date', 'asc')
            ->get();

        //Log::info('Events fetched successfully', ['events' => $events]);

        return response()->json($events, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date_format:Y-m-d H:i:s',
        ]);

        $event = new Event();
        $event->title = $request->title;
        $event->description = $request->description;
        $event->date = $request->date;

        $event->save();

        $users = User::all();
        $event->users()->attach($users, ['status' => 'not_answered']);

        $usersWithNotifications = Settings::where('receive_notification_new_event', true)
            ->pluck('user_id');
        $usersToNotify = User::whereIn('id', $usersWithNotifications)->get();

        foreach ($usersToNotify as $user) {
            SendEmailJob::dispatch($user, $event, 'event');
        }

        return response()->json([
            'message' => 'Event created successfully',
            'event' => $event
        ], 201);
    }

    public function delete($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found'
            ], 404);
        }

        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully'
        ], 200);
    }

    public function updateAttendance(Request $request)
    {

        $eventId = $request->input('eventId');
        $userId = $request->input('userId');
        $status = $request->input('status');

        $event = Event::find($eventId);
        $user = User::find($userId);

        if (!$event || !$user) {
            return response()->json([
                'message' => 'Event or user not found'
            ], 404);
        }

        $existingEvent = $event->users()->where('user_id', $user->id)->exists();

        if ($existingEvent) {
            $event->users()->updateExistingPivot($user->id, ['status' => $status]);
        } else {
            $event->users()->attach($user->id, ['status' => $status]);
        }

        return response()->json([
            'message' => 'Attendance updated successfully'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date_format:Y-m-d H:i:s',
        ]);

        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found'
            ], 404);
        }

        $event->title = $request->title;
        $event->description = $request->description;
        $event->date = $request->date;

        $event->save();

        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $event
        ], 200);
    }

    public function getEventsOfUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $events = $user->events()->withPivot('status')->get();

        return response()->json($events, 200);
    }

    public function setMissedStatus()
    {
        $now = now();
        $events = Event::where('date', '<', $now)->get();

        foreach ($events as $event) {
            $usersToUpdate = $event->users()
                ->wherePivot('status', '!=', 'went')
                ->wherePivot('status', '!=', 'missed')
                ->get();

            foreach ($usersToUpdate as $user) {
                $event->users()->updateExistingPivot($user->id, ['status' => 'missed']);
            }
        }



        return response()->json([
            'message' => 'Missed events updated successfully'
        ], 200);
    }

    public function closeEvent(Request $request)
    {
        $eventId = $request->input('eventId');

        $event = Event::find($eventId);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found'
            ], 404);
        }

        $event->closed = true;
        $event->save();

        return response()->json([
            'message' => 'Event closed successfully'
        ], 200);
    }

    public function reopenEvent(Request $request)
    {
        $eventId = $request->input('eventId');

        $event = Event::find($eventId);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found'
            ], 404);
        }

        $event->closed = false;
        $event->save();

        return response()->json([
            'message' => 'Event reopened successfully'
        ], 200);
    }

}
