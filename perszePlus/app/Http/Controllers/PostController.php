<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch posts with their related author and comments
        $posts = Post::with(['author', 'comments'])->get();

        // Structure the response to include the author's name and avatar path, and the comments
        $posts = $posts->map(function ($post) {
            return [
                'id' => $post->id,
                'content' => $post->content,
                'likes' => $post->likes,
                'date' => $post->created_at->toDateTimeString(),
                'author' => [
                    'first_name' => $post->author->first_name,
                    'last_name' => $post->author->last_name,
                    'avatar_path' => $post->author->avatar_path,
                ],
                'comments' => $post->comments->map(function ($comment) {
                    return [
                        'user' => $comment->author->first_name . ' ' . $comment->author->last_name,
                        'comment' => $comment->content,
                        'avatar_path' => $comment->author->avatar_path,
                    ];
                }),
            ];
        });

        // Log the posts
        Log::info('Posts fetched successfully', ['posts' => $posts]);

        return response()->json($posts, 200);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
