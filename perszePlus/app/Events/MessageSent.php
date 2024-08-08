<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\BroadcastingEvent;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct(Message $message)
    {
        $this->message = [
            'id' => $message->id,
            'senderName' => $message->sender->first_name . ' ' . $message->sender->last_name,
            'senderAvatar' => $message->sender->avatar_path,
            'message' => $message->message,
            'read' => $message->read,
            'receiver_id' => $message->receiver_id,
            
        ];
    }

    public function broadcastOn()
    {
        // Broadcast to a private channel for the recipient
        return new Channel('user.' . $this->message['receiver_id']);
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }
}

