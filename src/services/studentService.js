import axiosInstance from "@libs/helpers/axiosInstance";

export const addStudentToGroup = async (newStudent) => {
    try {
        const storedUser = JSON.parse(localStorage.getItem('user_studify'));
        const token = localStorage.getItem('token_studify');
        const id = storedUser?._id;

        if (!id || !token) throw new Error("Faltan datos del usuario o token");

        newStudent.maestro_id = id;

        const response = await axiosInstance.post(
            "/students",
            newStudent,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error al crear el estudiante:", error);
        throw error;
    }
}

export const getGroupStudents = async (group_id,) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.get(`/groups/${group_id}/getStudents`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
        throw error;
    }
}   
export const deleteGroupStudent = async (grupoId,studentId) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.delete(`/groups/${grupoId}/removestudent/${studentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        console.error("Error al eliminar el estudiante:", error);
        throw error;
    }
}

export const getStudent = async (email,usuario) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.get(`/users`, {
            params: {
                email
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        console.error("Error al obtener el estudiante:", error);
        throw error;
    }
}
