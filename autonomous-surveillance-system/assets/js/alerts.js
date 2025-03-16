document.addEventListener("DOMContentLoaded", function() {
    const alertsList = document.getElementById("alerts-list");
    const clearAlertsBtn = document.getElementById("clear-alerts");

    function addAlert(message, type = "warning") {
        const alertItem = document.createElement("div");
        alertItem.classList.add("alert", `alert-${type}`, "slide-in");
        alertItem.innerHTML = `
            <span>${message}</span>
            <small>${new Date().toLocaleTimeString()}</small>
            <div class="alert-actions">
                <button class="btn-primary mark-read">✔ Mark Read</button>
                <button class="btn-secondary dismiss-btn">✖ Dismiss</button>
            </div>
        `;

        alertItem.querySelector(".dismiss-btn").addEventListener("click", function() {
            alertItem.classList.add("fade-out");
            setTimeout(() => alertItem.remove(), 500);
        });

        alertItem.querySelector(".mark-read").addEventListener("click", function() {
            alertItem.style.opacity = "0.5";
        });

        alertsList.prepend(alertItem);

        setTimeout(() => {
            alertItem.classList.add("fade-out");
            setTimeout(() => alertItem.remove(), 500);
        }, 7000);
    }

    clearAlertsBtn.addEventListener("click", function() {
        alertsList.innerHTML = "";
    });

    setInterval(() => {
        const alerts = ["Motion detected!", "Camera offline!", "Unauthorized access detected!"];
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        addAlert(randomAlert, "error");
    }, 10000);
});
