<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invite;
use Illuminate\Support\Facades\Notification;
use App\Notifications\InviteNotification;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\AdminSettings;

class AdminController extends Controller
{
    public function invite(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'role' => 'required'
        ]);

        // Generate a unique token for the invite
        $token = $this->generateInviteToken($request->email);

        try {
            $invite = new Invite();
            $invite->sender = $request->user()->id;
            $invite->email = $request->email;
            $invite->role = $request->role;
            $invite->token = $token;
            $invite->save();

            // Send the invitation email
            Notification::route('mail', $request->email)
                ->notify(new InviteNotification($token, $request->role, $request->user()->first_name . ' ' . $request->user()->last_name));

            return response()->json(['message' => 'Invite sent'], 200);
        } catch (\Exception $e) {
            // Log the error and return a server error response
            Log::error('Error sending invite: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send invite'], 500);
        }
    }

    protected function generateInviteToken($email)
{
    try {
        $payload = [
            'email' => $email,
            'expires' => now()->addHours(24)->timestamp, // Example: token expiry
        ];

        $token = base64_encode(json_encode($payload));
        return $token;
    } catch (\Exception $e) {
        Log::error('Error generating invite token: ' . $e->getMessage());
        throw $e;
    }
}


    public function getSettings(Request $request)
    {
        // Return the first record from admin_settings table
        $adminSettings = AdminSettings::first();
        
        // Handle the case where no settings are found
        if (!$adminSettings) {
            return response()->json(['message' => 'Settings not found'], 404);
        }

        return response()->json($adminSettings);
    }

    public function saveSettings(Request $request)
    {
        $request->validate([
            'registration_only_with_invitation' => 'required|boolean'
        ]);

        $settings = AdminSettings::first();

        if (!$settings) {
            return response()->json(['message' => 'Settings not found'], 404);
        }

        try {
            $settings->update($request->all());
            return response()->json(['message' => 'Settings updated successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error updating settings: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update settings'], 500);
        }
    }

    public function adminRegistrationRestricted(Request $request)
    {
        $settings = AdminSettings::first();

        if (!$settings) {
            return response()->json(['message' => 'Settings not found'], 404);
        }

        return response()->json(['restricted' => $settings->registration_only_with_invitation]);
    }
}
