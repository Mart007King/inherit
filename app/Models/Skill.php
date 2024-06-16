<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $table = 'skills';

    // public function category() 
    // {
    //     return $this->belongsTo(Category::class);
    // }

    public function profiles()
    {
        return $this->belongsToMany(Profile::class);
    }

    public function skillSets()
    {
        return $this->hasMany(Skill_Set::class);
    }
}
