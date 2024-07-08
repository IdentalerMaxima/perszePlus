<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'file_path',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('status')->withTimestamps();
    }

}


