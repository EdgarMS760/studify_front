import { useEffect, useState } from "react";
import AttendanceList from "@components/molecules/AttendanceList";
import ButtonAtom from "@components/atoms/ButtonAtom";
import TextCardAtom from "@components/atoms/TextCardAtom";
import clsx from "clsx";
import { Box, IconButton, InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { getGroupStudents } from "@services/studentService";
import { useParams } from "react-router";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import RemoveStudentsGroupDialog from "@components/molecules/RemoveStudentsGroupDialog";
import AddStudentsGroupDialog from "@components/molecules/AddStudentsGroupDialog";
import { getAttendance } from "@services/attendanceService";
import { postAttendance } from "../services/attendanceService";
import dayjs from "dayjs";

const StudentsPage = () => {
  const { id } = useParams();


  const [students, setStudents] = useState([
  ]);

  const [attendanceTaken, setAttendanceTaken] = useState(false);
  const [attendance, setAttendance] = useState([]);

  const [open, setOpen] = useState(false);

  const handleToggle = (id) => {
    setAttendance((prev) =>
      prev.map((item) =>
        item.alumno_id === id
          ? { ...item, presente: !item.presente }
          : item
      )
    );
  };

  const handleGenerateAttendance = async () => {
    const confirmed = window.confirm("¿Estás seguro de generar la asistencia?");
    if (confirmed) {
      const attendanceData = {
        grupo_id: id,
        fecha: new Date().toISOString(),
        asistencias: attendance,
      };
      await postAttendance(attendanceData);
      setAttendanceTaken(true);
      console.log("Asistencia generada:", attendance);
    }
  };

  const fetchGroupStudents = async () => {

    try {
      const { alumnos } = await getGroupStudents(id);
      const alumnosOrdenados = alumnos.sort((a, b) => a.numero_lista - b.numero_lista);

      setStudents(alumnosOrdenados);
    } catch (error) {
      console.error("Error fetching group students:", error);
    }
  }

const fetchAttendance = async () => {
  try {
    const response = await getAttendance(id, new Date().toISOString());

    if (response.notFound) {
      console.log("No hay asistencia registrada aún:", response.message);
      setAttendance({}); 
      setAttendanceTaken(false);
      return;
    }

    const asistencia = response.attendance.asistencias;

    const mappedAttendance = {};
    asistencia.forEach(({ alumno_id, presente }) => {
      mappedAttendance[alumno_id] = presente;
    });

    console.log("Asistencia:", mappedAttendance);
    setAttendance(mappedAttendance);
    setAttendanceTaken(true);
  } catch (error) {
    console.error("Error crítico al obtener la asistencia:", error);

  }
};


  useEffect(() => {
    fetchGroupStudents();
    fetchAttendance();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      const initialAttendance = students.map((student) => ({
        alumno_id: student._id,
        presente: false,
      }));
      setAttendance(initialAttendance);
    }
  }, [students]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRemoveStudent = (id) => {
    fetchGroupStudents();
  };

  const handleAddStudent = (student) => {
    fetchGroupStudents();
  }
  return (
    <Box
      className={clsx(
        "m-3 p-4 space-y-4"
      )}
      sx={[
        (theme) => ({
          backgroundColor: "white",
        }),
        (theme) =>
          theme.applyStyles('dark', {
            backgroundColor: theme.vars.palette.secondary.main,
          }),
      ]}
    >

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <IconButton onClick={() => setOpen(true)} aria-label="addStudent" color="primary" size="large">
            <PersonAddIcon fontSize="inherit" />
          </IconButton>
          <IconButton onClick={() => setDialogOpen(true)} aria-label="removeStudent" color="primary" size="large">
            <PersonRemoveIcon fontSize="inherit" />
          </IconButton>
        </div>

        <TextCardAtom
          text={dayjs().format("DD/MM/YYYY")}
          className="text-2xl"
          isHighlighted={true}
        />

        <TextField
          id="search-task"
          variant="standard"
          placeholder="Buscar..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon className="text-gray-400" />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 180 }}
        />

      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <TextCardAtom
            text="Lista de Asistencia"
            className="text-2xl"
            isHighlighted={true}
          />
          {!attendanceTaken ? (
            <ButtonAtom disabled={students.length === 0} onClick={handleGenerateAttendance}>
              Generar Asistencia
            </ButtonAtom>
          ) : (
            <span className="text-green-600 font-semibold text-sm">
              Asistencia ya tomada
            </span>
          )}
        </div>
        {students.length === 0 ? (
          <div className="flex justify-center items-center h-32">

            No hay alumnos en este grupo.
          </div>
        ) : (
          <AttendanceList
            students={students}
            attendance={attendance}
            onToggle={handleToggle}
            disabled={attendanceTaken}
          />)}
      </div>

      <AddStudentsGroupDialog
        onSelect={handleAddStudent}
        open={open}
        onClose={() => setOpen(false)}
      />

      <RemoveStudentsGroupDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        students={students}
        onRemove={handleRemoveStudent}
      />
    </Box>
  );
};

export default StudentsPage;
