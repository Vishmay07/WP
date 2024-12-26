export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  export const convertImagesToBase64 = async (images) => {
    return Promise.all(images.map((image) => fileToBase64(image)));
  };
  