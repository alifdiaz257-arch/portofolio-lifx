<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

// Folder audio (sesuaikan dengan struktur folder kamu)
$audioFolder = 'audio/';
$playlist = [];

// Cek apakah folder ada
if (!is_dir($audioFolder)) {
    echo json_encode([]);
    exit;
}

// Scan folder
$files = scandir($audioFolder);
$supported = ['mp3', 'ogg', 'wav', 'm4a'];

foreach ($files as $file) {
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    if (in_array($ext, $supported)) {
        $filename = pathinfo($file, PATHINFO_FILENAME);
        // Bersihkan nama file untuk judul
        $title = preg_replace('/[_-]/', ' ', $filename);
        $title = ucwords($title);
        
        $playlist[] = [
            'title' => $title,
            'artist' => 'LIFXXCODETZ',
            'url' => $audioFolder . $file,
            'file' => $file,
            'duration' => 0
        ];
    }
}

// Optional: urutkan berdasarkan nama file
usort($playlist, function($a, $b) {
    return strcmp($a['file'], $b['file']);
});

echo json_encode($playlist, JSON_PRETTY_PRINT);
?>