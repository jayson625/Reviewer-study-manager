<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReviewerController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/reviewers', [ReviewerController::class, 'index']);
    Route::post('/reviewers', [ReviewerController::class, 'store']);
    Route::put('/reviewers/{reviewer}', [ReviewerController::class, 'update']);
    Route::delete('/reviewers/{reviewer}', [ReviewerController::class, 'destroy']);
    Route::patch('/reviewers/{reviewer}/toggle-done', [ReviewerController::class, 'toggleDone']);
});
