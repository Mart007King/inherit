<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bot extends Model
{
    use HasFactory;

    protected $table = 'bots';

    protected $fillable = [
        'bot_name',
        'user_id',
        'type',
        'subscription_type',
        'unique_token',
        'status',
        'job_filtering',
        'application_ranking',
        'bot_metrics',
        'usage_count'
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
