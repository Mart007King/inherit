<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id', 
        'applicant_id', 
        'status', 
        'resume_link', 
        'cover_letter',
        'company_id'
    ];

    public function job()
    {
        return $this->belongsTo(OffersAndJobs::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function interviewSchedules()
    {
        return $this->hasMany(InterviewSchedule::class);
    }
}
