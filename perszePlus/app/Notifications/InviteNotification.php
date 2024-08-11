<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class InviteNotification extends Notification
{
    use Queueable;

    protected $token;
    protected $role;
    protected $sender;

    /**
     * Create a new notification instance.
     *
     * @param string $token
     * @param string $role
     * @param string $sender
     */
    public function __construct($token, $role, $sender)
    {
        $this->token = $token;
        $this->role = $role;
        $this->sender = $sender;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('You are invited to join our platform')
            ->greeting('Hello!')
            ->line("You have been invited to join our platform as a {$this->role}.")
            ->action('Accept Invitation', url('/invite/accept?token=' . $this->token))
            ->line('Thank you for using our application!')
            ->line("Sent by: {$this->sender}");
    }
}
