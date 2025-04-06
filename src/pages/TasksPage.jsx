import React from 'react'
import TaskTabs from '@components/molecules/TaskTabs'
import CardTask from '@components/molecules/CardTask'
import { Pagination } from '@mui/material';

const TasksPage = () => {
  // const tasks = [
  //   { date: "2025-04-06", name: "Tarea 1", points: "10", time: "12:00", expired: false },
  //   { date: "2025-04-07", name: "Tarea 2", points: "15", time: "14:30", expired: false },
  //   { date: "2025-04-08", name: "Tarea 3", points: "20", time: "16:45", expired: true },
  //   { date: "2025-04-09", name: "Tarea 4", points: "12", time: "18:00", expired: false },
  //   { date: "2025-04-10", name: "Tarea 5", points: "8", time: "10:15", expired: true },
  //   { date: "2025-04-11", name: "Tarea 6", points: "25", time: "21:00", expired: false },
  //   { date: "2025-04-12", name: "Tarea 7", points: "18", time: "08:45", expired: true },
  //   { date: "2025-04-13", name: "Tarea 8", points: "30", time: "22:30", expired: false },
  //   { date: "2025-04-14", name: "Tarea 9", points: "16", time: "07:15", expired: false },
  //   { date: "2025-04-15", name: "Tarea 10", points: "14", time: "13:30", expired: true },
  //   // { date: "2025-04-16", name: "Tarea 11", points: "22", time: "11:45", expired: false },
  //   // { date: "2025-04-17", name: "Tarea 12", points: "9", time: "17:00", expired: true },
  //   // { date: "2025-04-18", name: "Tarea 13", points: "26", time: "20:15", expired: false },
  //   // { date: "2025-04-19", name: "Tarea 14", points: "11", time: "15:30", expired: true },
  //   // { date: "2025-04-20", name: "Tarea 15", points: "19", time: "23:59", expired: false }
  // ];
  const expiredTrueArray = [
    { date: "2025-04-05", name: "Tarea vencida 1", points: "10", time: "12:00", expired: true },
    { date: "2025-04-04", name: "Tarea vencida 2", points: "10", time: "13:00", expired: true },
    { date: "2025-04-03", name: "Tarea vencida 3", points: "10", time: "14:00", expired: true },
    { date: "2025-04-02", name: "Tarea vencida 4", points: "10", time: "15:00", expired: true },
    { date: "2025-04-01", name: "Tarea vencida 5", points: "10", time: "16:00", expired: true },
    { date: "2025-03-31", name: "Tarea vencida 6", points: "10", time: "17:00", expired: true },
    { date: "2025-03-30", name: "Tarea vencida 7", points: "10", time: "18:00", expired: true },
    { date: "2025-03-29", name: "Tarea vencida 8", points: "10", time: "19:00", expired: true },
    { date: "2025-03-28", name: "Tarea vencida 9", points: "10", time: "20:00", expired: true },
    { date: "2025-03-27", name: "Tarea vencida 10", points: "10", time: "21:00", expired: true }
  ];
  
  const expiredFalseArray = [
    { date: "2025-04-06", name: "Tarea activa 1", points: "10", time: "09:00", expired: false },
    { date: "2025-04-07", name: "Tarea activa 2", points: "10", time: "10:00", expired: false },
    { date: "2025-04-08", name: "Tarea activa 3", points: "10", time: "11:00", expired: false },
    { date: "2025-04-09", name: "Tarea activa 4", points: "10", time: "12:00", expired: false },
    { date: "2025-04-10", name: "Tarea activa 5", points: "10", time: "13:00", expired: false },
    { date: "2025-04-11", name: "Tarea activa 6", points: "10", time: "14:00", expired: false },
    { date: "2025-04-12", name: "Tarea activa 7", points: "10", time: "15:00", expired: false },
    { date: "2025-04-13", name: "Tarea activa 8", points: "10", time: "16:00", expired: false },
    { date: "2025-04-14", name: "Tarea activa 9", points: "10", time: "17:00", expired: false },
    { date: "2025-04-15", name: "Tarea activa 10", points: "10", time: "18:00", expired: false }
  ];
  const [tasks, setTasks] = React.useState(expiredTrueArray); 
  const handleStatusTask = (status) => {
    if (status === "cerrada") {
      setTasks(expiredTrueArray);
    } else if (status === "abierta") {
      setTasks(expiredFalseArray);
    } else {
      setTasks([]); // Reset tasks if no status is selected
    }
  }
  return (
    <div>
      <TaskTabs onStatusChange ={handleStatusTask} />

      {tasks.map((task, index) => (
        <div key={index} className='m-2'>

          <CardTask taskData={task} />
        </div>
      ))}
      <div className='flex justify-center m-4'>

        <Pagination count={10} showFirstButton showLastButton />
      </div>
    </div>
  )
}

export default TasksPage