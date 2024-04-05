<?php

namespace App\Http\Controllers;

use App\Http\Requests\AvatarUploadRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AvatarUploadController extends Controller
{
    /**
     * Upload the user's avatar.
     *
     * @param  AvatarUploadRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(AvatarUploadRequest $request)
    {
        // Store the uploaded avatar file in the 'avatars' directory within the 'storage/app' directory
        $path = $request->file('avatar')->store('public/avatars');

        

        // Update the authenticated user's avatar path in the database
        $user = Auth::user();
        //Log::info($user);

        $avatarUrl = asset(Storage::url($path));
        //Log::info($avatarUrl);

        $user->avatar_path = $avatarUrl;

        

        $user->save();
        //Log::info($user);

        

        // Return a JSON response with the path to the stored avatar
        return response()->json(['path' => $avatarUrl], 200);
    }
}
