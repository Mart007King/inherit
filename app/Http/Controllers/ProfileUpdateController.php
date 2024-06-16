<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Profile;
use App\Models\Rating;
use App\Models\Skill;
use App\Models\Skill_Set;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileUpdateController extends Controller
{
    // fetching categories
    public function fetchCategory() {
        $categories = Category::all();

        return response()->json($categories);
    }

    public function fetchSkills($id) {

        $skills = Skill::where("category_id","=",$id)->get();

        return response()->json($skills);
    }

    public function saveTitle(Request $request) {
        $request->validate([
            'profile_title'=>'required'
        ]);

        $user_id = auth()->id();

        $profile = new Profile();

        $profile->user_id = $user_id;
        $profile->profile_title = $request->profile_title;

        $profile->save();

        $rating = Rating::where('user_id', $user_id)->first();

        if ($rating->star != 4) {
            // Update the existing rating record
            $rating->rating = 'Advanced';
            $rating->star = 3;
            $rating->level = 'Ready to Shine';
            $rating->save();
        }

        return back();
    }

    public function fetchTitle() {

        $user_id = auth()->id();
        $title = Profile::where("user_id","=",$user_id)->get();

        return response()->json($title);
    }

    public function updateTitle(Request $request)
    {
        $request->validate([
            'profile_title' => 'required'
        ]);

        $user_id = auth()->id();
        $profile = Profile::where('user_id', $user_id)->firstOrFail();

        $profile->profile_title = $request->profile_title;
        $profile->update(); 

        return back(); 
    }

    public function storeSkills(Request $request)
    {
        $userId = auth()->id();

        // Validate the incoming request data
        $request->validate([
            'category' => 'required',
            'skills' => 'required',            
        ]);

        $categoryId = $request->category;
        $skills = $request->skills;

        // Insert the skills for the user
        foreach ($skills as $skillId) {
            $skillSet = new Skill_Set();
            $skillSet->user_id = $userId;
            $skillSet->category_id = $categoryId;
            $skillSet->skill_id = $skillId;
            $skillSet->save();
        }

        $rating = Rating::where('user_id', $userId)->first();

        if ($rating) {
            // Update the existing rating record
            $rating->rating = 'Expert';
            $rating->star = 4;
            $rating->level = 'Titan';
            $rating->save();
        }

        return back(); 
    }

    public function updateSkills(Request $request)
    {
        $userId = auth()->id();

        // Validate the incoming request data
        $request->validate([
            'skills' => 'required',
        ]);

        $skills = $request->skills;
       
        // Remove existing skills for the user
        User::find($userId)->skillSets()->delete();

        // Create new skill sets for the user
        foreach ($skills as $skillId) {
            $skillSet = new Skill_Set();
            $skillSet->user_id = $userId;
            $skillSet->skill_id = $skillId;
            $skillSet->save();
        }


        return back(); 
    }

    public function fetchUserSkills()
    {
        $user_id = auth()->id();
        $skills = DB::table('skill__sets')
        ->join('categories', 'skill__sets.category_id', '=', 'categories.category_id')
        ->join('skills', 'skill__sets.skill_id', '=', 'skills.skill_id')
        ->where('skill__sets.user_id', '=', $user_id)
        ->select('categories.category_name as category_name', 'skills.skill_name as skill_name')
        ->get();

        return response()->json($skills);
    }
}
