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

Route::middleware('auth:sanctum')->group(function () {
    
    //Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    //Events
    Route::post('/addEvent', [EventController::class, 'store']);
    Route::post('/updateAttendance', [EventController::class, 'updateAttendance']);
    Route::post('/setMissedStatus', [EventController::class, 'setMissedStatus']);
    Route::post('/closeEvent', [EventController::class, 'closeEvent']);
    Route::post('/reopenEvent', [EventController::class, 'reopenEvent']);
    Route::get('/getEvents', [EventController::class, 'index']);
    Route::get('/getEventsOfUser/{id}', [EventController::class, 'getEventsOfUser']);
    Route::delete('/deleteEvent/{id}', [EventController::class, 'delete']);
    Route::put('editEvent/{id}', [EventController::class, 'update']);

    //Posts
    Route::post('/addPost', [PostController::class, 'store']);
    Route::get('/getPosts', [PostController::class, 'index']);
    Route::delete('/deletePost/{id}', [PostController::class, 'destroy']);
    Route::put('editPost/{id}', [PostController::class, 'update']);
    
    //Comments
    Route::post('/addComment', [CommentController::class, 'store']);
    Route::get('/getComments', [CommentController::class, 'index']);
    Route::delete('/deleteComment/{id}', [CommentController::class, 'destroy']);
    Route::put('editComment/{id}', [CommentController::class, 'update']);

    //Courses
    Route::post('/addCourse', [CourseController::class, 'store']);
    Route::get('/getCourses', [CourseController::class, 'index']);
    Route::get('/getCourseById/{id}', [CourseController::class, 'getCourseById']);
    Route::post('/changeCourseImage/{id}', [CourseController::class, 'changeCourseImage']);
    Route::post('/subscribeToCourse/{id}', [CourseController::class, 'subscribeToCourse']);
    Route::post('/unsubscribeFromCourse/{id}', [CourseController::class, 'unsubscribeFromCourse']);
    Route::get('/checkEnrollment/{id}', [CourseController::class, 'checkEnrollment']);
    Route::delete('/deleteCourse/{id}', [CourseController::class, 'destroy']);
    Route::put('editCourse/{id}', [CourseController::class, 'update']);

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
    Route::get('/getUserById/{id}', [UserDataController::class, 'getUserById']);
    Route::post('/upload/avatar', [AvatarUploadController::class, 'upload']);
    Route::get('/getMemberList', [UserDataController::class, 'getAllUsers']);
    Route::get('/getUsersByCategory', [UserDataController::class, 'getUsersByCategory']);
    Route::get('/getUsersByLevelOfEducation', [UserDataController::class, 'getUsersByLevelOfEducation']);
    Route::get('/getUsersByYearsInEducation', [UserDataController::class, 'getUsersByYearsInEducation']);
    

    //Documents
    Route::get('/user/documents', [DocumentController::class, 'index']);
    Route::get('/user/getDocumentsOfUser/{id}', [DocumentController::class, 'getDocumentsOfUser']);
    Route::get('/user/documents/{id}', [DocumentController::class, 'download']);
    Route::get('/user/documents/show/{id}', [DocumentController::class, 'show']);
    Route::post('/upload/file', [DocumentController::class, 'upload']);
    Route::get('/getCountOfDocumentsByType', [DocumentController::class, 'getCountOfDocumentsByType']);
    Route::delete('/user/documents/{id}', [DocumentController::class, 'delete']);

    //Admin
    Route::post('/admin/invite', [AdminController::class, 'invite']);
    Route::get('/admin/settings', [AdminController::class, 'getSettings']);
    Route::post('/admin/saveSettings', [AdminController::class, 'saveSettings']);

});

//Auth
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/validateToken/{token}', [AuthController::class, 'validateToken']);

//University
Route::get('/universities', [UniversityController::class, 'getUniversities']);
Route::get('/universities/{universityName}/faculties', [UniversityController::class, 'getFacultiesForUniversity']);

//Admin
Route::get('/admin/registration/restricted', [AdminController::class, 'adminRegistrationRestricted']);

//Forgot and Reset Password
Route::post('/forgotPassword', [ForgotPasswordController::class, 'forgotPassword'])->name('password.request');  
Route::get('/resetPassword/{token}', [ResetPasswordController::class, 'showReset'])->name('password.reset');
Route::post('/resetPassword', [ResetPasswordController::class, 'resetPassword'])->name('password.update');