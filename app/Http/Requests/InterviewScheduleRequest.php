<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InterviewScheduleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required'],
            'schedule_name' => ['required', 'string'],
            'applicant_id' => ['nullable'],
            'application_id' => ['nullable'],
            'interview_date' => ['required', 'string'],
            'interview_time' => ['required', 'string'],
            'location' => ['required', 'string'],
            'company_id' => ['nullable']
        ];
    }
}
