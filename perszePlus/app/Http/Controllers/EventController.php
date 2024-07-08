<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with(['users' => function ($query) {
            $query->withPivot('status'); // Include 'status' pivot attribute
        }])->get();

        //Log::info('Events fetched successfully', ['events' => $events]);

        return response()->json($events, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
        ]);

        $event = new Event();
        $event->title = $request->title;
        $event->description = $request->description;
        $event->date = $request->date;

        $event->save();

        //set all users to not_answered

        $users = User::all();
        $event->users()->attach($users, ['status' => 'not_answered']);

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

        // Retrieve data from the POST request
        $eventId = $request->input('eventId');
        $userId = $request->input('userId');
        $status = $request->input('status');

        $event = Event::find($eventId);
        $user = User::find($userId);

        //log the data
        //Log::info('Event and user data', ['eventId' => $eventId, 'userId' => $userId, 'status' => $status]);



        // Check if the event and user exist
        if (!$event || !$user) {
            return response()->json([
                'message' => 'Event or user not found'
            ], 404);
        }

        // Sync the user's attendance status, without detaching any other records
        $event->users()->sync([$user->id => ['status' => $status]], false);

        // Respond with a success message
        return response()->json(['message' => 'Attendance updated successfully'], 200);

    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
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

}
