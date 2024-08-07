<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    // If the primary key is 'id' and auto-incrementing, you don’t need to specify it
    // unless you're overriding defaults or using a different primary key.

    // If timestamps are enabled, you don’t need to specify them unless you're customizing
    // public $timestamps = true;

    protected $fillable = [
        'sender_id',  // Foreign key to the sender (assumes sender is a User)
        'receiver_id',  // Foreign key to the receiver (assumes receiver is a User)
        'message',    // The content of the message
    ];

    // Define relationships to the User model

    /**
     * Get the sender of the message.
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');

    }

    /**
     * Get the receiver of the message.
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
