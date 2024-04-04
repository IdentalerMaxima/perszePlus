<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;


class UserDataController extends Controller
{
    public function getUserData()
    {
        $user = auth()->user();
        Log::info($user);

        return response([
            'user' => $user
        ]);
    }
}
