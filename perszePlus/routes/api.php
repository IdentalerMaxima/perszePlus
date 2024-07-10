<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AvatarUploadController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UniversityController;
use App\Http\Controllers\UserDataController;
use App\Http\Controllers\DocumentController;
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
    Route::post('/upload/file', [DocumentController::class, 'upload']);
    Route::post('/user/info', [UserDataController::class, 'saveUserData']);
    Route::post('/addEvent', [EventController::class, 'store']);
    Route::post('/updateAttendance', [EventController::class, 'updateAttendance']);


    Route::get('/user/info', [UserDataController::class, 'getUserData']);
    Route::get('/user/documents', [DocumentController::class, 'index']);
    Route::get('/user/documents/{id}', [DocumentController::class, 'download']);
    Route::get('/getMemberList', [UserDataController::class, 'getAllUsers']);
    Route::get('/user/{id}', [UserDataController::class, 'getUserById']);
    Route::get('/getEvents', [EventController::class, 'index']);
    Route::get('/getUsersByCategory', [UserDataController::class, 'getUsersByCategory']);
    Route::get('/getCountOfDocumentsByType', [DocumentController::class, 'getCountOfDocumentsByType']);
    Route::get('/getUsersByLevelOfEducation', [UserDataController::class, 'getUsersByLevelOfEducation']);
    Route::get('/getUsersByYearsInEducation', [UserDataController::class, 'getUsersByYearsInEducation']);

    Route::delete('/user/documents/{id}', [DocumentController::class, 'delete']);
    Route::delete('/deleteEvent/{id}', [EventController::class, 'delete']);

    Route::put('editEvent/{id}', [EventController::class, 'update']);



});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/universities', [UniversityController::class, 'getUniversities']);
Route::get('/universities/{universityName}/faculties', [UniversityController::class, 'getFacultiesForUniversity']);



