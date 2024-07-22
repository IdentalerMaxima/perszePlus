<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QrController extends Controller
{
    public function generate($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $qr = QrCode::format('png')->size(300)->generate($event->id);

        $qrBase64 = base64_encode($qr);

        return response()->json(['qr_code' => $qrBase64]);
    }
}
