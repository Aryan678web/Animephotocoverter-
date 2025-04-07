const convertButton = document.getElementById("convert-button");
const imageInput = document.getElementById("image-input");
const resultDiv = document.getElementById("result");

convertButton.addEventListener("click", async () => {
  const file = imageInput.files[0];
  if (!file) {
    alert("Please select an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  resultDiv.innerHTML = "Processing... Please wait.";

  try {
    const response = await fetch("https://deepai-proxy-backend.onrender.com/convert", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.output_url) {
      resultDiv.innerHTML = `<img src="${data.output_url}" alt="Anime Image">`;
    } else {
      resultDiv.innerHTML = "Conversion failed. Please try again.";
    }
  } catch (error) {
    resultDiv.innerHTML = "Error: " + error.message;
  }
});￼Enter
