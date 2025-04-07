import { useMemo, useState } from "react";
import AttendanceList from "@components/molecules/AttendanceList";
import ButtonAtom from "@components/atoms/ButtonAtom";
import TextCardAtom from "@components/atoms/TextCardAtom";
import clsx from "clsx";
import { IconButton, InputAdornment, useTheme } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import CardStudent from "../components/molecules/CardStudent";

const StudentsPage = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");

  const existingStudents = [
    { id: 101, fullName: "Luis García", email: "luis@example.com" },
    { id: 102, fullName: "María Torres", email: "maria@example.com" },
    { id: 103, fullName: "Pedro Sánchez lopez lopez", email: "pedro@example.com" },

  ];

  // busqueda
  const filteredStudents = useMemo(() => {
    const term = search.toLowerCase();
    return existingStudents.filter(
      (s) =>
        s.fullName.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term)
    );
  }, [search]);

  const [students, setStudents] = useState([
    { id: 1, listNumber: 1, fullName: "Juan Pérez" },
    { id: 2, listNumber: 2, fullName: "Ana López" },
    { id: 3, listNumber: 3, fullName: "Carlos Ruiz" },
    { id: 4, listNumber: 4, fullName: "María García" },
    { id: 5, listNumber: 5, fullName: "Luis Fernández" },
    { id: 6, listNumber: 6, fullName: "Laura Martínez" },
    { id: 7, listNumber: 7, fullName: "Pedro Sánchez" },
    { id: 8, listNumber: 8, fullName: "Sofía Gómez" },
    { id: 9, listNumber: 9, fullName: "Javier Torres" },
    { id: 10, listNumber: 10, fullName: "Lucía Morales" },
  ]);

  const [attendanceTaken, setAttendanceTaken] = useState(false);
  const [attendance, setAttendance] = useState(() =>
    Object.fromEntries(students.map((s) => [s.id, false]))
  );

  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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



  return (
    <div
      className={clsx(
        "m-3 p-4 space-y-4",
        theme.palette.mode === "dark" ? "bg-neutral-800" : "bg-white"
      )}
    >

      <div className="flex flex-wrap justify-between items-center gap-4">
        <IconButton onClick={() => setOpen(true)} aria-label="addStudent" color="primary" size="large">
          <PersonAddIcon fontSize="inherit" />
        </IconButton>

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

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Agregar Alumno</DialogTitle>
        <DialogContent className="space-y-4">
          <div className="mt-2">

            <TextField
              label="Buscar por nombre o email"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {search.trim() !== "" && (
            <div className="space-y-2 mt-4">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <CardStudent key={student.id} student={student} />
                ))
              ) : (
                <span className="text-sm text-gray-500">No se encontraron resultados</span>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <ButtonAtom onClick={() => setOpen(false)}>Cerrar</ButtonAtom>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default StudentsPage;
