(function() {
    const currentURL = window.location.href; // Get the current page URL

    // Check if the URL contains the domain dialogika.co
    if (/^(https?:\/\/)?(www\.)?dialogika\.co/.test(currentURL)) {
        // Create an XMLHttpRequest to send a GET request
        var xhr = new XMLHttpRequest();
        xhr.open('GET', currentURL, true); // Asynchronous request
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // Request is complete
                console.log('Status code:', xhr.status); // Log status response for checking
                if (xhr.status === 404) {
                    // If status is 404, redirect to the custom 404 page
                    window.location.href = 'https://www.dialogika.co/404.html';
                } else if (xhr.status >= 200 && xhr.status < 300) {
                    // If status is 2xx (success), log a success message
                    console.log("Halaman ditemukan, status OK");
                }
            }
        };
        xhr.send();  // Send the request
    } else {
        // If the URL is not valid, redirect to the custom 404 page
        window.location.href = 'https://www.dialogika.co/404.html';
    }
})();
