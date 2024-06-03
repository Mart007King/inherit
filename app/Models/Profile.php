<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'bio', 
        'contact_info', 
        'skills', 
        'experience', 
        'education', 
        'location', 
        'resume_link'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
