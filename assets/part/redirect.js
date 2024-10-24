(function() {
    const currentURL = window.location.href;

    // Memeriksa apakah URL mengandung domain dialogika.co
    if (/^(https?:\/\/)?(www\.)?dialogika\.co/.test(currentURL)) {
        // Menggunakan Fetch untuk memeriksa keberadaan URL
        fetch(currentURL)
            .then(response => {
                if (!response.ok) {
                    // Jika respons tidak ok (404, 500, dll.), arahkan ke halaman 404
                    window.location.href = 'https://www.dialogika.co/404.html';
                }
            })
            .catch(() => {
                // Jika terjadi kesalahan (jaringan atau lainnya), arahkan ke halaman 404
                window.location.href = 'https://www.dialogika.co/404.html';
            });
    } else {
        // Jika bukan domain yang valid, arahkan ke halaman 404
        window.location.href = 'https://www.dialogika.co/404.html';
    }
})();
