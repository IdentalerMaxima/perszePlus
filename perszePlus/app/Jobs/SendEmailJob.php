<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Notifications\EventCreated;
use App\Notifications\NewPostNotification;
use App\Notifications\NewCourseNotification;  // Add this line
use App\Models\User;

class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $item;
    protected $type;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user, $item, $type)
    {
        $this->user = $user;
        $this->item = $item;
        $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->type === 'event') {
            $this->user->notify(new EventCreated($this->item));
        } elseif ($this->type === 'post') {
            $this->user->notify(new NewPostNotification($this->item));
        } elseif ($this->type === 'course') {
            $this->user->notify(new NewCourseNotification($this->item)); // Add this line
        }
    }
}
