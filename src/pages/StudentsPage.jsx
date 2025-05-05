import { useEffect, useMemo, useState } from "react";
import AttendanceList from "@components/molecules/AttendanceList";
import ButtonAtom from "@components/atoms/ButtonAtom";
import TextCardAtom from "@components/atoms/TextCardAtom";
import clsx from "clsx";
import { Box, IconButton, InputAdornment, useTheme } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import CardStudent from "@components/molecules/CardStudent";
import { getGroupStudents } from "@services/studentService";
import { useParams } from "react-router";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import RemoveStudentsGroupDialog from "@components/molecules/RemoveStudentsGroupDialog";
import AddStudentsGroupDialog from "@components/molecules/AddStudentsGroupDialog";

const StudentsPage = () => {
  const { id } = useParams();


  const [students, setStudents] = useState([
    { _id: 1, numero_lista: 1, nombre: "Juan Pérez" },
  ]);

  const [attendanceTaken, setAttendanceTaken] = useState(false);
  const [attendance, setAttendance] = useState(() =>
    Object.fromEntries(students.map((s) => [s.id, false]))
  );

  const [open, setOpen] = useState(false);

  const handleToggle = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleGenerateAttendance = () => {
    const confirmed = window.confirm("¿Estás seguro de generar la asistencia?");
    if (confirmed) {
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

  useEffect(() => {
    fetchGroupStudents();
  }, []);

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
          text="07/06/2025"
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
            <ButtonAtom onClick={handleGenerateAttendance}>
              Generar Asistencia
            </ButtonAtom>
          ) : (
            <span className="text-green-600 font-semibold text-sm">
              Asistencia ya tomada
            </span>
          )}
        </div>

        <AttendanceList
          students={students}
          attendance={attendance}
          onToggle={handleToggle}
          disabled={attendanceTaken}
        />
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
