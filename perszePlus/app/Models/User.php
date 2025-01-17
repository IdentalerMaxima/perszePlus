<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name', 
        'email',
        'phone_number',
        'birth_date',
        'birth_place',
        'mothers_name',
        'street_address',
        'city',
        'state',
        'zip',
        'temp_addr',
        'temp_addr_street',
        'temp_addr_city',
        'temp_addr_state',
        'temp_addr_zip',
        'password',
        'avatar_path',
        'neptun_code',
        'university',
        'faculty',
        'start_year',
        'current_semester',
        'educational_format',
        'level_of_education',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function events()
    {
        return $this->belongsToMany(Event::class)->withPivot('status')->withTimestamps();
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'author_id');
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class)->withPivot('status')->withTimestamps();
    }

    public function settings(): HasOne
    {
        return $this->hasOne(Settings::class);
    }

}
