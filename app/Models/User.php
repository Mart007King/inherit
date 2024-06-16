<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name', 
        'password', 
        'email', 
        'profile_picture', 
        'user_type',
        'country',
        'phone_number',
        'gender',
        'company_description',
        'linkedin_profile',
        'phone_number',
        'google_id',
        'category',
        'website_url',
        'company_size',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function skillSets()
    {
        return $this->hasMany(Skill_Set::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function posts()
    {
        return $this->hasMany(CommunityPost::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function messagesSent()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function messagesReceived()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function jobAlerts()
    {
        return $this->hasMany(JobAlert::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function jobRecommendations()
    {
        return $this->hasMany(JobRecommendation::class);
    }

    public function feedback()
    {
        return $this->hasMany(Feedback::class);
    }

    public function accountDeletionRequests()
    {
        return $this->hasMany(AccountDeletionRequest::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
