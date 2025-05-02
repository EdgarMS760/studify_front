import axiosInstance from "@libs/helpers/axiosInstance";
export const postTask = async (newTask) => {
    try {
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

export const getTasks = async (group_id, status="Abierta", pagina = 1, limit = 10) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

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

export const getDetailTask = async (taskId) => {
    try {
        const token = localStorage.getItem('token_studify');

        if ( !token) throw new Error("Falta token");

        const response = await axiosInstance.get(`/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        console.error("Error al obtener la tarea:", error);
        throw error;
    }
}   