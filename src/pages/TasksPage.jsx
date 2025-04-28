import React, { useEffect } from 'react'
import TaskTabs from '@components/molecules/TaskTabs'
import CardTask from '@components/molecules/CardTask'
import { Box, CircularProgress, Pagination } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useAuth } from '@libs/store/AuthProvider';
import { getTasks } from '@services/taskService';

const TasksPage = () => {
  const { user } = useAuth();
  const isTeacher = user?.rol === "maestro";
  const [loading, setLoading] = React.useState(false);
  const expiredTrueArray = [
    { id: 1, date: "2025-04-05", name: "Tarea vencida 1", points: "10", time: "12:00", expired: true, groupName: "Grupo 1" },
    { id: 2, date: "2025-04-04", name: "Tarea vencida 2", points: "10", time: "13:00", expired: true, groupName: "Grupo 2" },
    { id: 3, date: "2025-04-03", name: "Tarea vencida 3", points: "10", time: "14:00", expired: true, groupName: "Grupo 3" },
    { id: 4, date: "2025-04-02", name: "Tarea vencida 4", points: "10", time: "15:00", expired: true, groupName: "Grupo 4" },
    { id: 5, date: "2025-04-01", name: "Tarea vencida 5", points: "10", time: "16:00", expired: true, groupName: "Grupo 5" },
    { id: 6, date: "2025-03-31", name: "Tarea vencida 6", points: "10", time: "17:00", expired: true, groupName: "Grupo 6" },
    { id: 7, date: "2025-03-30", name: "Tarea vencida 7", points: "10", time: "18:00", expired: true, groupName: "Grupo 7" },
    { id: 8, date: "2025-03-29", name: "Tarea vencida 8", points: "10", time: "19:00", expired: true, groupName: "Grupo 8" },
    { id: 9, date: "2025-03-28", name: "Tarea vencida 9", points: "10", time: "20:00", expired: true, groupName: "Grupo 9" },
    { id: 10, date: "2025-03-27", name: "Tarea vencida 10", points: "10", time: "21:00", expired: true, groupName: "Grupo 10" }
  ];

  const expiredFalseArray = [
    { id: 1, date: "2025-04-06", name: "Tarea activa 1", points: "10", time: "09:00", expired: false, groupName: "Grupo 1" },
    { id: 2, date: "2025-04-07", name: "Tarea activa 2", points: "10", time: "10:00", expired: false, groupName: "Grupo 2" },
    { id: 3, date: "2025-04-08", name: "Tarea activa 3", points: "10", time: "11:00", expired: false, groupName: "Grupo 3" },
    { id: 4, date: "2025-04-09", name: "Tarea activa 4", points: "10", time: "12:00", expired: false, groupName: "Grupo 4" },
    { id: 5, date: "2025-04-10", name: "Tarea activa 5", points: "10", time: "13:00", expired: false, groupName: "Grupo 5" },
    { id: 6, date: "2025-04-11", name: "Tarea activa 6", points: "10", time: "14:00", expired: false, groupName: "Grupo 6" },
    { id: 7, date: "2025-04-12", name: "Tarea activa 7", points: "10", time: "15:00", expired: false, groupName: "Grupo 7" },
    { id: 8, date: "2025-04-13", name: "Tarea activa 8", points: "10", time: "16:00", expired: false, groupName: "Grupo 8" },
    { id: 9, date: "2025-04-14", name: "Tarea activa 9", points: "10", time: "17:00", expired: false, groupName: "Grupo 9" },
    { id: 10, date: "2025-04-15", name: "Tarea activa 10", points: "10", time: "18:00", expired: false, groupName: "Grupo 10" }
  ];
  const [tasks, setTasks] = React.useState(expiredFalseArray);
  const handleStatusTask = (status) => {
    if (status === "cerrada") {
      //setTasks(expiredTrueArray);
    } else if (status === "abierta") {
      //setTasks(expiredFalseArray);
    } else {
      //setTasks([]);
    }
  }
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const location = useLocation();
  const handleCardClick = (taskId) => {
    navigate(`/group/${groupId}/tasks/${taskId}`);
  };
  const isGeneralPage = location.pathname === '/homework'

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { tasks, total, page } = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box>
      <TaskTabs onStatusChange={handleStatusTask} visibleCreateTask={isTeacher} isGeneralPage={isGeneralPage} />
      <Box className="p-5" sx={[
        (theme) => ({
          backgroundColor: "white",
          borderRadius: "10px",
          marginX: "10px",
        }),
        (theme) =>
          theme.applyStyles('dark', {
            backgroundColor: "black",
          }),
      ]}>
        {loading ? (<div className='flex justify-center items-center'> <CircularProgress /></div>) : (


          <>
            {tasks.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <h2 className="text-gray-500">No hay tareas disponibles</h2>
              </div>
            ) : (
              <>
                {tasks.map((task, index) => (
                  <div key={index} className="m-2">
                    <CardTask taskData={task} onClickCard={() => handleCardClick(task.id)} isGeneral={isGeneralPage} />
                  </div>
                ))}

              </>
            )}
          </>
        )}

      </Box> 
      <div className="flex justify-center m-4">
        <Pagination count={10} showFirstButton showLastButton color="primary" />
      </div>
    </Box>
  );
};

export default TasksPage;