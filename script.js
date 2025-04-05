asasync function convertToAnime() {
  const fileInput = document.getElementById('upload');
  const outputDiv = document.getElementById('output');

  if (!fileInput.files[0]) {
    outputDiv.innerHTML = 'Please upload an image first.';
    return;
  }

  const formData = new FormData();
  formData.append('image', fileInput.files[0]);

  outputDiv.innerHTML = 'Converting... Please wait.';

  try {
    const response = await fetch('https://api.deepai.org/api/toonify', {
      method: 'POST',
      headers: {
        'Api-Key': 'e80a2dbf-6a11-4264-be2a-5d65e349fa5e',
      },
      body: formData,
    });

    const result = await response.json();

    if (result.output_url) {
      outputDiv.innerHTML = `<img src="${result.output_url}" alt="Anime Image" style="max-width: 100%; border-radius: 10px;">`;
    } else {
      outputDiv.innerHTML = 'Failed to convert image. Try a different one.';
    }
  } catch (error) {
    outputDiv.innerHTML = 'Error: ' + error.message;
  }
}￼Enter
