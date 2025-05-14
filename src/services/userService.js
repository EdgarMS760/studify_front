import axiosInstance from "@libs/helpers/axiosInstance";
import { externalLoadSession } from '@libs/hooks/useSessionAuth';

export const editUser = async (updatedData) => {
    try {
        const storedUser = JSON.parse(localStorage.getItem('user_studify'));
        const id = storedUser?._id;

        if (!id) throw new Error("No se encontró el ID del usuario en localStorage");

        const res = await axiosInstance.put(`/users/${id}`, updatedData);
        const { usuario } = res.data;

        const userToStore = {
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            foto_perfil: usuario.foto_perfil
        };

        localStorage.setItem('user_studify', JSON.stringify(userToStore));
        externalLoadSession(); 
        return res.data;
    } catch (err) {
        console.error("Error al editar usuario:", err);
        throw err;
    }
};

