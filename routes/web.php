<?php

use App\Http\Controllers\CVController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfileUpdateController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BotController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\InterviewScheduleController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\OffersAndJobsController;
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
    if(Auth::user()->user_type == 'applicant')
    {
        return Inertia::render('Dashboard');
    }elseif(Auth::user()->user_type == 'recruiter')
    {
        return Inertia::render('Recruiter');
    }
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

// get rating
Route::get('/rating', [RatingController::class, 'rating']);

// get categories
Route::get('/categories', [ProfileUpdateController::class, 'fetchCategory']);
Route::get('/skills/{id}', [ProfileUpdateController::class, 'fetchSkills']);

// profile infos
Route::post('/title', [ProfileUpdateController::class, 'saveTitle'])->name('title.update');
Route::get('/user-title', [ProfileUpdateController::class, 'fetchTitle']);
Route::patch('/title', [ProfileUpdateController::class, 'updateTitle'])->name('title.edit');

// profile skills
Route::post('/profile/skills', [ProfileUpdateController::class, 'storeSkills'])->name('profile.skills.store');
Route::patch('/profile/skills', [ProfileUpdateController::class, 'updateSkills'])->name('profile.skills.update');
Route::get('/user/skills', [ProfileUpdateController::class, 'fetchUserSkills']);


//recruiter jobs
Route::get('/myjobs', [OffersAndJobsController::class, 'index']);
Route::get('/job/{jobId}', [OffersAndJobsController::class, 'show'])->name('show.Job');
Route::post('/createJob', [OffersAndJobsController::class, 'store'])->name('createJob');
Route::post('/editJob', [OffersAndJobsController::class, 'edit']);
Route::patch('/updateJob', [OffersAndJobsController::class, 'update']);
Route::delete('/deletejob/{jobId}', [OffersAndJobsController::class, 'destroy']);
Route::get('/searchMyJobs', [OffersAndJobsController::class, 'searchMyJobs']);
Route::get('/getCategories', [OffersAndJobsController::class, 'getCategories']);
Route::get('/getSkills', [OffersAndJobsController::class, 'getSkills']);


//for applications
Route::get('/mycompanyapplications', [ApplicationController::class, 'index']);
Route::post('/thisJobApplications', [ApplicationController::class, 'thisJobApplications']);
Route::post('/thisApplication', [ApplicationController::class, 'show']);
Route::post('/respondToApplicaton', [ApplicationController::class, 'respondToApplication']);



//for interview schedules recruiter
Route::get('/mySchedules', [InterviewScheduleController::class, 'index']);
Route::post('/getSchedule', [InterviewScheduleController::class, 'edit']);
Route::post('/createSchedules', [InterviewScheduleController::class, 'store']);
Route::post('/cancelSchedule', [InterviewScheduleController::class, 'cancelScheduleRecruiter']);
Route::post('/attendSchedule', [InterviewScheduleController::class, 'attendScheduleRecruiter']);
Route::patch('/updateSchedule', [InterviewScheduleController::class, 'update']);



//recruiter bot
Route::get('myBot', [BotController::class, 'index']);
Route::post('/filter', [BotController::class, 'filterApplications']);

//google auth registration
Route::get('auth/google',[GoogleAuthController::class, 'redirect'])->name('google_auth');

Route::get('auth/google/call-back',[GoogleAuthController::class, 'callBackGoogle']);



require __DIR__.'/auth.php';
