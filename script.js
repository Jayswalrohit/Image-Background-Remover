document.getElementById('remove-bg').addEventListener('click', function () {
    const fileInput = document.getElementById('upload');
    const processingText = document.getElementById('processing');
    const resultImage = document.getElementById('result');

    if (fileInput.files.length === 0) {
        alert("Please upload an image first.");
        return;
    }

    // Show "Processing..." text
    processingText.style.display = "block";
    resultImage.style.display = "none"; // Hide result image until processing is done

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': 'sJqvwNtTfoFD3xS1Veqj6qWd'  // 🔴 Replace with secure API handling
        },
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        processingText.style.display = "none"; // Hide "Processing..."
        resultImage.src = url;
        resultImage.style.display = "block"; // Show the final processed image
    })
    .catch(error => {
        console.error('Error:', error);
        processingText.innerText = "Error processing image.";
    });
});
