<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
;

class AdminSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_only_with_invitation',
    ];
}
