<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
// use App\Mail\RegistrationSuccessful;
// use Illuminate\Support\Facades\Mail;

use App\Models\User;

class GoogleAuthController extends Controller
{
    
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callBackGoogle()
{
    try {
        $google_user = Socialite::driver('google')->user();
        
        // Fetch existing user by email if they exist
        $existingUser = User::where('email', $google_user->getEmail())->first();

        // Define the attributes to update
        $updateData = [
            'google_id' => $google_user->getId(),
        ];

        // Check and set name if it's not already set
        if (!$existingUser || !$existingUser->name) {
            $updateData['name'] = $google_user->getName();
        }

        // Check and set profile picture if it's not already set
        if (!$existingUser || !$existingUser->profile_picture) {
            $updateData['profile_picture'] = $google_user->getAvatar();
        }

        // Update or create the user
        $user = User::updateOrCreate(
            ['email' => $google_user->getEmail()],
            $updateData
        );

        // Log the user in
        Auth::login($user);

        // Redirect to the intended dashboard
        return redirect()->intended('dashboard');

    } catch (\Throwable $th) {
        // Handle any exceptions
        \Log::error('Google login failed', ['error' => $th]);
        return redirect()->back()->with([
            'status' => 'couldntLoginWithGoogle',
        ]);
    }
}



}
