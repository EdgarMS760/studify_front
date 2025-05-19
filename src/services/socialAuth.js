import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@services/firebaseConfig";

export const getFirebaseUserAndToken = async (provider) => {
    try {
        const result = await signInWithPopup(auth, provider);
        const token = await result.user.getIdToken();
        const user = result.user;

        return { user, token };
    } catch (error) {
        console.error("Error con login social:", error);
        throw error;
    }
};

export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return getFirebaseUserAndToken(provider);
};

export const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return getFirebaseUserAndToken(provider);
};
