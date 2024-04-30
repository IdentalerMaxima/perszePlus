<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Support\Facades\Storage;
use App\Models\Document;
use Illuminate\Support\Facades\Log;


class FileUploadController extends Controller
{
    public function upload(FileUploadRequest $request)
    {
        $userId = auth()->user()->id;
        $file = $request->file('file');
        $fileName = $request->input('name');
        $fileType = $request->input('type');

        // Log::info($request);
        // Log::info($file);
        // Log::info($fileName);
        // Log::info($fileType);
        Log::info($userId);

        $directory = "uploads/{$userId}";
        if (!Storage::exists($directory)) {
            Storage::makeDirectory($directory);
        }

        Log::info($directory);
        
        // Store file in the storage directory
        $path = uniqid() . '_' . $file->getClientOriginalName();
        $file->storeAs($directory, $path);


        // Save metadata record of the document
        $document = new Document();
        $document->user_id = auth()->user()->id; // Assuming you are using authentication
        $document->name = $fileName;
        $document->type = $fileType;
        $document->original_name = $file->getClientOriginalName();
        $document->size = $file->getSize();
        $document->last_modified = now();
        $document->file_path = $directory . '/' . $path;
        $document->save();


        return response()->json(['message' => 'File uploaded successfully']);
    }
}
