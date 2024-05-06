<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

        $user->update($request->all());

        return response()->json([
            'message' => 'User data saved successfully',
            'user' => $user
        ]);
    }
}
