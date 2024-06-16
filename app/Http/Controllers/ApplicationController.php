<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $myApplications = Application::where('company_id', Auth::id())->get()->toArray();
    
        foreach ($myApplications as $application) { 
            $applicant = User::find($application['applicant_id']);
            if ($applicant) {
                $application['applicant_name'] = $applicant->name; 
            } else {
                $application['applicant_name'] = 'Unknown';  
            }
        }
    
        return response()->json($myApplications);
    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Application $application, Request $request)
    {
        try {
            $applicationId = $request->input('applicationId');
            $application = Application::find($applicationId);

            if($application)
            {
                return response()->json($application, 201);
            }else
            {
                return response()->json([
                    'message' => 'Application Not Found',
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'An error Occured'
            ], 500);
        }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Application $application)
    {
        //
    }


    public function thisJobApplications(Request $request)
    {
        try {
            $jobId = $request->input('jobId');
            $getApplications = Application::where('job_id', $jobId)->get()->toArray();

            foreach($getApplications as $applications)
            {
                $applicant = User::find($applications['applicant_id']);
                if($applicant)
                {
                    $applications['applicant_name'] = $applicant->name;
                }else
                {
                    $applications['applicant_name'] = 'Unknown';
                }
            }

            return response()->json($getApplications, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error Occured while fetching Applications',
                'error' => $e
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Application $application)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Application $application)
    {
        //
    }


    public function respondToApplication(Request $request)
    {

        try {
            $applicationId = $request->input("id");
            $application = Application::find($applicationId);

            if($application)
            {
                if($application->update(['status' =>  $request->input('status')]))
                {
                    return response()->json([
                        'message' => 'Update Successful'
                    ], 201);
                }else
                {
                    return response()->json([
                        'message' => 'Could not Updated Application'
                    ]);
                }
            }else
            {
                return response()->json([
                    'message' => 'Application not Found'
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }

    }

}