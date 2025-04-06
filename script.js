document.getElementById("upload-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("image-upload");
  const image = fileInput.files[0];

  if (!image) {
    alert("कृपया एक इमेज अपलोड करें");
    return;
  }

  const formData = new FormData();
  formData.append("image", image);

  const proxyUrl = "https://deepai-proxy-backend.onrender.com/anime-generator";

  try {
    document.getElementById("result").innerHTML = "कृपया प्रतीक्षा करें, प्रोसेस हो रही है...";

    const response = await fetch(proxyUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.output_url) {
      document.getElementById("result").innerHTML = `
        <h2>रिज़ल्ट:</h2>
        <img src="${data.output_url}" alt="Anime Image" style="max-width: 100%; border-radius: 10px;" />
        <br/><a href="${data.output_url}" download>डाउनलोड करें</a>
      `;
    } else {
      document.getElementById("result").innerHTML = "कुछ गड़बड़ हो गई। कृपया इमेज चेक करें।";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerHTML = "नेटवर्क या सर्वर में कोई समस्या है";
  }
});￼Enter
