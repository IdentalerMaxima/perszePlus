<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Settings;
use App\Jobs\SendEmailJob;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $posts = Post::with(['author', 'comments'])
            ->orderBy('created_at', 'desc')
            ->get();


        $posts = $posts->map(function ($post) {
            return [
                'id' => $post->id,
                'content' => $post->content,
                'likes' => $post->likes,
                'date' => $post->created_at->toDateTimeString(),
                'author' => [
                    'id' => $post->author->id,
                    'first_name' => $post->author->first_name,
                    'last_name' => $post->author->last_name,
                    'avatar_path' => $post->author->avatar_path,
                ],
                'comments' => $post->comments->map(function ($comment) {
                    return [
                        'id' => $comment->id,
                        'user' => $comment->author->first_name . ' ' . $comment->author->last_name,
                        'author_id' => $comment->author->id,
                        'comment' => $comment->content,
                        'avatar_path' => $comment->author->avatar_path,
                    ];
                }),
            ];
        });

        return response()->json($posts, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'content' => 'required|string',
            'author_id' => 'required|integer',
        ]);

        $post = Post::create([
            'content' => $validatedData['content'],
            'author_id' => $validatedData['author_id'],
        ]);

        $usersWithNotifications = Settings::where('receive_notification_new_post', true)
            ->pluck('user_id');
        $usersToNotify = User::whereIn('id', $usersWithNotifications)->get();

        foreach ($usersToNotify as $user) {
            SendEmailJob::dispatch($user, $post, 'post');
            
        }


        return response()->json($usersToNotify, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'content' => 'required|string',
        ]);

        $post = Post::findOrFail($id);

        $post->content = $validatedData['content'];
        $post->save();

        return response()->json($post, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Using findOrFail to get the post by ID
        $post = Post::findOrFail($id);

        try {
            $post->delete();
            return response()->json(['message' => 'Post deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting post'], 500);
        }
    }
}
