document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("cameraFeed");
    const startButton = document.getElementById("startCamera");
    const stopButton = document.getElementById("stopCamera");
    let stream;

    async function startCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
            video.srcObject = stream;
        } catch (error) {
            console.error("Error accessing camera:", error);
            alert("Failed to access the camera. Please check your permissions and ensure no other applications are using it.");
        }
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }
    }

    startButton.addEventListener("click", startCamera);
    stopButton.addEventListener("click", stopCamera);
});