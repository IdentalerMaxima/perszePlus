<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\FileUploadRequest;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        //Log::info('user/docs/index');
        $userId = $request->user()->id;
        $documents = Document::where('user_id', $userId)->get();
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

    public function upload(FileUploadRequest $request)
    {
        $userId = auth()->user()->id;
        $file = $request->file('file');
        $fileName = $request->input('name');
        $fileType = $request->input('type');

        $directory = "uploads/{$userId}";
        if (!Storage::exists($directory)) {
            Storage::makeDirectory($directory);
        }

        $path = uniqid() . '_' . $file->getClientOriginalName();
        $file->storeAs($directory, $path);

        $document = new Document();
        $document->user_id = auth()->user()->id; 
        $document->name = $fileName;
        $document->type = $fileType;
        $document->original_name = $file->getClientOriginalName();
        $document->size = $file->getSize();
        $document->last_modified = now();
        $document->file_path = $directory . '/' . $path;
        $document->save();


        return response()->json(['message' => 'File uploaded successfully']);
    }

    public function delete(Request $request, $fileId)
    {
        $userId = $request->user()->id;
        $document = Document::where('user_id', $userId)->where('id', $fileId)->first();
        if (!$document) {
            return response()->json(['message' => 'File not found'], 404);
        }


        unlink(storage_path('app/' . $document->file_path));

        $document->delete();

        return response()->json(['message' => 'File deleted successfully']);

    }

    public function download(Request $request, $fileId)
    {
        $userId = $request->user()->id;
        $document = Document::where('user_id', $userId)->where('id', $fileId)->first();

        if (!$document) {
            return response()->json(['message' => 'File not found'], 404);
        }

        $filePath = storage_path('app/' . $document->file_path);

        if (!file_exists($filePath)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        $mimeType = Storage::mimeType($document->file_path);

        $fileName = $document->name;

        $headers = [
            'Content-Type' => $mimeType,
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
            'Access-Control-Expose-Headers' => 'Content-Disposition',
        ];
        return response()->download($filePath, $fileName, $headers);
    }

    public function getCountOfDocumentsByType()
    {
        $usersByDocumentType = Document::select('type', Document::raw('count(distinct user_id) as user_count'))
            ->where('type', '!=', 'Egyeb')
            ->groupBy('type')
            ->get();

        return response()->json($usersByDocumentType);
    }

    public function getDocumentsOfUser(Request $request, $userId)
    {
        $documents = Document::where('user_id', $userId)->get();
        return response()->json(['documents' => $documents]);
    }

    public function show(Request $request, $fileId)
    {
        $userId = $request->user()->id;

        if ($request->user()->category == 'admin') {
            $document = Document::find($fileId);
        } else {
            $document = Document::where('user_id', $userId)->where('id', $fileId)->first();
        }

        if (!$document) {
            return response()->json(['message' => 'File not found'], 404);
        }

        $filePath = storage_path('app/' . $document->file_path);

        if (!file_exists($filePath)) {
            return response()->json(['message' => 'File not found'], 404);
        }
        return response()->file($filePath);
    }




}
