import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '@services/firebase/firebaseConfig';

export const uploadImageAndGetUrl = async (file, folder = "uploads") => {
    if (!file) throw new Error("No file provided");

    const fileRef = ref(storage, `${folder}/${crypto.randomUUID()}-${file.name}`);

    try {
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        return { url, fileRef };
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
};

export const deleteImage = async (fileRef) => {
    try {
        await deleteObject(fileRef);
        console.log("Imagen eliminada de Firebase");
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
    }
};

export const getStoragePathFromUrl = (url) => {
    const pathStart = url.indexOf("/o/") + 3;
    const pathEnd = url.indexOf("?");
    const fullPath = url.substring(pathStart, pathEnd);
    return decodeURIComponent(fullPath);
};

export const deleteImageByUrl = async (url) => {
    try {
        const path = getStoragePathFromUrl(url);
        const fileRef = ref(storage, path);
        await deleteObject(fileRef);
        console.log("Imagen anterior eliminada de Firebase");
    } catch (error) {
        console.error("Error al eliminar imagen por URL:", error);
    }
};
