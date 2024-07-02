<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class UserDataController extends Controller
{
    public function getUserData(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => $user
        ]);
    }

    public function saveUserData(Request $request)
    {
        $user = $request->user();

        // Log::info('Data to save: ' . json_encode($request->all()));

        $userData = $request->all();

        // Log::info('User data: ' . json_encode($userData));

        $user->update($userData);

        return response()->json([
            'message' => 'User data saved successfully',
            'user' => $user
        ]);
    }

    public function getAllUsers()
    {
        $users = User::all(['id','first_name','last_name', 'category', 'avatar_path', 'university', 'faculty']);

        //Log::info('Users: ' . json_encode($users));

        return response()->json([
            'users' => $users
        ]);
    }

    public function getUserById($id)
    {
        $user = User::find($id);

        Log::info('User: ' . json_encode($user));

        return response()->json([
            'user' => $user
        ]);
    }

}
