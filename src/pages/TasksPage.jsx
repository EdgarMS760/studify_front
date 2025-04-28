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

  const [tasks, setTasks] = React.useState([]);
  const handleStatusTask = (status) => {
    if (status === "cerrada") {
      //setTasks(expiredTrueArray);
    } else if (status === "Abierta") {
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
      const { tasks, total, page } = await getTasks(groupId);
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