<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //Get all messages sent to the user

        $user = $request->user();

        $messages = Message::with(['sender'])
            ->where('receiver_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

         // Transform the messages array
         $transformedMessages = $messages->map(function ($message) {
            return [
                'id' => $message->id,
                'senderName' => $message->sender->first_name . ' ' . $message->sender->last_name,
                'senderAvatar' => $message->sender->avatar_path,
                'message' => $message->message,
            ];
        });

        return response()->json($transformedMessages);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMessageRequest $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($messageId)
    {
        //Delete a message
        $message = Message::find($messageId);

        if ($message) {
            $message->delete();
            return response()->json(['message' => 'Message deleted successfully']);
        } else {
            return response()->json(['message' => 'Message not found'], 404);
        }
        

    }
}
