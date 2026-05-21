// Audio Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bg-music');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeControl = document.getElementById('volumeControl');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    // Cek apakah audio bisa diputar otomatis
    let isPlaying = false;
    
    // Fungsi untuk play audio (dengan user interaction)
    function playAudio() {
        audio.play()
            .then(() => {
                isPlaying = true;
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
                
                // Tambahkan visualizer jika ada
                createVisualizer();
            })
            .catch(error => {
                console.log('Autoplay diblokir browser:', error);
                // Tampilkan notifikasi untuk klik
                showPlayNotification();
            });
    }
    
    // Fungsi pause audio
    function pauseAudio() {
        audio.pause();
        isPlaying = false;
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
    }
    
    // Event listener untuk tombol play/pause
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });
    
    // Event listener untuk volume
    volumeControl.addEventListener('input', function(e) {
        audio.volume = e.target.value;
        
        // Animasi visual feedback
        const volumePercent = e.target.value * 100;
        volumeControl.style.background = `linear-gradient(90deg, #ffd700 0%, #ffd700 ${volumePercent}%, #555 ${volumePercent}%)`;
    });
    
    // Set initial volume style
    volumeControl.style.background = `linear-gradient(90deg, #ffd700 0%, #ffd700 50%, #555 50%)`;
    
    // Cek apakah user sudah interaksi dengan halaman
    let userInteracted = false;
    
    function handleFirstInteraction() {
        if (!userInteracted) {
            userInteracted = true;
            // Coba play audio (mungkin masih diblokir jika bukan karena klik)
            if (localStorage.getItem('music-autoplay') === 'true') {
                playAudio();
            }
        }
    }
    
    // Deteksi interaksi user
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    
    // Notifikasi untuk user
    function showPlayNotification() {
        const notification = document.createElement('div');
        notification.className = 'audio-notification';
        notification.innerHTML = '🔊 Klik tombol musik untuk memutar lagu';
        notification.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: #ffd700;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 14px;
            z-index: 1001;
            animation: slideUp 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            border: 1px solid #ffd700;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Visualizer (opsional)
    function createVisualizer() {
        // Hapus visualizer lama jika ada
        const oldVisualizer = document.querySelector('.audio-visualizer');
        if (oldVisualizer) oldVisualizer.remove();
        
        // Buat visualizer baru
        const visualizer = document.createElement('div');
        visualizer.className = 'audio-visualizer';
        
        for (let i = 0; i < 4; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            visualizer.appendChild(bar);
        }
        
        // Tambahkan ke audio player
        document.querySelector('.audio-player').appendChild(visualizer);
        
        // Animasi visualizer berdasarkan volume
        if (isPlaying) {
            visualizer.style.display = 'flex';
        }
    }
    
    // Simpan preferensi user
    playPauseBtn.addEventListener('click', function() {
        localStorage.setItem('music-autoplay', isPlaying ? 'true' : 'false');
    });
    
    // Handle error jika file audio tidak ditemukan
    audio.addEventListener('error', function(e) {
        console.error('Error loading audio:', e);
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 14px;
            z-index: 1002;
        `;
        errorMsg.textContent = '⚠️ File audio tidak ditemukan';
        document.body.appendChild(errorMsg);
        
        setTimeout(() => errorMsg.remove(), 3000);
    });
    
    // Animasi visualizer saat audio diputar
    audio.addEventListener('play', function() {
        createVisualizer();
    });
    
    audio.addEventListener('pause', function() {
        const visualizer = document.querySelector('.audio-visualizer');
        if (visualizer) visualizer.remove();
    });
});