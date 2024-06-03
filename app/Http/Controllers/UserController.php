<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

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
}
