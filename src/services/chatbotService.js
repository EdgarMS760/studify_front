import axiosInstance from "@libs/helpers/axiosInstance";

export const postMessageChatBot = async (obj) => {
    try {
        const token = localStorage.getItem('token_studify');
        const user = JSON.parse(localStorage.getItem('user_studify'));
        if (!user?._id) throw new Error("Falta ID de usuario");
        if (!token) throw new Error("Falta token");

        obj.userId = user._id;
        const response = await axiosInstance.post("/chat", obj, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        throw error;
    }
};

export const getActiveChatBot = async () => {
    try {
        const token = localStorage.getItem('token_studify');
        if (!token) throw new Error("Falta token");

        const user = JSON.parse(localStorage.getItem('user_studify'));
        if (!user?._id) throw new Error("Falta ID de usuario");
        const response = await axiosInstance.get(`/chat/conversation/${user._id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el chat activo:", error);
        throw error;
    }
}