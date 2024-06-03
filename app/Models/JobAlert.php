<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobAlert extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'criteria', 
        'frequency'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
