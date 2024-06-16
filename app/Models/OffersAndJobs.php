<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffersAndJobs extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 
        'title', 
        'description', 
        'requirements', 
        'location', 
        'salary_range', 
        'job_type',
        'application_deadline',
        'employment_status',
        'years_of_experience',
        'category',
        'skills',
        'status'
    ];


    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function recommendations()
    {
        return $this->hasMany(JobRecommendation::class);
    }
}
