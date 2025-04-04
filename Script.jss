async function convertToAnime() {
    const uploadInput = document.getElementById("upload");
    const file = uploadInput.files[0];
    const outputDiv = document.getElementById("output");

    if (!file) {
        alert("Please upload an image first!");
        return;
    }

    // Show loading animation
    outputDiv.innerHTML = `
        <div class="loader"></div>
        <p style="color: #555;">Converting to Anime... Please wait</p>
    `;

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch("https://api.deepai.org/api/toonify", {
            method: "POST",
            headers: {
                "api-key":"3e61286e-5791-4d45-9156-6d2bbf335037
            },
            body: formData
        });

        const result = await response.json();

        if (result.output_url) {
            outputDiv.innerHTML = `
                <h3 style="color: #333;">Your Anime Image:</h3>
                <img src="${result.output_url}" alt="Anime Image" style="max-width: 100%; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
            `;
        } else {
            outputDiv.innerHTML = `<p style="color: red;">Error: Unable to convert image. Try again.</p>`;
        }
    } catch (error) {
        outputDiv.innerHTML = `<p style="color: red;">Something went wrong! Please check your internet or API key.</p>`;
    }
}
