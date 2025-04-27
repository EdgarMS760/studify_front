import axiosInstance from "@libs/helpers/axiosInstance";
export const postMaterial = async (newMaterial) => {
    try {
        const storedUser = JSON.parse(localStorage.getItem('user_studify'));
        const token = localStorage.getItem('token_studify');
        const id = storedUser?._id;

        if (!id || !token) throw new Error("Faltan datos del usuario o token");

        newMaterial.maestro_id = id;

        const response = await axiosInstance.post(
            "/classmat",
            newMaterial,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error al subir el material:", error);
        throw error;
    }
};