<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use Illuminate\Support\Facades\Log;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        // Log::info($userId);
        $documents = Document::where('user_id', $userId)->get();
        Log::info($documents);
        return response()->json(['documents' => $documents]);
    }

    public function getFile(Request $request, $file)
    {
        $userId = $request->user()->id;
        $document = Document::where('user_id', $userId)->where('name', $file)->first();
        if (!$document) {
            return response()->json(['message' => 'File not found'], 404);
        }
        return response()->download(storage_path('app/' . $document->file_path));
    }
}