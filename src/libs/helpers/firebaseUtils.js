import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '@services/firebaseConfig';
import { collection, doc, setDoc, serverTimestamp, addDoc, deleteDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { dbFireStore } from "@services/firebaseConfig";
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

export const createEmptyPostsCollection = async (groupId) => {
    try {
        const placeholderRef = doc(dbFireStore, `groupPosts/${groupId}/posts/placeholder`);
        await setDoc(placeholderRef, {
            createdAt: new Date(),
            isPlaceholder: true,
        });

        console.log(`Colección de posts creada con placeholder para el grupo ${groupId}`);
    } catch (error) {
        console.error("Error al crear la colección de posts:", error);
        throw error;
    }
};

  export const listenToGroupMessages = (groupId, callback) => {
    const q = query(
      collection(dbFireStore, `groupPosts/${groupId}/posts`),
      orderBy("time", "desc")
    );
  
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((msg) => !msg.isPlaceholder);
  
      callback(messages);
    });
  };

  export const createGroupPost = async (groupId, message, user) => {
    try {
      const postRef = collection(dbFireStore, `groupPosts/${groupId}/posts`);
      await addDoc(postRef, {
        message,
        time: serverTimestamp(),
        user,
      });
  
      // Eliminar el placeholder después de crear el primer post
      const placeholderRef = doc(dbFireStore, `groupPosts/${groupId}/posts/placeholder`);
      await deleteDoc(placeholderRef);
    } catch (error) {
      console.error("Error al crear el post:", error);
      throw error;
    }
  };
  