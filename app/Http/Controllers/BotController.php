<?php

namespace App\Http\Controllers;

use App\Models\Bot;
use App\Models\User;
use App\Models\Application;
use App\Models\Profile;
use App\Models\OffersAndJobs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\OffersAndJobsCreateRequest;
use Illuminate\Support\Facades\DB;

class BotController extends Controller
{


    public function index(Request $request)
    {

        try
        {
            $bot = Bot::where("user_id", Auth::id())->first();
            return response()->json($bot);
        }catch(\Throwable $th)
        {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }


    public function filterApplications(Request $request)
    {
        try {
            $jobId = $request->input('thisJob');
            $job = OffersAndJobs::find($jobId);
    
            if (!$job) {
                return response()->json(['error' => 'Job not found'], 404);
            }
    
            $usersByCategory = Profile::where('category', $job->category)->get();
    
            $filteredApplications = [];
    
            foreach ($usersByCategory as $userProfile) {
                $userApplications = Application::where('job_id', $jobId)
                    ->where('applicant_id', $userProfile->user_id)
                    ->get();
            }
    
            return response()->json($userApplications);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ]);
        }
    }
    


}