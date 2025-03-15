document.addEventListener("DOMContentLoaded", () => {
    const alertBox = document.getElementById("alert-box");
    const stopButton = document.getElementById("stop-alert");

    let alertActive = true; // Flag to track if alerts are active

    stopButton.addEventListener("click", () => {
        if (alertActive) {
            alertBox.style.animation = "fadeOut 0.5s forwards"; // Apply fade out animation
            setTimeout(() => {
                alertBox.style.display = "none"; // Hide after animation
            }, 500);
            alertActive = false; // Disable further alerts
        }
    });
});
