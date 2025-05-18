import { useEffect, useState } from "react";
import AttendanceList from "@components/molecules/AttendanceList";
import ButtonAtom from "@components/atoms/ButtonAtom";
import TextCardAtom from "@components/atoms/TextCardAtom";
import clsx from "clsx";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { getGroupStudents } from "@services/studentService";
import { useParams } from "react-router";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import RemoveStudentsGroupDialog from "@components/molecules/RemoveStudentsGroupDialog";
import AddStudentsGroupDialog from "@components/molecules/AddStudentsGroupDialog";
import { getAttendance } from "@services/attendanceService";
import { postAttendance } from "@services/attendanceService";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useSnackbar } from "@libs/store/SnackbarContext";
dayjs.extend(utc);
dayjs.extend(timezone);

const StudentsPage = () => {
  const { showSnackbar } = useSnackbar();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([
  ]);

  const [attendanceTaken, setAttendanceTaken] = useState(false);
  const [attendance, setAttendance] = useState({});

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
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

    const attendanceData = {
      grupo_id: id,
      fecha: new Date().toISOString(),
      asistencias: attendance,
    };

    try {
      await postAttendance(attendanceData);
      setAttendanceTaken(true);
      showSnackbar("Asistencia registrada correctamente.", "success");
      setConfirmOpen(false);
    } catch (error) {
      const tipo = error.critical ? "error" : "warning";
      showSnackbar(error.message, tipo);
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
      const userTimezone = dayjs.tz.guess();
      const now = dayjs().tz(userTimezone);

      const fechaLocal = now.format('YYYY-MM-DD');
      setLoading(true);
      const response = await getAttendance(id, fechaLocal);

      if (response.notFound) {
        setAttendance({});
        setAttendanceTaken(false);
        return;
      }

      const asistencia = response.attendance.asistencias;

      const mappedAttendance = {};
      asistencia.forEach(({ alumno_id, presente }) => {
        mappedAttendance[alumno_id] = presente;
      });

      setAttendance(mappedAttendance);
      setAttendanceTaken(true);
    } catch (error) {
      console.error("Error crítico al obtener la asistencia:", error);

    } finally {
      setLoading(false);
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
    <>

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
        {loading ? <div className="flex justify-center items-center h-32"><CircularProgress /></div> : (



          <div>
            <div className="flex justify-between items-center mb-2">
              <TextCardAtom
                text="Lista de Asistencia"
                className="text-2xl"
                isHighlighted={true}
              />
              {!attendanceTaken ? (
                <ButtonAtom disabled={students.length === 0} onClick={() => setConfirmOpen(true)} variant="contained" color="primary">
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
        )}

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
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirmar generación de asistencia</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas generar la asistencia de hoy para el grupo? no se podrá revertir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleGenerateAttendance} color="primary" variant="contained">
            Generar
          </Button>
        </DialogActions>
      </Dialog>
    </>);
};

export default StudentsPage;
