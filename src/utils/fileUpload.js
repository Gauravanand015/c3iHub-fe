export const uploadToCloudinary = async (file) => {
  try {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "myuploads");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dcqylnqry/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
