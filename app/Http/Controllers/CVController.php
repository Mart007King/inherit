<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Smalot\PdfParser\Parser;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class CVController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'cv' => 'required|file|mimetypes:application/pdf,|max:5000', 
        ]);

        $cvFile = $request->file('cv');
        $extractedData = [];

        if ($cvFile->isValid()) {
            $fileName = $cvFile->getClientOriginalName();
            $filePath = $cvFile->store('cvs'); 

            $parser = new Parser();
            try {
                $pdf = $parser->parseFile(storage_path('app/' . $filePath));
                $text = $pdf->getText();
            } catch (Exception $e) {
                //  parsing errors 
                return response()->json(['error' => 'Error processing CV file.'], 500);
            }

            // basic parsing
            $name = "";
            $email = "";
            $number = "";

            // extract data from the text
            preg_match('/[A-Z][a-z]+\s[A-Z][a-z]+/', $text, $matches); //  for name extraction
            if (isset($matches[0])) {
                $name = $matches[0];
            }

            preg_match('/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/', $text, $matches); //  for email extraction
            if (isset($matches[0])) {
                $email = $matches[0];
            }

            preg_match('/[0-9]{11,}/', $text, $matches); // Number extraction
            if (isset($matches[0])) {
                $number = $matches[0];
            }

            $extractedData = [
                "name" => $name,
                "email" => $email,
                "Phone Number" => $number,
            ];

            // Send extracted data as JSON response to the frontend
            return response()->json($extractedData);
        }

        return response()->json(['error' => 'Invalid CV file.'], 422);
    }
    
}
