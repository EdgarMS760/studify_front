import { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, IconButton, CircularProgress,
    Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Close } from "@mui/icons-material";
import { getGroups } from '@services/groupService';
import { getGroupStudents } from "@services/studentService";
import { useSnackbar } from "@libs/store/SnackbarContext";
import dayjs from "dayjs";
import { attendanceReport } from "@services/reportService";
import AttendanceReportTableGroup from "@components/molecules/AttendanceReportTableGroup";
import AttendanceReportStudent from "@components/molecules/AttendanceReportStudent";

export default function AttendanceReportDialog({ open, onClose }) {
    const { showSnackbar } = useSnackbar();
    const [group, setGroup] = useState("");
    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [loadingGroups, setLoadingGroups] = useState(false);
    const [pageGroup, setPageGroup] = useState(1);
    const [totalPagesGroup, setTotalPagesGroup] = useState(1);
    const [loadingStudents, setLoadingStudents] = useState(false);

    const fetchGroupStudents = async (id) => {
        setLoadingStudents(true);
        try {
            const { alumnos } = await getGroupStudents(id);
            const alumnosOrdenados = alumnos.sort((a, b) => a.numero_lista - b.numero_lista);

            setStudents(alumnosOrdenados);
        } catch (error) {
            console.error("Error fetching group students:", error);
        } finally {
            setLoadingStudents(false);
        }
    }

    const fetchGroups = async (pageToLoad = 1) => {
        setLoadingGroups(true);
        try {
            const { groups: newGroups, total, page: currentPage, limit } = await getGroups(pageToLoad, 50);
            setGroups(prev => pageToLoad === 1 ? newGroups : [...prev, ...newGroups]);
            setPageGroup(currentPage);
            setTotalPagesGroup(Math.ceil(total / limit));
        } catch (error) {
            console.error("Error al obtener grupos:", error);
        }
        setLoadingGroups(false);
    };
    useEffect(() => {
        if (open) {
            fetchGroups();
        }
    }, [open]);



    const validate = () => {
        const newErrors = {};

        if (!group) newErrors.group = "El grupo es obligatorio";


        if (startDate > endDate) {
            newErrors.startDate = "La fecha de inicio no puede ser mayor a la fecha de fin";
            newErrors.endDate = "La fecha de inicio no puede ser mayor a la fecha de fin";
            showSnackbar("La fecha de inicio no puede ser mayor a la fecha de fin", "error");
        }

        if (student) {
            if (!startDate) {
                newErrors.startDate = "La fecha de inicio es requerida para el reporte detallado por alumno";
                showSnackbar(newErrors.startDate, "error");
            }
            if (!endDate) {
                newErrors.endDate = "La fecha de fin es requerida para el reporte detallado por alumno";
                showSnackbar(newErrors.endDate, "error");
            }

            if (startDate && endDate && dayjs(startDate).isAfter(dayjs(endDate))) {
                newErrors.startDate = "La fecha de inicio no puede ser mayor que la fecha de fin";
                showSnackbar(newErrors.startDate, "error");
            }
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleGenerate = async () => {
        if (!validate()) return;

        setLoading(true);
        setReportData([]);

        try {
            const response = await attendanceReport(
                startDate && dayjs(startDate).format("YYYY-MM-DD"),
                endDate && dayjs(endDate).format("YYYY-MM-DD"),
                group,
                student
            );
            setReportData(response);
        } catch (error) {
            console.error("Error al generar el reporte:", error);
        } finally {
            setLoading(false);
        }
    };

    const resetFields = (onlyFilters) => {
        setGroup("");
        setStudent("");
        setStudents([]);
        setStartDate(null);
        setEndDate(null);
        setErrors({});
        if (!onlyFilters) { setReportData([]); }
    };

    const handleClose = () => {
        resetFields();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle className="flex justify-between items-center">
                Asistencia
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Autocomplete
                        fullWidth
                        options={groups}
                        getOptionLabel={(option) => option.nombre}
                        value={groups.find(g => g._id === group) || null}
                        onChange={(e, newValue) => {
                            const groupId = newValue?._id || "";
                            setGroup(groupId);
                            setStudent(""); // Limpia el alumno seleccionado si se cambia de grupo
                            if (groupId) {
                                fetchGroupStudents(groupId);
                            } else {
                                setStudents([]); // Limpiar lista si se borra selección
                            }
                        }}

                        loading={loadingGroups}
                        onOpen={() => {
                            if (groups.length === 0) fetchGroups(1);
                        }}
                        onInputChange={(e, value, reason) => {
                            // pa filtrar por nombre
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Grupo"
                                error={!!errors.group}
                                helperText={errors.group}
                                slotProps={
                                    input => ({
                                        ...input.InputProps,
                                        endAdornment: (
                                            <>
                                                {loadingGroups ? <CircularProgress size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    })
                                }

                            />
                        )}
                        slotProps={
                            listbox => ({
                                ...listbox.ListboxProps,
                                onScroll: (event) => {
                                    const listboxNode = event.currentTarget;
                                    const nearBottom = listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 20;
                                    if (nearBottom && !loadingGroups && pageGroup < totalPagesGroup) {
                                        fetchGroups(pageGroup + 1);
                                    }
                                },


                            })
                        }
                    />


                    <Autocomplete
                        fullWidth
                        options={students}
                        getOptionLabel={(option) => option.nombre || ""}
                        value={students.find((s) => s._id === student) || null}
                        onChange={(e, newValue) => setStudent(newValue?._id || "")}
                        disabled={!group || students.length === 0}
                        loading={loadingStudents}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Alumno"
                                error={!!errors.student}
                                helperText={errors.student}
                                slotProps={input => ({
                                    ...input.InputProps,
                                    endAdornment: (
                                        <>
                                            {loadingStudents ? <CircularProgress size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                })}
                            />
                        )}
                    />

                    <DatePicker
                        label="Fecha Inicio"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}

                    />

                    <DatePicker
                        label="Fecha Fin"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}

                    />
                </div>
                <div className="flex justify-center items-center mb-2">

                    <div className="flex gap-2 mb-2">
                        <Button variant="contained" onClick={() => resetFields(true)}>Borrar Filtros</Button>
                    </div>
                </div>
                {loading ? (
                    <div className="flex justify-center py-6">
                        <CircularProgress />
                    </div>
                ) : (
                    <>

                        {reportData && (Array.isArray(reportData) ? (
                            reportData.length > 0 && (
                                //vista general de asistencia por grupo
                                <AttendanceReportTableGroup
                                    reportData={reportData}
                                />
                            )
                        ) : (
                            //vista detallada de asistencia por alumno
                            <AttendanceReportStudent
                                reportData={reportData}
                            />
                        ))}

                    </>
                )}

            </DialogContent>

            <DialogActions className="px-6 pb-4">
                <Button onClick={handleClose} color="inherit">
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    onClick={handleGenerate}
                    disabled={loading}
                >
                    Generar Reporte
                </Button>
            </DialogActions>
        </Dialog>
    );
}
