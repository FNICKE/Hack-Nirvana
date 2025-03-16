document.addEventListener("DOMContentLoaded", function() {
    const detectScreamBtn = document.getElementById("detect-scream-btn");
    const screamResult = document.getElementById("scream-result");
    const uploadFileInput = document.getElementById("uploadFile");
    const uploadBtn = document.getElementById("upload-btn");
    const fileStatus = document.getElementById("file-status");

    detectScreamBtn.addEventListener("click", function() {
        screamResult.textContent = "Analyzing audio...";
        
        // Simulating scream detection
        setTimeout(() => {
            screamResult.textContent = "No scream detected.";
        }, 2000);
    });

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
});
