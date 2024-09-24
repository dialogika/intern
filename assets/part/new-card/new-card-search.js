document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input-intern");
  const internCards = document.querySelectorAll(".card");
  const completedInternTitle = document.querySelector(".intern-section-title");
  const incompleteInternTitle = document.querySelector(".incomplete-intern-title");
  const completedInternSection = document.querySelector('[data-id="completed-intern"]');
  const incompleteInternSection = document.querySelector('[data-id="incomplete-intern"]');

  searchInput.addEventListener("input", function () {
    const searchQuery = this.value.toLowerCase();
    let hasCompletedResults = false;
    let hasIncompleteResults = false;

    // Loop through all intern cards
    internCards.forEach((card) => {
      const internNameElement = card.querySelector("h1.card-fullname");
      if (internNameElement) {
        const internName = internNameElement.innerText.toLowerCase();

        // Cek card element terdekat dengan data-id=completed-intern atau tidak
        const isCompleted = card.closest('[data-id="completed-intern"]') !== null;

        // Show card dan hide section lainnya
        if (internName.includes(searchQuery)) {
          card.style.display = "flex";
          if (isCompleted) {
            hasCompletedResults = true;
          } else {
            hasIncompleteResults = true;
          }
        } else {
          card.style.display = "none";
        }
      }
    });

    // Toogle section tampilkan/tidak berdasarkan input 
    if (searchQuery) {
      completedInternTitle.innerText = "HASIL SEARCH";
      incompleteInternTitle.innerText = "HASIL SEARCH";

      if (!hasCompletedResults) {
        completedInternSection.style.display = "none";
      } else {
        completedInternSection.style.display = "flex";
      }

      if (!hasIncompleteResults) {
        incompleteInternSection.style.display = "none";
      } else {
        incompleteInternSection.style.display = "flex";
      }
    } else {
      // Reset section visiblity bila tidak ada hasil
      completedInternTitle.innerText = "COMPLETED INTERN";
      incompleteInternTitle.innerText = "INCOMPLETE INTERN";

      // Reset sections to display all
      completedInternSection.style.display = "flex";
      incompleteInternSection.style.display = "flex";

      // Reset cards visibility
      internCards.forEach((card) => {
        card.style.display = "flex";
      });
    }
  });
});
