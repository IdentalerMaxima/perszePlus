<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EventCreated extends Notification implements ShouldQueue
{
    use Queueable;

    protected $event;

    /**
     * Create a new notification instance.
     */
    public function __construct($event)
    {
        $this->event = $event;
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
        // Use environment URL if needed
        $appUrl = config('app.url');
        $eventUrl = $appUrl . '/login';

        return (new MailMessage)
                    ->subject('New Event Created: ' . $this->event->title)
                    ->greeting('Hello ' . $notifiable->first_name . ' ' . $notifiable->last_name . ',')
                    ->line('A new event has been created: ' . $this->event->title)
                    ->line('Details: ' . $this->event->description)
                    ->action('Login', $eventUrl)
                    ->line('Thank you for using our application!');
    }
}
