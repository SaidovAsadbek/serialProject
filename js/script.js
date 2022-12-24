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
});
