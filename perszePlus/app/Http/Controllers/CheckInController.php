<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Log;

class CheckInController extends Controller
{
    public function checkInEvent(Request $request)
{
    $eventId = $request->eventId;
    $user = $request->user();

    if (!$eventId || !$user) {
        return response()->json(['message' => 'Event ID or User not found'], 400);
    }

    $event = Event::find($eventId);

    if (!$event) {
        return response()->json(['message' => 'Event not found'], 404);
    }

    if ($event->users()->where('user_id', $user->id)->exists()) {
        // Only update this specific user-event pair
        $event->users()->updateExistingPivot($user->id, ['status' => 'went']);
    } else {
        // Only create a new record for this user-event pair
        $event->users()->attach($user->id, ['status' => 'went']);
    }

    return response()->json(['message' => 'Checked in successfully'], 200);
}



}
