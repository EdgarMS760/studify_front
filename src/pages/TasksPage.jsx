import React, { useEffect, useState } from 'react'
import TaskTabs from '@components/molecules/TaskTabs'
import CardTask from '@components/molecules/CardTask'
import { Box, CircularProgress, Pagination } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useAuth } from '@libs/store/AuthProvider';
import { getTasks } from '@services/taskService';
import { ROUTES } from '@libs/constants/routes';
import { useDebounce } from '@libs/hooks/Debounce';
const TasksPage = () => {
  const { user } = useAuth();
  const isTeacher = user?.rol === "maestro";
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const [taskStatus, setTaskStatus] = useState('Abierta');
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const [orden, setOrden] = useState('');
  const handlePageChange = (event, value) => {
    setPage(value);
    fetchTasks(taskStatus, orden, value);
  };

  const [tasks, setTasks] = useState([]);


  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const location = useLocation();
  const handleCardClick = (groupIdTask, taskId) => {
    navigate(ROUTES.TASK_DETAIL(groupIdTask, taskId));
  };
  const isGeneralPage = location.pathname === ROUTES.HOMEWORK;


  const fetchTasks = async (status = taskStatus, ordenValue = orden, pagina = 1,query='',) => {
    setLoading(true);
    try {
      const { tasks, totalPages, page } = await getTasks(groupId,query, status, ordenValue, pagina);
      setTasks(tasks);
      setTotalPages(totalPages || 1);
      setPage(page || 1);
      setTaskStatus(status);
      setOrden(ordenValue);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusTask = (newStatus) => {
    fetchTasks(newStatus, orden, 1); // Siempre pasar ambos valores
  };

  const handleOrderChange = (newOrder) => {
    fetchTasks(taskStatus, newOrder, 1);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

const handleSearchChange = (query) => {
  fetchTasks(taskStatus, orden, 1, query);
};


  return (
    <Box>
      <TaskTabs onStatusChange={handleStatusTask} visibleCreateTask={isTeacher} onCreateTask={() => fetchTasks()} onSearchChange={handleSearchChange} onOrderChange={handleOrderChange} isGeneralPage={isGeneralPage} />
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
                    <CardTask taskData={task} onClickCard={(groupId, taskId) => handleCardClick(groupId, taskId)} isGeneral={isGeneralPage} />
                  </div>
                ))}
              </>
            )}
          </>
        )}

      </Box>
      <div className="flex justify-center m-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          color="primary"
        />
      </div>
    </Box>
  );
};

export default TasksPage;