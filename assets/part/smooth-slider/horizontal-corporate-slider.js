class horizontalSlider extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = ` 
            <div class="container-fluid" data-aos="fade-up">
                <div class="clients-slider swiper">
                <div class="swiper-wrapper align-items-center">
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/PertaminaDrilling.png" class="img-fluid object-fit-contain" style="max-height: 80px;"
                            alt="Pertamina Drilling logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/uad.png" class="img-fluid object-fit-contain" style="max-height: 80px;"
                            alt="universitas Ahmad Dahlan logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/amikom.png" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="Universitas Amikom Yogyakarta logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/gides.webp" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="Gides Go Digital Desa logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/KusumaDentalCare.png" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="Kusuma Dental Care logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/mercu.png" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="Universitas Mercu Buana logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/KOSABANGSA.webp" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="Kosabangsa logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/avo.webp" class="img-fluid object-fit-contain" style="max-height: 80px;"
                            alt="AVO Innovation & Technology logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/polita.png" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="Politeknik Aisyiyah Pontianak logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/ruhui-rahayu.png" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="Kabupaten Tapin Kalimantan Timur logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/aveon.png" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="Aveon Hotel logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/UNM.webp" class="img-fluid object-fit-contain" style="max-height: 80px;"
                            alt="Universitas Negeri Makassar" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/desa-matano.webp" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="Desa Matano logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/smk-dr-sutomo-temanggung.png" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="SMK Dr Sutomo Temanggung logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/uin-suka.png" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="UIN Suka logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/uii.png" class="img-fluid object-fit-contain" style="max-height: 80px;"
                            alt="Universitas Islam Indonesia logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/mnc.webp" class="img-fluid object-fit-contain" style="max-height: 80px;"
                            alt="MNCTV logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/kdi.webp" class="img-fluid object-fit-contain" style="max-height: 80px;"
                            alt="Kontes Dangdut Indonesia logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/ugm.png" class="img-fluid object-fit-contain" style="max-height: 80px;"
                            alt="Universitas Gadjah Mada logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/ui.png" class="img-fluid object-fit-contain" style="max-height: 80px;"
                            alt="Universitas Indonesia logo" />
                        </div>
                        <div class="swiper-slide">
                        <img src="../assets/img/corporate/smartano.webp" class="img-fluid object-fit-contain"
                            style="max-height: 80px;" alt="Smartano logo" />
                        </div>

                        
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </div>
                        
        `;
    }
}

customElements.define('horizontal-slider', horizontalSlider);

