(function() {
    const currentURL = window.location.href;

    // Memeriksa apakah URL mengandung domain dialogika.co
    if (/^(https?:\/\/)?(www\.)?dialogika\.co/.test(currentURL)) {
        // Menggunakan Fetch untuk memeriksa keberadaan URL
        fetch(currentURL)
            .then(response => {
                console.log('Status code:', response.status); // Log status code untuk debugging
                if (response.status === 404) {
                    // Jika 404, arahkan ke halaman 404
                    window.location.href = 'https://www.dialogika.co/404.html';
                }
            })
            .catch(() => {
                // Jika terjadi kesalahan jaringan, arahkan ke halaman 404
                window.location.href = 'https://www.dialogika.co/404.html';
            });
    } else {
        // Jika bukan domain yang valid, arahkan ke halaman 404
        window.location.href = 'https://www.dialogika.co/404.html';
    }
})();
