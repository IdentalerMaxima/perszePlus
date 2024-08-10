<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Settings extends Model
{
    use HasFactory;

    protected $primaryKey = 'user_id'; 

    protected $fillable = [
        'user_id',
        'receive_notification_new_event',
        'receive_notification_new_post',
        'receive_notification_new_course',
        'receive_email_notifications'
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    


}
