<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    // public function skill()
    // {
    //     return $this->hasMany(Skill::class);
    // }

    public function skillSets()
    {
        return $this->hasMany(Skill_Set::class);
    }
}
