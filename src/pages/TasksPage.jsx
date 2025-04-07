import React from 'react'
import TaskTabs from '@components/molecules/TaskTabs'
import CardTask from '@components/molecules/CardTask'
import { Pagination } from '@mui/material';
import { useNavigate, useParams } from 'react-router';

const TasksPage = () => {

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
    { id: 1, date: "2025-04-06", name: "Tarea activa 1", points: "10", time: "09:00", expired: false,groupName: "Grupo 1" },
    { id: 2, date: "2025-04-07", name: "Tarea activa 2", points: "10", time: "10:00", expired: false,groupName: "Grupo 2" },
    { id: 3, date: "2025-04-08", name: "Tarea activa 3", points: "10", time: "11:00", expired: false,groupName: "Grupo 3" },
    { id: 4, date: "2025-04-09", name: "Tarea activa 4", points: "10", time: "12:00", expired: false,groupName: "Grupo 4" },
    { id: 5, date: "2025-04-10", name: "Tarea activa 5", points: "10", time: "13:00", expired: false,groupName: "Grupo 5" },
    { id: 6, date: "2025-04-11", name: "Tarea activa 6", points: "10", time: "14:00", expired: false,groupName: "Grupo 6" },
    { id: 7, date: "2025-04-12", name: "Tarea activa 7", points: "10", time: "15:00", expired: false,groupName: "Grupo 7" },
    { id: 8, date: "2025-04-13", name: "Tarea activa 8", points: "10", time: "16:00", expired: false,groupName: "Grupo 8" },
    { id: 9, date: "2025-04-14", name: "Tarea activa 9", points: "10", time: "17:00", expired: false,groupName: "Grupo 9" },
    { id: 10, date: "2025-04-15", name: "Tarea activa 10", points: "10", time: "18:00", expired: false,groupName: "Grupo 10" }
  ];
  const [tasks, setTasks] = React.useState(expiredFalseArray);
  const handleStatusTask = (status) => {
    if (status === "cerrada") {
      setTasks(expiredTrueArray);
    } else if (status === "abierta") {
      setTasks(expiredFalseArray);
    } else {
      setTasks([]);
    }
  }
  const navigate = useNavigate();
  const { id: groupId } = useParams();

  const handleCardClick = (taskId) => {
    navigate(`/group/${groupId}/tasks/${taskId}`);
  };

  return (
    <div>
      <TaskTabs onStatusChange={handleStatusTask} />

      {tasks.map((task, index) => (
        <div key={index} className="m-2">
          <CardTask taskData={task} onClickCard={() => handleCardClick(task.id)} />
        </div>
      ))}

      <div className="flex justify-center m-4">
        <Pagination count={10} showFirstButton showLastButton color="primary" />
      </div>
    </div>
  );
};

export default TasksPage;