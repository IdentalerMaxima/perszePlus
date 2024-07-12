<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as PasswordRules;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Log; // Import Log facade
use App\Models\User;

class ResetPasswordController extends Controller
{
    public function showReset($token)
    {
        //Log::info('Password reset token received', ['token' => $token]);
        return redirect('http://localhost:3000/resetPassword/' . $token);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => [
                'required',
                'confirmed',
                PasswordRules::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
        ]);

        // Log::info('Password reset attempt', [
        //     'email' => $request->input('email'),
        //     'token' => $request->input('token'),
        // ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
     
                $user->save();
     
                event(new PasswordReset($user));

                //Log::info('Password has been reset for user', ['email' => $user->email]);
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            //Log::info('Password reset successful', ['email' => $request->input('email')]);
            return response()->json(['message' => __('Your password has been reset!')], 200);
        } else {
            //Log::warning('Password reset failed', ['email' => $request->input('email'), 'status' => $status]);
            return response()->json(['error' => __($status)], 400);
        }
        
    }
}
