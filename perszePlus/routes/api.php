<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AvatarUploadController;
use App\Http\Controllers\CheckInController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UniversityController;
use App\Http\Controllers\UserDataController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\QrController;
use App\Http\Controllers\MessageController;

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
    
    

    //Events
    Route::post('/addEvent', [EventController::class, 'store']);
    Route::post('/updateAttendance', [EventController::class, 'updateAttendance']);
    Route::post('/updateMissedEvents', [EventController::class, 'updateMissedEvents']);

    Route::post('/addPost', [PostController::class, 'store']);
    Route::post('/addComment', [CommentController::class, 'store']);
    Route::post('/addCourse', [CourseController::class, 'store']);
    Route::post('/changeCourseImage/{id}', [CourseController::class, 'changeCourseImage']);
    Route::post('/subscribeToCourse/{id}', [CourseController::class, 'subscribeToCourse']);
    Route::post('/unsubscribeFromCourse/{id}', [CourseController::class, 'unsubscribeFromCourse']);

    //QR
    Route::get('/generateQr/{id}', [QrController::class, 'generate']);
    Route::post('/checkInEvent', [CheckInController::class, 'checkInEvent']);

    //Messages
    Route::get('/messages', [MessageController::class, 'index']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
    Route::put('/messages/{id}/read', [MessageController::class, 'markAsRead']);
    Route::post('/messages', [MessageController::class, 'store']);

    //Searchbar
    Route::get('/users', [UserDataController::class, 'searchUsers']);


    //User
    Route::post('/user/info', [UserDataController::class, 'saveUserData']);
    Route::get('/user/info', [UserDataController::class, 'getUserData']);
    Route::get('/user/settings', [UserDataController::class, 'getUserSettings']);
    Route::post('/user/saveSettings', [UserDataController::class, 'saveUserSettings']);
    //Route::get('/userById/{id}', [UserDataController::class, 'getUserById']);
    

    //Documents
    Route::get('/user/documents', [DocumentController::class, 'index']);
    Route::get('/user/getDocumentsOfUser/{id}', [DocumentController::class, 'getDocumentsOfUser']);
    Route::get('/user/documents/{id}', [DocumentController::class, 'download']);
    Route::get('/user/documents/show/{id}', [DocumentController::class, 'show']);

    //Admin
    Route::post('/admin/invite', [AdminController::class, 'invite']);
    Route::get('/admin/settings', [AdminController::class, 'getSettings']);
    Route::post('/admin/saveSettings', [AdminController::class, 'saveSettings']);
    


    

    Route::get('/getMemberList', [UserDataController::class, 'getAllUsers']);
    

    Route::get('/getEvents', [EventController::class, 'index']);
    Route::get('/getEventsOfUser/{id}', [EventController::class, 'getEventsOfUser']);
    
    Route::get('/getUsersByCategory', [UserDataController::class, 'getUsersByCategory']);
    Route::get('/getCountOfDocumentsByType', [DocumentController::class, 'getCountOfDocumentsByType']);
    Route::get('/getUsersByLevelOfEducation', [UserDataController::class, 'getUsersByLevelOfEducation']);
    Route::get('/getUsersByYearsInEducation', [UserDataController::class, 'getUsersByYearsInEducation']);
    Route::get('/getPosts', [PostController::class, 'index']);
    Route::get('/getComments', [CommentController::class, 'index']);
    Route::get('/getCourses', [CourseController::class, 'index']);
    Route::get('/checkEnrollment/{id}', [CourseController::class, 'checkEnrollment']);
    

    Route::delete('/user/documents/{id}', [DocumentController::class, 'delete']);
    Route::delete('/deleteEvent/{id}', [EventController::class, 'delete']);
    Route::delete('/deletePost/{id}', [PostController::class, 'destroy']);
    Route::delete('/deleteComment/{id}', [CommentController::class, 'destroy']);
    Route::delete('/deleteCourse/{id}', [CourseController::class, 'destroy']);

    Route::put('editEvent/{id}', [EventController::class, 'update']);
    Route::put('editPost/{id}', [PostController::class, 'update']);
    Route::put('editComment/{id}', [CommentController::class, 'update']);
    Route::put('editCourse/{id}', [CourseController::class, 'update']);

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/universities', [UniversityController::class, 'getUniversities']);
Route::get('/universities/{universityName}/faculties', [UniversityController::class, 'getFacultiesForUniversity']);

//Validate registration token
Route::get('/validateToken/{token}', [AuthController::class, 'validateToken']);
Route::get('/admin/registration/restricted', [AdminController::class, 'adminRegistrationRestricted']);

Route::post('/forgotPassword', [ForgotPasswordController::class, 'forgotPassword'])->name('password.request');  
Route::get('/resetPassword/{token}', [ResetPasswordController::class, 'showReset'])->name('password.reset');
Route::post('/resetPassword', [ResetPasswordController::class, 'resetPassword'])->name('password.update');






