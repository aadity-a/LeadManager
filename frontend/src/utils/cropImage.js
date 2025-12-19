export const getCroppedImg = (imageSrc, pixelCrop) => {
    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
            image.src = url;
        });

    return new Promise(async (resolve, reject) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Force strict output dimensions as requested: 450x350
        canvas.width = 450;
        canvas.height = 350;

        // Draw the cropped image onto the canvas, resizing it to fit the 450x350 container
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            450,
            350
        );

        // As Base64 string
        const base64Image = canvas.toDataURL('image/jpeg');
        resolve(base64Image);

        // Alternatively, return as Blob
        // canvas.toBlob((blob) => {
        //   resolve(blob);
        // }, 'image/jpeg');
    });
};
