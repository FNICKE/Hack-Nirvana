document.addEventListener("DOMContentLoaded", () => {
    // Load Navbar
    const navbarContainer = document.getElementById("navbar");
    if (navbarContainer) {
        fetch("../ui/navbar.html")
            .then(response => response.text())
            .then(data => {
                navbarContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading navbar:", error));
    }

    // Load Footer
    const footerContainer = document.getElementById("footer");
    if (footerContainer) {
        fetch("../ui/footer.html")
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading footer:", error));
    }
});
