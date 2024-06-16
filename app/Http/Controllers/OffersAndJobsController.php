<?php

namespace App\Http\Controllers;

use App\Models\OffersAndJobs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\OffersAndJobsCreateRequest;
use Illuminate\Support\Facades\DB;

class OffersAndJobsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $myJobs = OffersAndJobs::where('company_id',Auth::id())->get();
        return response()->json($myJobs);
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
    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'requirements' => 'required|string',
        'location' => 'required|string',
        'salary_range' => 'required|string',
        'job_type' => 'required|string',
        'application_deadline' => 'required|date',
        'employment_status' => 'required|string',
        'years_of_experience' => 'required|string',
        'category' => 'required|integer',
        'skills' => 'array', // Ensure skills is an array
    ]);

    $skills = implode(',', $request->skills);

    // Save the job with skills as a comma-separated string
    $job = OffersAndJobs::create([
        'title' => $validatedData['title'],
        'company_id' => Auth::id(),
        'description' => $validatedData['description'],
        'requirements' => $validatedData['requirements'],
        'location' => $validatedData['location'],
        'salary_range' => $validatedData['salary_range'],
        'job_type' => $validatedData['job_type'],
        'application_deadline' => $validatedData['application_deadline'],
        'employment_status' => $validatedData['employment_status'],
        'years_of_experience' => $validatedData['years_of_experience'],
        'category' => $validatedData['category'],
        'skills' => $skills, // Save as a comma-separated string
    ]);

    return response()->json([
        'message' => 'Job created successfully',
        'job' => $job
    ]);
}


    /**
     * Display the specified resource.
     */
    public function show(OffersAndJobs $offersAndJobs)
    {
        try {
            $thisJob = OffersAndJobs::find($request->query('jobId'));
            
            if($thisJob)
            {
                return response()->json($thisJob);
            }else
            {
                return response()->json([
                    'message' => 'Job not Found'
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error Occured trying to fetch Job'
            ], 500);
        }        
    }

    /**
     * Show the form for editing the specified resource.
     */
        public function edit(Request $request)
    {
        $jobId = $request->input('jobId');

        $job = OffersAndJobs::where('id', $jobId)
                            ->where('company_id', Auth::id())
                            ->first();

        if ($job) {
            return response()->json($job);
        } else {
            return response()->json(['error' => 'Job not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OffersAndJobsCreateRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $jobToUpdate = OffersAndJobs::find($validatedData['id']);

            $jobToUpdate->update($validatedData);

            if($jobToUpdate->update()) {

                return response()->json([
                    'message' => 'Job Updated Successfully',
                    'status' => true
                ], 201);
            } else {
                return response()->json([
                    'message' => "Couldn't Update Job",
                    'status' => false
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the job',
                'error' => $e->getMessage(),
                'status' => false
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($jobId)
{
    DB::beginTransaction();

    try {
        // Find the job with the provided jobId and matching company_id
        $job = OffersAndJobs::where('id', $jobId)
                            ->where('company_id', Auth::id())
                            ->first();

        if ($job) {
            $job->delete();

            DB::commit();

            return response()->json([
                'message' => 'Job Deleted Successfully',
                'status' => true
            ], 200);
        } else {
            // Rollback the transaction if the job is not found
            DB::rollBack();

            return response()->json(['error' => 'Job not found'], 404);
        }
    } catch (\Exception $e) {
        DB::rollBack();

        Log::error('Error deleting job:', ['error' => $e->getMessage()]);

        return response()->json([
            'message' => 'An error occurred while deleting the job',
            'error' => $e->getMessage(),
            'status' => false
        ], 500);
    }
}

    public function getCategories(Request $request)
    {
        try {
            $categories = DB::select('select * from category');
        return response()->json($categories); 
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ]);
        }
    }

    public function getSkills(Request $request)
    {
        try {
            $categoryId = $request->input('categoryId');
            $skills = DB::select('SELECT * FROM skill WHERE category_id = ?', [$categoryId]);
            return response()->json($skills);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }

    
}
