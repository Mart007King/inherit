<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    // get current user
    public function currentUser()
    {
        $user = auth()->user();

        return $user;
    }

    public function profilePicture(Request $request) {

        $request->validate([
            "propic" => "required|mimes:png,jpg,jpeg|max:2048|image"
        ]);

        $user_id = auth()->id();        

        try {
            $image = $request->file("propic");

            // create a unique name for the image
            $filename = "Inherit" . $user_id . "." . $image->getClientOriginalExtension();

            // move the image
            $path = $image->move(public_path("image/dp"), $filename);
            
            // save the name in DB
            $user1 = User::find($user_id);
            $user1->profile_picture = $filename;
            $user1->save();

            return response()->json($filename);
        } catch (Exception $e) {
            return response()->json(['error'=>'Error Uploading Picture'],500);
        }
    }

    public function profile() {
        $user_id = auth()->id();

        $user_info = Profile::where("user_id","=",$user_id)->get();

        return response()->json($user_info);
    }

    public function rating() {
        $user_id = auth()->id();

        return $user_id;
    }

    public function update(UserUpdateRequest $request): RedirectResponse
    {
        try {
            $request->user()->fill($request->validated());

            if ($request->user()->isDirty('email')) {
                $request->user()->email_verified_at = null;
            }

            $request->user()->save();
            
            return Redirect::route('profile.edit');
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th
            ]);
        }
    }

    public function edit(Request $request): Response
    {
        if(Auth::user()->user_type == 'applicant')
        {
            return Inertia::render('Profile/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }elseif(Auth::user()->user_type == 'recruiter')
        {
            return Inertia::render('Profile/Recruiter/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }
    }
}
