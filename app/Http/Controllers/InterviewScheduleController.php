<?php

namespace App\Http\Controllers;

use App\Models\InterviewSchedule;
use App\Http\Requests\InterviewScheduleRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class InterviewScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $myInterviews = InterviewSchedule::where('company_id',Auth::id())
            ->where('status','!=','cancelled')
            ->get();

            if($myInterviews)
            {
                return response()->json($myInterviews, 200);
            }else
            {
                return response()->json([
                    'message' => 'There are no Interview Schedules at the Moment'
                ],200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
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
    public function store(InterviewScheduleRequest $request)
    {
        try {
            $dataForSchedule = $request->validated(); 

            $D_schedule = array_merge($dataForSchedule, [
                'company_id' => Auth::id()
            ]);
            
            $setSchedule = InterviewSchedule::create($D_schedule);
            if($setSchedule)
            {
                return response()->json([
                    'message' => 'Schedule Created'
                ]);
            }else
            {
                return response()->json([
                    'message' => 'Error Creating Schedule'
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'error'=> $th->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(InterviewSchedule $interviewSchedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InterviewSchedule $interviewSchedule, Request $request)
    {
        try {
            $scheduleId = $request->input('scheduleId');
            $schedule = InterviewSchedule::find($scheduleId['scheduleId']);

            if($schedule)
            {
                return response()->json($schedule);
            }else
            {
                return response()->json([
                    'message' => 'Schedule not Found'
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(InterviewScheduleRequest $request)
    {
        try {
            $data = $request->validated();

            $schedule = InterviewSchedule::find($data['id']);

            if($schedule->update($data))
            {
                $schedule->update([
                    'status' => 'rescheduled'
                ]);
                return response()->json([
                        'message' => 'Schedule Rescheduled'
                    ], 200);
            }else
            {
                return response()->json([
                    'message' => "Couldn't find Schedule"
                ], 404);
            }

            return response()->json($schedule);
            
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InterviewSchedule $interviewSchedule)
    {
        //
    }


    public function cancelScheduleRecruiter(Request $request)
    {
        try {
            $find = InterviewSchedule::where('id',$request->input('scheduleId'));

            if($find)
            {
                if($find->update(['status' => 'cancelled']))
                {
                    return response()->json([
                        'message' => 'Schedule Cancelled'
                    ]);
                }else
                {
                    return response()->json([
                        'message' => 'Could not cancel Schedule. Try Again'
                    ]);
                }
            }else
            {
            return response()->json([
                'message' => 'Schedule Not Found'
            ]);
            }

        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }


    public function attendScheduleRecruiter(Request $request)
    {
        try {
            $find = InterviewSchedule::where('id',$request->input('scheduleId'));

            if($find)
            {
                if($find->update(['status' => 'attended']))
                {
                    return response()->json([
                        'message' => 'Schedule Attended'
                    ]);
                }else
                {
                    return response()->json([
                        'message' => 'Could not attend Schedule. Try Again'
                    ]);
                }
            }else
            {
            return response()->json([
                'message' => 'Schedule Not Found'
            ]);
            }

        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
