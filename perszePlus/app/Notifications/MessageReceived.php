<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Message;
use App\Models\User;

class MessageReceived extends Notification implements ShouldQueue
{
    use Queueable;

    protected $message;
    protected $sender;

    /**
     * Create a new notification instance.
     */
    public function __construct(Message $message, User $sender)
    {
        $this->message = $message;
        $this->sender = $sender;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        
        $senderName = $this->sender->first_name . ' ' . $this->sender->last_name;
        $receiverName = $notifiable->first_name . ' ' . $notifiable->last_name;

        // Use the environment URL for the application base
        $appUrl = config('app.url');

        // Generate the message URL
        $messageUrl = $appUrl . '/login';

        return (new MailMessage)
                    ->subject('New Message Received from ' . $senderName)
                    ->greeting('Hello ' . $receiverName . ',')
                    ->line('You have received a new message from ' . $senderName . ':')
                    ->line($this->message->content)
                    ->action('Login', $messageUrl)
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message_id' => $this->message->id,
            'sender_id' => $this->sender->id,
            'content' => $this->message->content,
        ];
    }
}
