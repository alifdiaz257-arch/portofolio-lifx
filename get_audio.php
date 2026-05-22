<?php
header('Content-Type: application/json');

$audioFolder = 'audio/';
$audioFiles = [];

// Cek folder audio
if (is_dir($audioFolder)) {
    $files = scandir($audioFolder);
    
    foreach ($files as $file) {
        // Cek file dengan ekstensi mp3 saja
        if (strpos($file, '.mp3') !== false) {
            // Nama file asli tanpa .mp3
            $namaAsli = str_replace('.mp3', '', $file);
            $namaAsli = str_replace('.ogg', '', $namaAsli);
            $namaAsli = str_replace('.wav', '', $namaAsli);
            $namaAsli = str_replace('.m4a', '', $namaAsli);
            
            $audioFiles[] = [
                'title' => $namaAsli,
                'artist' => 'Local File',
                'url' => $audioFolder . $file
            ];
        }
    }
}

echo json_encode($audioFiles);
?>
