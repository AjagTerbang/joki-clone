<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
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

// Route::apiResource('courses', CourseController::class);
// Route::middleware('auth:api')->group(function () {
//     Route::get('/courses', [CourseController::class, 'index']);
// });

Route::get('/courses', [CourseController::class, 'index']);
Route::post('/courses', [CourseController::class, 'createCourse']);
Route::delete('/courses/{id}', [CourseController::class, 'deleteCourse']);
Route::get('/findcourse/{id}', [CourseController::class, 'courseById']);
Route::post('/updatecourse/{id}', [CourseController::class, 'updateCourse']);

Route::post('/login', [UsersController::class, 'login']);
Route::post('/register', [UsersController::class, 'register']);
Route::post('/register-admin', [UsersController::class, 'registerAdmin']);
