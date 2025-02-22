document.querySelectorAll("#selectPlayer span").forEach((box) => {
    box.addEventListener("click", function () {
        document.querySelectorAll("#selectPlayer span").forEach((el) => 
            el.classList.remove("selected")
        );
        this.classList.add("selected"); // Highlight the clicked box
    });
});