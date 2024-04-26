<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Document extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'type', 'user_id', 'file_path', 'original_name', 'size', 'last_modified'];


    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
