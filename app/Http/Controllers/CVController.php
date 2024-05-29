<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class CVController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate(['cv' => 'required|file|mimes:pdf,doc,docx']);

        $path = $request->file('cv')->storeAs('cvs', $request->file('cv')->getClientOriginalName());
        $fullPath = storage_path('app/' . $path);

        $process = new Process(['node', base_path('parseCV.js'), $fullPath]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $output = json_decode($process->getOutput(), true);

        return response()->json($output);
    }
    
}
