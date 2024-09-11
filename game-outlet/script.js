document.addEventListener("DOMContentLoaded", () => {

    // Menu toggle
    const menuBtn = document.querySelector("#menu-btn");
    const nav = document.querySelector("nav ul");

    function navToggle() {
        if (nav.getAttribute("id") === "nav-toggle") {
            nav.setAttribute("id", "");
        } else {
            nav.setAttribute("id", "nav-toggle");
        }
    }

    function setCurrentState() {
        const currentState = menuBtn.getAttribute("data-state");
        if (!currentState || currentState === "closed") {
            menuBtn.setAttribute("data-state", "opened");
            menuBtn.setAttribute("aria-expanded", "true");
        } else {
            menuBtn.setAttribute("data-state", "closed");
            menuBtn.setAttribute("aria-expanded", "false");
        }
    }

    menuBtn.addEventListener("click", () => {
        navToggle();
        setCurrentState();
        gsap.from("nav ul", {
            duration: 0.5,
            opacity: 0,
            x: -300
        });
    });

    // Header scroll
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    const stickyPoint = 121;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > stickyPoint) {
            if (currentScrollY < lastScrollY) {
                header.classList.add('small');
                header.style.position = 'fixed';
                header.style.transform = 'translateY(0)';
                menuBtn.style.top = '1.15rem';
            } else {
                header.style.transform = 'translateY(-150vh)';
            }
        } else {
            header.classList.remove('small');
            header.style.position = 'absolute';
            header.style.transform = 'translateY(0)';
            menuBtn.style.top = '2rem';
        }

        lastScrollY = currentScrollY;
    });

    // Card randomization
    const allCards = Array.from(document.querySelectorAll("#all-cards .card"));
    const selectedCardsContainer = document.getElementById("selected-cards");
    const refreshButton = document.getElementById("refresh-button");

    let isMediumScreen = window.matchMedia("(max-width: 64rem)").matches;
    let currentCardCount = isMediumScreen ? 4 : 3;

    function getRandomCards(arr, count) {
        const randomCards = [];
        const usedIndices = new Set();

        while (randomCards.length < count) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            if (!usedIndices.has(randomIndex)) {
                randomCards.push(arr[randomIndex]);
                usedIndices.add(randomIndex);
            }
        }

        return randomCards;
    }

    function displayRandomCards(count) {
        selectedCardsContainer.innerHTML = "";
        const randomCards = getRandomCards(allCards, count);
        randomCards.forEach(card => selectedCardsContainer.appendChild(card));
    }

    function checkMediaQuery(e) {
        const newIsMediumScreen = e.matches;
        if (newIsMediumScreen !== isMediumScreen) {
            isMediumScreen = newIsMediumScreen;
            currentCardCount = isMediumScreen ? 4 : 3;
            displayRandomCards(currentCardCount);
        }
    }

    displayRandomCards(currentCardCount);
    refreshButton.addEventListener("click", () => displayRandomCards(currentCardCount));

    const mediaQuery = window.matchMedia("(max-width: 64rem)");
    mediaQuery.addEventListener('change', checkMediaQuery);

    // GSAP animations
    gsap.from(".logo", {
        duration: 1,
        opacity: 0,
        y: -100
    });
    gsap.from("nav ul li", {
        duration: 1,
        opacity: 0,
        y: -100,
        stagger: 0.2
    });
    gsap.from("#menu-btn", {
        duration: 1,
        opacity: 0,
        y: -100,
    });
    gsap.from(".content .text > *", {
        duration: 1,
        opacity: 0,
        y: 100,
        stagger: 0.6,
        delay: 1.6
    });
    gsap.from(".products .card", {
        duration: 1,
        opacity: 0,
        y: 100,
        stagger: 0.6,
        delay: 2
    });
    gsap.from(".content .img", {
        duration: 3,
        opacity: 0,
        x: 300,
        stagger: 0.6,
        delay: 3
    });
    gsap.from("#refresh-button", {
        duration: 2,
        opacity: 0,
        delay: 6
    });
});