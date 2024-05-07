<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

        //Log::info('Data to save: ' . json_encode($request->all()));

        $userData = $request->all();

        $user->update($userData);

        return response()->json([
            'message' => 'User data saved successfully',
            'user' => $user
        ]);
    }


}
