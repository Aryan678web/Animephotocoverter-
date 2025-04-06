document.getElementById("upload-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const fileInput = document.getElementById("image");
  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  const loadingText = document.getElementById("loading-text");
  const resultDiv = document.getElementById("result");

  loadingText.style.display = "block";
  resultDiv.innerHTML = "";

  try {
    const response = await fetch("https://deepai-proxy-backend.onrender.com/convert", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    loadingText.style.display = "none";

    if (data.output_url) {
      resultDiv.innerHTML = `<img src="${data.output_url}" alt="Anime Image" style="max-width:100%; border-radius: 12px;" />`;
    } else {
      resultDiv.innerHTML = "<p>Conversion failed. Please try again.</p>";
    }
  } catch (error) {
    loadingText.style.display = "none";
    resultDiv.innerHTML = "<p>Error occurred. Please check your connection or try again later.</p>";
    console.error("Error:", error);
  
});￼Enter
