<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\Invite;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'imageUrl' => null,
        ]);

       

        $user->settings()->create();

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);

    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response()->json(['message' => 'Unauthorized'], 422);
        }

        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        
        return response([
            'success' => true,
        ]);
    }

    public function validateToken($token)
    {
        $payload = json_decode(base64_decode($token), true);

        $email = $payload['email'];

        if ($payload['expires'] < now()->timestamp) {
            return response()->json(['message' => 'Token expired'], 400);
        }

        return response()->json(['email' => $email, 'message' => 'Token valid'], 200);
    }
        
}
