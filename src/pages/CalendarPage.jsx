import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { getTasksToCalendar } from "../services/taskService";

const CalendarPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [tasks, setTasks] = useState([]);
    const calendarRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const fetchTasks = async (month, year) => {
        console.log("Fetching tasks for month:", month, "year:", year);
        //setLoading(true);
        try {
            const response = await getTasksToCalendar(month, year);
            setTasks(response); // Asegúrate de que `response` tenga el formato correcto
        } catch (error) {
            console.error("Error al obtener tareas:", error);
        } finally {
            //setLoading(false);
        }
    };

    const handleDatesSet = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            const currentDate = calendarApi.getDate(); // Fecha central de la vista
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            console.log("Mes visible:", month, "Año:", year);
            fetchTasks(month, year);
        }
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            const calendarApi = calendarRef.current?.getApi();
            if (calendarApi) {
                const currentDate = calendarApi.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                fetchTasks(month, year);
            }
        }, 100); // pequeño retraso para asegurar que el calendario ya está montado

        return () => clearTimeout(timeout);
    }, []);

    const handleEventClick = (info) => {
        const { taskId } = info.event.extendedProps;
        const groupId = info.event.groupId;
        navigate(`/group/${groupId}/tasks/${taskId}`);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Calendario de Tareas</h2>

            <Box
                className="p-4 rounded-md shadow"
                sx={[
                    (theme) => ({ backgroundColor: "white" }),
                    (theme) =>
                        theme.applyStyles("dark", {
                            backgroundColor: theme.vars.palette.secondary.main,
                        }),
                ]}
            >
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={tasks}
                    eventClick={handleEventClick}
                    locale="es"
                    eventColor="#FD841F"
                    height="auto"
                    datesSet={handleDatesSet}
                    eventClassNames={() => 'cursor-pointer hover:bg-primaryHover transition-colors duration-200'}
                />


            </Box>
        </div>
    );
};

export default CalendarPage;
