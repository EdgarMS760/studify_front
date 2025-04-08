import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

const CalendarPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    useEffect(() => {
        const header = document.querySelector(".fc-col-header");
        if (header) {
            header.style.backgroundColor =
                theme.palette.mode === "dark" ? "#1e1e1e" : "#FFF4E3";
        }
    }, [theme.palette.mode]);

    const tareas = [
        {
            id: "tarea-1", // ID interno del evento del calendario (no confundir con taskId)
            title: "Tarea 1",
            date: "2025-04-10",
            groupId: "1",
            taskId: "1",
        },
        {
            id: "tarea-2",
            title: "Tarea 2",
            date: "2025-04-12",
            groupId: "1",
            taskId: "2",
        },
        {
            id: "tarea-3",
            title: "Tarea 3",
            date: "2025-04-12",
            groupId: "1",
            taskId: "3",
        },
    ];

    const handleEventClick = (info) => {
        const { taskId } = info.event.extendedProps;
        const groupId = info.event.groupId;
        navigate(`/group/${groupId}/tasks/${taskId}`);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Calendario de Tareas</h2>

            <div
                className={theme.palette.mode === "dark" ? "bg-neutral-800 p-4 rounded-md" : "bg-white p-4 rounded-md shadow"}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={tareas}
                    eventClick={handleEventClick}
                    locale="es"
                    eventColor="#FD841F"
                    height="auto"
                    eventClassNames={() => 'cursor-pointer hover:bg-primaryHover transition-colors duration-200'}
                />
            </div>
        </div>
    );
};

export default CalendarPage;