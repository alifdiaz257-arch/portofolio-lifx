<?php
header('Content-Type: application/json');

// Folder tempat file audio
$audioFolder = 'audio/';

// Ekstensi file yang diizinkan
$allowedExtensions = ['mp3', 'ogg', 'wav', 'm4a'];

$audioFiles = [];

// Cek apakah folder audio ada
if (is_dir($audioFolder)) {
    // Scan folder audio
    $files = scandir($audioFolder);
    
    foreach ($files as $file) {
        // Ambil ekstensi file
        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        
        // Cek apakah ekstensi diizinkan
        if (in_array($extension, $allowedExtensions)) {
            // NAMA FILE ASLI - TANPA DIUBAH SEDIKIT PUN
            $namaFileAsli = pathinfo($file, PATHINFO_FILENAME);
            
            $audioFiles[] = [
                'title' => $namaFileAsli,  // NAMA SESUAI FILE MP3
                'artist' => 'Local File',
                'url' => $audioFolder . $file,
                'file' => $file
            ];
        }
    }
    
    echo json_encode($audioFiles);
} else {
    // Folder audio tidak ditemukan
    echo json_encode([]);
}
?>
