document.addEventListener("DOMContentLoaded", function() {
    fetch("../ui/navbar.html")
        .then(res => res.text())
        .then(data => document.getElementById("navbar").innerHTML = data);

    fetch("../ui/footer.html")
        .then(res => res.text())
        .then(data => document.getElementById("footer").innerHTML = data);
});
