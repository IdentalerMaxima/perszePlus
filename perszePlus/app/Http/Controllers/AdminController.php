<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Invite;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Notification;
use App\Notifications\InviteNotification;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    public function invite(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'role' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            return response()->json(['message' => 'User already exists'], 400);
        }

        $token = Str::random(60);

        try {
            $invite = new Invite();
            $invite->sender = $request->user()->first_name . ' ' . $request->user()->last_name;
            $invite->email = $request->email;
            $invite->role = $request->role;
            $invite->token = $token;
            $invite->save();

            // Use Notification facade to send the notification
            Notification::route('mail', $request->email)
                ->notify(new InviteNotification($token, $request->role, $request->user()->first_name . ' ' . $request->user()->last_name));

            return response()->json(['message' => 'Invite sent'], 200);
        } catch (\Exception $e) {
            // Log the error and return a server error response
            Log::error('Error sending invite: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send invite'], 500);
        }
    }
}
