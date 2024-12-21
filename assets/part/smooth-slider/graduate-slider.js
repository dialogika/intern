document.addEventListener("DOMContentLoaded", function () {
  var MySwiperL = new Swiper(".left-card-batch", {
    direction: "vertical",
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    speed: 9000,
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
  var MySwiperM = new Swiper(".middle-card-batch", {
    direction: "vertical",
    loop: true,
    autoplay: {
      delay: 1000,
      pauseOnMouseEnter: false,
      disableOnInteraction: false,
      reverseDirection: true,
    },
    speed: 9000,
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
  });
  var MySwiperR = new Swiper(".right-card-batch", {
    direction: "vertical",
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    speed: 9000,
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
  document.addEventListener("visibilitychange", () => {
    const swipers = [MySwiperL, MySwiperM, MySwiperR];
    if (document.hidden) {
      swipers.forEach((swiper) => swiper.autoplay.stop());
    } else {
      swipers.forEach((swiper) => swiper.autoplay.start());
    }
  });
});
