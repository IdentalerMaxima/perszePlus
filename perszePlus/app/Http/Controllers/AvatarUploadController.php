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
        // Get the authenticated user
        $user = Auth::user();
        //Log::info("User: " . $user->name);

        $this->deleteOldAvatar($user);

        // Store the uploaded avatar file in the 'avatars' directory within the 'storage/app' directory, also, laravel handles unique file names
        $path = $request->file('avatar')->store('public/avatars');
        //Log::info("Path to the stored avatar: " . $path);

        $avatarUrl = asset(Storage::url($path));
        //Log::info("Avatar URL: " . $avatarUrl);

        $user->avatar_path = $avatarUrl;
        $user->save();

        // Return a JSON response with the path to the stored avatar
        return response()->json(['path' => $avatarUrl], 200);
    }

    public function deleteOldAvatar($user)
    {
        $avatarPathFromDb = $user->avatar_path;
        //Log::info("Avatar path from DB: " . $avatarPathFromDb);

        $strippedAvatarPath = strstr($avatarPathFromDb, 'avatars');
        //Log::info("Stripped avatar path: " . $strippedAvatarPath);

        if ($strippedAvatarPath) {
            //Log::info('File exists.');
            Storage::disk('public')->delete($strippedAvatarPath);
        } else {
            //Log::info('File does not exist.');
        }
    }
}
