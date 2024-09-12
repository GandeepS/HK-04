
// Handle collapsible sections
document.addEventListener("DOMContentLoaded", function() {
    const collapsibles = document.querySelectorAll(".collapsible");

    collapsibles.forEach((collapsible) => {
        collapsible.addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;

            if (content.style.display === "block") {
                content.style.display = "none";
                this.querySelector(".arrow").innerHTML = "&#9660;"; // Down arrow
            } else {
                content.style.display = "block";
                this.querySelector(".arrow").innerHTML = "&#9650;"; // Up arrow
            }
        });
    });
});

// Handle any other interactive features, such as opening links in new tabs, etc.
