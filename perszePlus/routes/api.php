<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AvatarUploadController;
use App\Http\Controllers\UniversityController;
use App\Http\Controllers\UserDataController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/upload/avatar', [AvatarUploadController::class, 'upload']);
    Route::get('/user/info', [UserDataController::class, 'getUserData']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/universities', [UniversityController::class, 'getUniversities']);
Route::get('universities/{universityName}/faculties', [UniversityController::class, 'getFacultiesForUniversity']);



