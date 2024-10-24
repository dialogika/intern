(function() {
    const currentURL = window.location.href;

    // Memeriksa apakah URL mengandung domain dialogika.co
    if (/^(https?:\/\/)?(www\.)?dialogika\.co/.test(currentURL)) {
        // Menggunakan Fetch untuk mengirim GET request ke URL
        fetch(currentURL, { method: 'GET' })
            .then(response => {
                console.log('Status code:', response.status); // Logging status response untuk pengecekan
                if (response.status === 404) {
                    // Jika status 404, arahkan ke halaman 404
                    window.location.href = 'https://www.dialogika.co/404.html';
                } else if (response.status >= 200 && response.status < 300) {
                    // Jika status 2xx (sukses), tidak perlu melakukan apa-apa
                    console.log("Halaman ditemukan, status OK");
                }
            })
            .catch(error => {
                // Jika terjadi kesalahan lain (seperti jaringan), arahkan ke halaman 404
                console.error("Error occurred: ", error);
                window.location.href = 'https://www.dialogika.co/404.html';
            });
    } else {
        // Jika bukan domain yang valid, arahkan ke halaman 404
        window.location.href = 'https://www.dialogika.co/404.html';
    }
})();
