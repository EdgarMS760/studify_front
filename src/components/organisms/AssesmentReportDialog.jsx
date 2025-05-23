import React, { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, CircularProgress, IconButton,
    Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete } from "@mui/material";
import { PictureAsPdf, Download, Close } from "@mui/icons-material";
import { useSnackbar } from "@libs/store/SnackbarContext";
import { getGroups } from '@services/groupService';
import { getGroupStudents } from "@services/studentService";
import dayjs from "dayjs";
import AssesmentReportStudentView from "@components/molecules/AssesmentReportStudentView";
import AssesmentReportGroupView from "@components/molecules/AssesmentReportGroupView";
import { assessmentReport } from "@services/reportService";

const AssesmentReportDialog = ({ open, onClose }) => {
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
    const [isAlumnoDetalle, setIsAlumnoDetalle] = useState(false);
    const [reportRequested, setReportRequested] = useState(false);
    const [studentName, setStudentName] = useState("");
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

    // const handleGenerate = async () => {
    //     if (!validate()) return;
    //     setLoading(true);
    //     setReportRequested(true);
    //     // Simular petición según si es por grupo o por alumno
    //     if (student) {
    //         setIsAlumnoDetalle(true);
    //         setReportData({
    //             nombre_alumno: student.nombre,
    //             tareas: [
    //                 {
    //                     fecha_entrega: "2025-05-31",
    //                     nombre_tarea: "nueva",
    //                     estado: "Entregado",
    //                     entregada_a_tiempo: true,
    //                     calificacion: 15
    //                 },
    //                 {
    //                     fecha_entrega: "2025-06-01",
    //                     nombre_tarea: "nueva 2",
    //                     estado: "Entregado",
    //                     entregada_a_tiempo: true,
    //                     calificacion: 15
    //                 },
    //                 {
    //                     fecha_entrega: "2025-06-02",
    //                     nombre_tarea: "nueva 3",
    //                     estado: "Entregado",
    //                     entregada_a_tiempo: true,
    //                     calificacion: 15
    //                 },
    //                 {
    //                     fecha_entrega: "2025-06-03",
    //                     nombre_tarea: "nueva 4",
    //                     estado: "Entregado",
    //                     entregada_a_tiempo: true,
    //                     calificacion: 15
    //                 },
    //             ]
    //         });
    //     } else {
    //         setIsAlumnoDetalle(false);
    //         setReportData([
    //             {
    //                 nombre_alumno: "alumnillo",
    //                 porcentaje_entregadas_a_tiempo: "80.00%",
    //                 promedio_calificacion: "49.00"
    //             },
    //             {
    //                 nombre_alumno: "estudiante 1",
    //                 porcentaje_entregadas_a_tiempo: "0.00%",
    //                 promedio_calificacion: "N/A"
    //             }
    //         ]);
    //     }
    //     setLoading(false);
    // };

    const handleGenerate = async () => {
        if (!validate()) return;

        setLoading(true);
        setReportData([]);
        setReportRequested(true);
        if (student) {
            setIsAlumnoDetalle(true);
            const alumno = students.find(a => a._id === student);
            const nombre = alumno?.nombre || "Alumnooo";
            setStudentName(nombre);
        } else {
            setIsAlumnoDetalle(false);
        }

        console.log("Student", student);

        try {
            const response = await assessmentReport(
                group,
                startDate && dayjs(startDate).format("YYYY-MM-DD"),
                endDate && dayjs(endDate).format("YYYY-MM-DD"),
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

        if (!onlyFilters) { setReportData([]); setReportRequested(false); }
    };

    const handleClose = () => {
        resetFields();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle className="flex justify-between items-center">
                Reporte de Tareas y Evaluaciones
                <IconButton onClick={handleClose}><Close /></IconButton>
            </DialogTitle>

            <DialogContent className="space-y-4">
                <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                ) : reportRequested ? (
                    reportData && reportData.length > 0 ? (
                        isAlumnoDetalle ? (
                            <AssesmentReportStudentView reportData={reportData} nameStudent={studentName} />
                        ) : (
                            <AssesmentReportGroupView reportData={reportData} />
                        )
                    ) : (
                        <div className="text-center text-gray-500 mt-6">
                            No se encontraron resultados para los filtros seleccionados.
                        </div>
                    )
                ) : null}

            </DialogContent>

            <DialogActions className="px-6 pb-4">
                {/* <ExportButtons
                    disabled={!reportData}
                    data={reportData}
                    filename={`reporte_evaluaciones_${isAlumnoDetalle ? "alumno" : "grupo"}`}
                    type={isAlumnoDetalle ? "detalle_alumno" : "grupo"}
                /> */}
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleGenerate}>Generar Reporte</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssesmentReportDialog;
