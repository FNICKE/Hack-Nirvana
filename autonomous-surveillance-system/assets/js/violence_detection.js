document.addEventListener("DOMContentLoaded", async function () {
    const videoElement = document.getElementById("camera-feed");
    const detectViolenceBtn = document.getElementById("detect-violence-btn");
    const violenceResult = document.getElementById("violence-result");
    let model = null;
    let currentStream = null;

    // Load Violence Detection Model
    async function loadModel() {
        try {
            model = await tf.loadLayersModel("../assets/models/violence_model.json");
            console.log("✅ Violence Detection Model Loaded Successfully");
        } catch (error) {
            console.error("❌ Model Load Error:", error);
            alert("Error loading model.");
        }
    }

    // Start Camera Feed
    async function startCamera() {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }

        try {
            currentStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = currentStream;
        } catch (error) {
            console.error("❌ Camera Error:", error);
            alert("Camera access denied.");
        }
    }

    // Capture Frame and Convert to Tensor
    function captureFrame() {
        const canvas = document.createElement("canvas");
        canvas.width = 224;  
        canvas.height = 224;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoElement, 0, 0, 224, 224);

        return tf.browser.fromPixels(canvas)
            .toFloat()
            .div(255) // Normalize Pixel Values
            .expandDims(0); // Add Batch Dimension
    }

    // Detect Violence
    async function detectViolence() {
        if (!model) {
            violenceResult.textContent = "❌ Model not loaded!";
            return;
        }

        violenceResult.textContent = "🔍 Analyzing Video...";
        const frameTensor = captureFrame();

        try {
            const prediction = model.predict(frameTensor);
            const predictionData = await prediction.data();

            console.log("🔍 Prediction Data:", predictionData);

            const confidence = predictionData[0]; // Assuming Binary Classification (Violence/No Violence)
            console.log(`Confidence Score: ${confidence}`);

            if (confidence > 1.0) { // Adjust threshold if necessary
                violenceResult.textContent = "⚠️ Violence Detected!";
            } else {
                violenceResult.textContent = "✅ No Violence Detected.";
            }
        } catch (error) {
            console.error("❌ Detection Error:", error);
            violenceResult.textContent = "❌ Error analyzing video.";
        } finally {
            tf.dispose(frameTensor); // Free memory
        }
    }

    detectViolenceBtn.addEventListener("click", detectViolence);

    await loadModel();
    startCamera();
});
