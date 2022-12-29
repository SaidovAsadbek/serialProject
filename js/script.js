window.addEventListener("DOMContentLoaded", () => {
    // Loader
    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 100);
    }, 500);

    // tabContents
    const tabsParent = document.querySelector(".tabheader__items"),
        tabs = document.querySelectorAll(".tabheader__item"),
        tabContent = document.querySelectorAll(".tabcontent");

    // hide
    const hideTabsContent = () => {
        tabContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((tab) => {
            tab.classList.remove("tabheader__item_active");
        });
    };

    // show
    const showTabsContent = (i = 0) => {
        tabContent[i].classList.remove("hide");
        tabContent[i].classList.add("show", "fade");
        tabs[i].classList.add("tabheader__item_active");
    };

    hideTabsContent();
    showTabsContent();

    // tabsParent
    tabsParent.addEventListener("click", (e) => {
        const target = e.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabsContent();
                    showTabsContent(index);
                }
            });
        }
    });

    // class MenuCard
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 11000;
            this.changeToUzs();
        }

        changeToUzs = () => {
            this.price = this.price * this.transfer;
        };

        render() {
            const element = document.createElement("div");
            element.classList.add("menu__item");

            element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total">
                        <span>${this.price}</span> uzs/month
                    </div>
                </div>
            `;
            this.parentSelector.append(element);
        }
    }
    new MenuCard(
        "img/tabs/1.png",
        "Alt",
        "Product 1",
        "This's description",
        11,
        ".menu .container"
    ).render();
    new MenuCard(
        "img/tabs/3.jpg",
        "Alt",
        "Product 2",
        "This's description",
        12,
        ".menu .container"
    ).render();
    new MenuCard(
        "img/tabs/2.jpg",
        "Alt",
        "Product 3",
        "This's description",
        11,
        ".menu .container"
    ).render();

    // Modal
    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal"),
        modalCloseBtn = document.querySelector("[data-close]");

    function closeModal() {
        modal.classList.remove("show");
        modal.classList.add("hide");
        document.body.style.overflow = "auto";
    }
    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
    }

    modalTrigger.forEach((trigger) =>
        trigger.addEventListener("click", openModal)
    );

    modalCloseBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);

    // Timer
    const deadline = `2023-01-1`;

    function getTimeRemaining(endTime) {
        let days, hours, minutes, seconds;
        const timer = Date.parse(endTime) - Date.parse(new Date());
        // console.log(timer);

        if (timer <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(timer / (1000 * 60 * 60 * 24));
            hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((timer / 1000 / 60) % 60);
            seconds = Math.floor((timer / 1000) % 60);
            // console.log(days, hours, minutes, seconds);
        }

        return { timer, days, hours, minutes, seconds };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.timer <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);

    // Slider and Indicators
    const slides = document.querySelectorAll(".offer__slide"),
        next = document.querySelector(".offer__slider-next"),
        prev = document.querySelector(".offer__slider-prev"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(".offer__slider");

    let offset = 0;
    let slideIndex = 1;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = ".5s ease all";
    slidesWrapper.style.overflow = "hidden";

    slides.forEach((slide) => (slide.style.width = width));

    next.addEventListener("click", () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });
});
