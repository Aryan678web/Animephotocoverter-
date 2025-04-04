document.getElementById("convert-btn").addEventListener("click", async function () {
    const apiKey = "e80a2dbf-6a11-4264-be2a-5d65e349fa5e";  // आपकी DeepAI API Key
    const uploadInput = document.getElementById("upload");
    const outputDiv = document.getElementById("output");

    if (uploadInput.files.length === 0) {
        alert("कृपया पहले एक इमेज अपलोड करें!");
        return;
    }

    const file = uploadInput.files[0];
    const formData = new FormData();
    formData.append("image", file);

    // लोडिंग संदेश दिखाएं
    outputDiv.innerHTML = `
        <div class="loader"></div>
        <p style="color: #555;">कृपया प्रतीक्षा करें, इमेज को Anime में परिवर्तित किया जा रहा है...</p>
    `;

    try {
        const response = await fetch("https://api.deepai.org/api/toonify", {
            method: "POST",
            headers: {
                "Api-Key": apiKey
            },
            body: formData
        });

        const result = await response.json();

        if (result.output_url) {
            outputDiv.innerHTML = `
                <h3 style="color: #333;">आपकी Anime इमेज:</h3>
                <img src="${result.output_url}" alt="Anime Image" style="max-width: 100%; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
            `;
        } else {
            outputDiv.innerHTML = `<p style="color: red;">त्रुटि: इमेज को परिवर्तित करने में असमर्थ। कृपया पुनः प्रयास करें।</p>`;
        }
    } catch (error) {
        outputDiv.innerHTML = `<p style="color: red;">कुछ गलत हो गया! कृपया अपने इंटरनेट कनेक्शन या API Key की जांच करें।</p>`;
    }
});￼Enter
