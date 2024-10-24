(function() {
    const currentURL = window.location.href;

    // Memeriksa apakah URL mengandung domain dialogika.co
    if (/^(https?:\/\/)?(www\.)?dialogika\.co/.test(currentURL)) {
        // Fungsi untuk memvalidasi URL
        function checkValidURL(url) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4) {
                    console.log('Status code:', xmlhttp.status); // Logging status response untuk pengecekan
                    if (xmlhttp.status === 404) {
                        // Jika status 404, arahkan ke halaman 404
                        window.location.href = 'https://www.dialogika.co/404.html';
                    } else if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
                        // Jika status 2xx (sukses), tidak perlu melakukan apa-apa
                        console.log("Halaman ditemukan, status OK");
                    }
                }
            };
            // AJAX configuration
            xmlhttp.open("GET", url, true); // Gunakan "true" untuk asynchronous request
            xmlhttp.send();
        }

        // Memanggil fungsi untuk memvalidasi URL saat ini
        checkValidURL(currentURL);
    } else {
        // Jika bukan domain yang valid, arahkan ke halaman 404
        window.location.href = 'https://www.dialogika.co/404.html';
    }
})();
