import axiosInstance from "@libs/helpers/axiosInstance";

export const addStudentToGroup = async (group_id, newStudent) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        newStudent = {
            alumno_id: newStudent._id,
        }

        const response = await axiosInstance.post(
            `groups/${group_id}/addStudent`,
            newStudent,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {
        throw error.response?.data?.error || error.message;
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

export const getStudent = async (q, page = 1, limit = 10) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.get(`/users/`, {
            params: {
                q,
                page,
                limit
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
