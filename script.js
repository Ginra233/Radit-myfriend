document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const room = document.querySelector('.room');
    const note = document.getElementById('note');
    const noteDisplay = document.getElementById('noteDisplay');

    let isNoteVisible = false;

    // Fungsi untuk menggerakkan kamera (efek paralaks)
    gameContainer.addEventListener('mousemove', (e) => {
        if (isNoteVisible) return; // Jangan gerakkan jika surat terbuka

        const containerWidth = gameContainer.offsetWidth;
        const containerHeight = gameContainer.offsetHeight;
        
        // Hitung posisi mouse dari tengah
        const mouseX = e.clientX - containerWidth / 2;
        const mouseY = e.clientY - containerHeight / 2;
        
        // Hitung persentase pergerakan
        const moveX = -(mouseX / containerWidth) * 20; // 20 adalah sensitivitas
        const moveY = -(mouseY / containerHeight) * 20;
        
        // Terapkan translasi ke ruangan
        room.style.transform = `translate(${moveX}%, ${moveY}%)`;
    });

    // Event listener untuk interaksi dengan surat
    document.addEventListener('keydown', (e) => {
        // Interaksi dengan tombol "E"
        if (e.key.toLowerCase() === 'e') {
            const rect = note.getBoundingClientRect();
            const containerRect = gameContainer.getBoundingClientRect();

            // Cek apakah mouse berada di dekat surat (dalam area interaksi)
            // Di sini kita pakai cara sederhana: cukup klik. Dalam game sungguhan, 
            // kita akan cek posisi kursor atau "pandangan" pemain.
            const mouseX = e.clientX - containerRect.left;
            const mouseY = e.clientY - containerRect.top;

            if (mouseX >= rect.left && mouseX <= rect.right &&
                mouseY >= rect.top && mouseY <= rect.bottom) {
                
                noteDisplay.style.display = 'flex';
                isNoteVisible = true;
            }
        }
        
        // Interaksi dengan tombol "ESC" untuk menutup
        if (e.key === 'Escape' && isNoteVisible) {
            noteDisplay.style.display = 'none';
            isNoteVisible = false;
        }
    });

    // Interaksi alternatif dengan klik pada surat
    note.addEventListener('click', () => {
        noteDisplay.style.display = 'flex';
        isNoteVisible = true;
    });

    // Interaksi klik pada tombol close
    noteDisplay.addEventListener('click', (e) => {
        if (e.target.classList.contains('note-display')) {
            noteDisplay.style.display = 'none';
            isNoteVisible = false;
        }
    });
});
