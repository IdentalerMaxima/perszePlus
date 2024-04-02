<?php

namespace App\Http\Controllers;

use App\Http\Requests\AvatarUploadRequest;

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
        $path = $request->file('avatar')->store('avatars');

        // Optionally, you can store the avatar path in the user's database record
        // $user->avatar_path = $path;
        // $user->save();

        // Return a JSON response with the path to the stored avatar
        return response()->json(['path' => $path], 200);
    }
}
