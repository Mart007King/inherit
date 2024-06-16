<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill_Set extends Model
{
    use HasFactory;

    protected $table = 'skill__sets'; 

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function skill()
    {
        return $this->belongsTo(Skill::class, 'skill_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
