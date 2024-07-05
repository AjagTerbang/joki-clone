<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\QuestionController;
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

Route::prefix('courses')->group(function () {
    Route::get('/', [CourseController::class, 'index']);
    Route::post('/', [CourseController::class, 'createCourse']);
    Route::delete('/{id}', [CourseController::class, 'deleteCourse']);

    Route::get('/{id}', [CourseController::class, 'courseById']);
    Route::get('/{id}/modules', [ModuleController::class, 'modulesByCourseId']);
    Route::post('/{id}/modules', [ModuleController::class, 'createModule']);
});

Route::prefix('modules')->group(function () {
    Route::get('/', [ModuleController::class, 'index']);
    Route::get('/{id}', [ModuleController::class, 'modulesById']);
    Route::put('/{id}', [ModuleController::class, 'updateModule']);
    Route::delete('/{id}', [ModuleController::class, 'deleteModule']);

    Route::get('/{id}/questions', [QuestionController::class, 'questionsByModuleId']);
    Route::post('/{id}/questions', [QuestionController::class, 'createQuestion']);
    Route::post('/{id}/questions/submit', [QuestionController::class, 'submitQuestion']);
});

Route::prefix('questions')->group(function () {
    Route::get('/', [QuestionController::class, 'index']);
    Route::get('/{id}', [QuestionController::class, 'questionById']);
    Route::put('/{id}', [QuestionController::class, 'updateQuestion']);
    Route::delete('/{id}', [QuestionController::class, 'deleteQuestion']);

    Route::get('/{id}/options', [OptionController::class, 'optionsByQuestionId']);
    Route::post('/{id}/options', [OptionController::class, 'createOption']);
});

Route::prefix('options')->group(function () {
    Route::get('/', [OptionController::class, 'index']);
    Route::get('/{id}', [OptionController::class, 'optionById']);
    Route::put('/{id}', [OptionController::class, 'updateOption']);
    Route::delete('/{id}', [OptionController::class, 'deleteOption']);
});

Route::get('/findcourse/{id}', [CourseController::class, 'courseById']);
Route::post('/updatecourse/{id}', [CourseController::class, 'updateCourse']);

Route::post('/login', [UsersController::class, 'login']);
Route::post('/register', [UsersController::class, 'register']);
Route::post('/register-admin', [UsersController::class, 'registerAdmin']);
