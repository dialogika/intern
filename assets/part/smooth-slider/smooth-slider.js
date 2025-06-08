class SmoothSlider extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
            <div class="w-100 position-relative overflow-hidden py-3 smooth-swiper-container-top">
              <div class="swiper-wrapper align-items-center">
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/uad.png" class="rounded" alt="universitas Ahmad Dahlan logo" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/amikom.png" class="rounded" alt="Universitas Amikom Yogyakarta logo" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/PertaminaDrilling.png" class="rounded" alt="Pertamina Drilling logo" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/gides.webp" class="rounded" alt="Gides Go Digital Desa logo" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/KusumaDentalCare.png" class="rounded" alt="Kusuma Dental Care logo" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/mercu.png" class="rounded" alt="Universitas Mercu Buana logo" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/KOSABANGSA.webp" class="rounded" alt="Kosabangsa logo" />
                </div>
              </div>
            </div>
            <div class="w-100 position-relative overflow-hidden py-3 smooth-swiper-container-middle">
              <div class="swiper-wrapper align-items-center">
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/avo.webp" class="rounded" alt="AVO Innovation & Technology logo" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/polita.png" class="rounded" alt="Politeknik Aisyiyah Pontianak logo" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/ruhui-rahayu.png" class="rounded"
                    alt="Kabupaten Tapin Kalimantan Timur logo" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/aveon.png" class="rounded" alt="Aveon Hotel logo" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/UNM.webp" class="rounded" alt="Universitas Negeri Makassar" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/desa-matano.webp" class="rounded" alt="Desa Matano logo" />
                </div>
                <div class="swiper-slide swiper-images">
                  <img src="assets/img/corporate/smk-dr-sutomo-temanggung.png" class="rounded"
                    alt="SMK Dr Sutomo Temanggung logo" />
                </div>
              </div>

              <div class="w-100 position-relative overflow-hidden py-3 smooth-swiper-container-bottom">
                <div class="swiper-wrapper align-items-center">
                  <div class="swiper-slide swiper-images">
                    <img src="assets/img/corporate/uin-suka.png" class="rounded" alt="UIN Suka logo" />
                  </div>
                  <div class="swiper-slide swiper-images">
                    <img src="assets/img/corporate/uii.png" class="rounded" alt="Universitas Islam Indonesia logo" />
                  </div>
                  <div class="swiper-slide swiper-images">
                    <img src="assets/img/corporate/mnc.webp" class="rounded" alt="MNCTV logo" />
                  </div>
                  <div class="swiper-slide swiper-images">
                    <img src="assets/img/corporate/kdi.webp" class="rounded" alt="Kontes Dangdut Indonesia logo" />
                  </div>
                  <div class="swiper-slide swiper-images">
                    <img src="assets/img/corporate/ugm.png" class="rounded" alt="Universitas Gadjah Mada logo" />
                  </div>
                  <div class="swiper-slide swiper-images">
                    <img src="assets/img/corporate/ui.png" class="rounded" alt="Universitas Indonesia logo" />
                  </div>
                  <div class="swiper-slide swiper-images">
                    <img src="assets/img/corporate/smartano.webp" class="rounded" alt="Smartano logo" />
                  </div>
                </div>
              </div>
            </div>

    `;
  }
}

customElements.define("smooth-slider", SmoothSlider);

document.addEventListener("DOMContentLoaded", function () {
  var MySwiperR = new Swiper(".smooth-swiper-container-top", {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    speed: 5000,
    breakpoints: {
      320: {
        slidesPerView: "auto",
        spaceBetween: 10,
      },
      480: {
        slidesPerView: "auto",
        spaceBetween: 20,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  var MySwiperR = new Swiper(".smooth-swiper-container-middle", {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      reverseDirection: true,
    },
    speed: 5000,
    breakpoints: {
      320: {
        slidesPerView: "auto",
        spaceBetween: 10,
      },
      480: {
        slidesPerView: "auto",
        spaceBetween: 20,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var MySwiperL = new Swiper(".smooth-swiper-container-bottom", {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    speed: 5000,
    breakpoints: {
      320: {
        slidesPerView: "auto",
        spaceBetween: 10,
      },
      480: {
        slidesPerView: "auto",
        spaceBetween: 20,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
