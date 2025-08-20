// src/utils/imageResize.ts
export const resizeImage = (
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 600
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("No se pudo obtener el contexto del canvas");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (!blob) return reject("Error al generar el blob");
          const resizedFile = new File([blob], file.name, { type: file.type });
          resolve(resizedFile);
        }, file.type);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

// Generar preview
export const generatePreview = (file: File): string => URL.createObjectURL(file);
