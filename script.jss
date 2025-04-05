document.getElementById("convert-btn").addEventListener("click", async function () {
    let fileInput = document.getElementById("upload");
    let outputDiv = document.getElementById("output");

    if (fileInput.files.length === 0) {
        alert("Please select an image first!");
        return;
    }

    let formData = new FormData();
    formData.append("image", fileInput.files[0]);

    let apiKey = "e80a2dbf-6a11-4264-be2a-5d65e349fa5e"; // तुम्हारी DeepAI API Key

    try {
        let response = await fetch("https://api.deepai.org/api/toonify", {
            method: "POST",
            body: formData,
            headers: {
                "api-key": apiKey
            }
        });

        let result = await response.json();

        if (result.output_url) {
            outputDiv.innerHTML = `<img src="${result.output_url}" alt="Anime Image" style="max-width: 100%;"/>`;
        } else {
            outputDiv.innerHTML = "<p>Conversion failed. Try again.</p>";
        }
    } catch (error) {
        console.error("Error:", error);
        outputDiv.innerHTML = "<p>Error occurred while processing your image.</p>";
    }
});
