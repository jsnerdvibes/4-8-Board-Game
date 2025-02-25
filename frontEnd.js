document.querySelectorAll("#selectPlayer span").forEach((box) => {
    box.addEventListener("click", function () {
        document.querySelectorAll("#selectPlayer span").forEach((el) => 
            el.classList.remove("selected")
        );
        this.classList.add("selected"); // Highlight the clicked box
    });
});

const diceImage = {
    '1': `<svg width="100%" height="100%" viewBox="0 0 100 100" fill="black" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="15" fill="white"/>
            <circle cx="50" cy="50" r="10" fill="black"/>
          </svg>`,

    '2': `<svg width="100%" height="100%" viewBox="0 0 100 100" fill="black" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="15" fill="white"/>
            <circle cx="30" cy="30" r="10" fill="black"/>
            <circle cx="70" cy="70" r="10" fill="black"/>
          </svg>`,

    '3': `<svg width="100%" height="100%" viewBox="0 0 100 100" fill="black" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="15" fill="white"/>
            <circle cx="30" cy="30" r="10" fill="black"/>
            <circle cx="50" cy="50" r="10" fill="black"/>
            <circle cx="70" cy="70" r="10" fill="black"/>
          </svg>`,

    '4': `<svg width="100%" height="100%" viewBox="0 0 100 100" fill="black" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="15" fill="white"/>
            <circle cx="30" cy="30" r="10" fill="black"/>
            <circle cx="30" cy="70" r="10" fill="black"/>
            <circle cx="70" cy="30" r="10" fill="black"/>
            <circle cx="70" cy="70" r="10" fill="black"/>
          </svg>`,

    '5': `<svg width="100%" height="100%" viewBox="0 0 100 100" fill="black" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="15" fill="white"/>
            <circle cx="30" cy="30" r="10" fill="black"/>
            <circle cx="30" cy="70" r="10" fill="black"/>
            <circle cx="50" cy="50" r="10" fill="black"/>
            <circle cx="70" cy="30" r="10" fill="black"/>
            <circle cx="70" cy="70" r="10" fill="black"/>
          </svg>`,

    '6': `<svg width="100%" height="100%" viewBox="0 0 100 100" fill="black" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="15" fill="white"/>
            <circle cx="30" cy="30" r="10" fill="black"/>
            <circle cx="30" cy="50" r="10" fill="black"/>
            <circle cx="30" cy="70" r="10" fill="black"/>
            <circle cx="70" cy="30" r="10" fill="black"/>
            <circle cx="70" cy="50" r="10" fill="black"/>
            <circle cx="70" cy="70" r="10" fill="black"/>
          </svg>`,
};


