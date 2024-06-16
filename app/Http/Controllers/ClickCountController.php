<?php

namespace App\Http\Controllers;

use App\Models\ClickCount;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ClickCountController extends Controller
{
    public function getClickCount()
    {
        $userId = auth()->id();
        $clickCount = ClickCount::firstOrCreate(['user_id' => $userId]);

        $canClick = true;
        if ($clickCount->count >= 3 && Carbon::now()->diffInHours($clickCount->last_clicked_at) < 24) {
            $canClick = false;
        }

        return response()->json([
            'count' => $clickCount->count,
            'canClick' => $canClick,
            'lastClickedAt' => $clickCount->last_clicked_at
        ]);
    }

    public function updateClickCount(Request $request)
    {
        $userId = auth()->id();
        $clickCount = ClickCount::firstOrCreate(['user_id' => $userId]);

        if ($clickCount->count < 3 || Carbon::now()->diffInHours($clickCount->last_clicked_at) >= 24) {
            $clickCount->count = $request->count;
            $clickCount->last_clicked_at = Carbon::now();
            $clickCount->save();
        }

        return response()->json(['success' => true]);
    }
}
