<?php

use App\Http\Controllers\CVController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/recruiter', function () {
    return Inertia::render('Recruiter');
})->middleware(['auth', 'verified'])->name("recruiter.dashboard");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/user', [UserController::class, 'currentUser']);

// cv upload
Route::post('/upload-cv', [CVController::class, 'upload']);

// profile picture
Route::post('/upload-picture', [UserController::class, 'profilePicture']);

// profile-info
Route::get('/user-information', [UserController::class, 'profile']);

require __DIR__.'/auth.php';
