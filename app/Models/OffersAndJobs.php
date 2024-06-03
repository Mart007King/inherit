<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 
        'title', 
        'description', 
        'requirements', 
        'location', 
        'salary_range', 
        'job_type'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
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
