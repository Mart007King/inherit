<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OffersAndJobsCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
        'id' => ['nullable'],
        'title' => ['required', 'string'], 
        'description' => ['required', 'string'], 
        'requirements' => ['required', 'string'], 
        'location' => ['required', 'string'], 
        'salary_range' => ['required', 'string'], 
        'category' => ['required', 'string'],
        'job_type' => ['required', 'string'],
        'application_deadline' => ['required', 'string'],
        'employment_status' => ['required', 'string'],
        'years_of_experience' => ['required', 'string'],
        'skills' => ['required', 'string']
        ];
    }
}
