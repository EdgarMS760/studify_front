import axiosInstance from "@libs/helpers/axiosInstance";
export const postTask = async (newTask) => {
    try {
        const storedUser = JSON.parse(localStorage.getItem('user_studify'));
        const token = localStorage.getItem('token_studify');

        if ( !token) throw new Error("Faltan token");

        const response = await axiosInstance.post(
            "/tasks",
            newTask,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error al crear la tarea:", error);
        throw error;
    }
};

export const getTasks = async (group_id, pagina = 1, limit = 10, status="Abierta") => {
    try {
        const storedUser = JSON.parse(localStorage.getItem('user_studify'));
        const token = localStorage.getItem('token_studify');
        const id = storedUser?._id;

        if (!id || !token) throw new Error("Faltan datos del usuario o token");

        const response = await axiosInstance.get("/tasks", {
            params: {
                pagina,
                status,
                group_id
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        throw error;
    }
}