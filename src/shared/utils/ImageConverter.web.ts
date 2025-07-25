export const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // This event fires when the file is successfully read
        reader.onload = () => {
            // reader.result contains the full 'data:image/jpeg;base64,...' string
            resolve(reader.result as string);
        };
        // This event fires if there's an error
        reader.onerror = (error) => {
            reject(error);
        };
        // This starts the reading process
        reader.readAsDataURL(file);
    });
};