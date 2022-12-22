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
        
        render() {}
    }
});
