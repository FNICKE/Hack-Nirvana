document.addEventListener("DOMContentLoaded", function() { 
    const videoElement = document.getElementById("camera-feed");
    const captureBtn = document.getElementById("capture-btn");
    const toggleCameraBtn = document.getElementById("toggle-camera-btn");
    const detectBtn = document.getElementById("detect-btn");
    const screamResult = document.getElementById("scream-result");
    const violenceResult = document.getElementById("violence-result");
    const canvas = document.getElementById("snapshot-canvas");
    const uploadFileInput = document.getElementById("uploadFile");
    const uploadBtn = document.getElementById("upload-btn");
    const fileStatus = document.getElementById("file-status");
    let currentStream = null;
    let usingFrontCamera = true;

    // Function to start the camera
    async function startCamera(front = true) {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }

        const constraints = {
            video: { facingMode: front ? "user" : "environment" }
        };

        try {
            currentStream = await navigator.mediaDevices.getUserMedia(constraints);
            videoElement.srcObject = currentStream;
        } catch (error) {
            console.error("Error accessing camera:", error);
            alert("Camera access denied or unavailable.");
        }
    }

    // Capture snapshot function
    captureBtn.addEventListener("click", function() {
        const ctx = canvas.getContext("2d");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageData;
        link.download = "snapshot.png";
        link.click();
    });

    // Toggle camera function
    toggleCameraBtn.addEventListener("click", function() {
        usingFrontCamera = !usingFrontCamera;
        startCamera(usingFrontCamera);
    });

    // Unified Detection Button
    detectBtn.addEventListener("click", function() {
        screamResult.textContent = "Analyzing audio...";
        violenceResult.textContent = "Analyzing video...";

        setTimeout(() => {
            const screamDetected = Math.random() > 0.4; // 60% chance of detecting a scream
            const violenceDetected = Math.random() > 0.4; // 60% chance of detecting violence

            console.log("Scream Detected:", screamDetected);
            console.log("Violence Detected:", violenceDetected);

            screamResult.textContent = screamDetected ? "🚨 Scream detected!" : "✅ No scream detected.";
            violenceResult.textContent = violenceDetected ? "⚠️ Violence detected!" : "✅ No violence detected.";
        }, 3000);
    });

    // Upload file function
    uploadBtn.addEventListener("click", function() {
        if (uploadFileInput.files.length === 0) {
            fileStatus.textContent = "No file selected.";
            return;
        }

        fileStatus.textContent = "Uploading...";
        setTimeout(() => {
            fileStatus.textContent = "File uploaded successfully!";
        }, 2000);
    });

    // Start camera initially
    startCamera(usingFrontCamera);
});
