import axiosInstance from "@libs/helpers/axiosInstance";
import { TIMEZONE } from "@libs/constants/timezone";
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
export const updateTask = async (taskId, updatedTask) => {
    try {
        const token = localStorage.getItem('token_studify');

        if ( !token) throw new Error("Falta token");

        const response = await axiosInstance.patch(
            `/tasks/${taskId}`,
            updatedTask,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;

    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        throw error;
    }
}

export const setGradeToTask = async (taskId, newGrades, alumno_id) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.post(
            `/tasks/${taskId}/gradeTask`,
            {
                alumno_id,
                calificacion: newGrades
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;

    } catch (error) {
        console.error("Error al calificar la tarea:", error);
        throw error;
    }
};
export const uploadTask= async (taskId, data) => {
    try {
        const token = localStorage.getItem('token_studify');
        const storedUser = JSON.parse(localStorage.getItem('user_studify'));
        if (!token || !storedUser?._id) throw new Error("Falta token o ID de usuario");
        data.alumno_id = storedUser._id;
        data.nombre_usuario = storedUser.nombre;
        const response = await axiosInstance.post(
            `/tasks/${taskId}/uploads`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
        return response.data;

    } catch (error) {
        console.error("Error al subir la tarea:", error);
        throw error;
    }
}
export const deleteUploadTask = async (taskId) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.delete(
            `/tasks/${taskId}/uploads`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;

    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        throw error;
    }
}

export const getTasksToCalendar = async (mes, year) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.get("/tasks/calendar", {
            params: {
                mes,
                year,
                timezone: TIMEZONE
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