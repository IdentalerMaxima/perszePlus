<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{

    protected $fillable = ['name'];

    public function universities()
    {
        return $this->belongsToMany(University::class);
    }

}
