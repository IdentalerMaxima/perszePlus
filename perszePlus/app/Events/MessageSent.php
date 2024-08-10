<?php

namespace App\Events;

use App\Models\Message;
use App\Models\User;
use App\Models\Settings;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\BroadcastingEvent;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use App\Notifications\MessageReceived;



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

        // Get the receiver and their settings
        $receiver = User::find($message->receiver_id);
        $settings = Settings::where('user_id', $receiver->id)->first();

        // Check if the user has enabled email notifications for messages
        if ($settings && $settings->receive_email_notifications) {
            $receiver->notify(new MessageReceived($message, $message->sender));
        }


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

