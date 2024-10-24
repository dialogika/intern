(function() {
    const currentURL = window.location.href;

    // Memeriksa apakah URL mengandung domain dialogika.co
    if (/^(https?:\/\/)?(www\.)?dialogika\.co/.test(currentURL)) {
        // Membuat XMLHttpRequest untuk mengirim GET request
        var xhr = new XMLHttpRequest();
        xhr.open('GET', currentURL, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log('Status code:', xhr.status); // Logging status response untuk pengecekan
                if (xhr.status === 404) {
                    // Jika status 404, arahkan ke halaman 404
                    window.location.href = 'https://www.dialogika.co/404.html';
                } else if (xhr.status >= 200 && xhr.status < 300) {
                    // Jika status 2xx (sukses), tidak perlu melakukan apa-apa
                    console.log("Halaman ditemukan, status OK");
                }
            }
        };
        xhr.send();  // Mengirim request
    } else {
        // Jika bukan domain yang valid, arahkan ke halaman 404
        window.location.href = 'https://www.dialogika.co/404.html';
    }
})();
