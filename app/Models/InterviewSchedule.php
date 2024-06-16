<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterviewSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'schedule_name',
        'company_id',
        'applicant_id',
        'application_id', 
        'interview_time', 
        'interview_date', 
        'location',
        'status'
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }
}
