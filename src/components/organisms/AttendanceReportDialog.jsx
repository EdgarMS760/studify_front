import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, IconButton
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Download, PictureAsPdf, Close } from "@mui/icons-material";

const mockGroups = ["Grupo A", "Grupo B"];
const mockStudents = ["Juan Pérez", "Ana Gómez"];

export default function AttendanceReportDialog({ open, onClose }) {
    const [group, setGroup] = useState("");
    const [student, setStudent] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [reportData, setReportData] = useState([]);

    const handleGenerate = () => {
        // Aquí puedes hacer la petición al backend con los filtros
        setReportData([
            {
                fecha: "2025-05-01",
                nombre: "Juan Pérez",
                asistencias: 18,
                porcentaje: "90%",
                faltas: 2
            },
        ]);
    };

    const handleExportPDF = () => {
        // Lógica para exportar como PDF
        console.log("Exportar PDF");
    };

    const handleExportExcel = () => {
        // Lógica para exportar como Excel
        console.log("Exportar Excel");
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle className="flex justify-between items-center">
                Asistencia
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <TextField
                        label="Grupo"
                        select
                        fullWidth
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                    >
                        {mockGroups.map((g) => (
                            <MenuItem key={g} value={g}>
                                {g}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Alumno"
                        select
                        fullWidth
                        value={student}
                        onChange={(e) => setStudent(e.target.value)}
                    >
                        {mockStudents.map((s) => (
                            <MenuItem key={s} value={s}>
                                {s}
                            </MenuItem>
                        ))}
                    </TextField>

                    <DatePicker
                        label="Fecha Inicio"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />

                    <DatePicker
                        label="Fecha Fin"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </div>

                {reportData.length > 0 && (
                    <div className="mt-6">
                        <div className="flex justify-end gap-2 mb-2">
                            <Button
                                variant="outlined"
                                startIcon={<PictureAsPdf />}
                                onClick={handleExportPDF}
                            >
                                PDF
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<Download />}
                                onClick={handleExportExcel}
                            >
                                Excel
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 text-sm">
                                <thead className="bg-gray-100 text-left">
                                    <tr>
                                        <th className="p-2 border">Fecha</th>
                                        <th className="p-2 border">Nombre del Alumno</th>
                                        <th className="p-2 border">Total Asistencias</th>
                                        <th className="p-2 border">Porcentaje Asistencia</th>
                                        <th className="p-2 border">Total de Faltas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="p-2 border">{row.fecha}</td>
                                            <td className="p-2 border">{row.nombre}</td>
                                            <td className="p-2 border">{row.asistencias}</td>
                                            <td className="p-2 border">{row.porcentaje}</td>
                                            <td className="p-2 border">{row.faltas}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </DialogContent>

            <DialogActions className="px-6 pb-4">
                <Button onClick={onClose} color="inherit">
                    Cancelar
                </Button>
                <Button variant="contained" onClick={handleGenerate}>
                    Generar Reporte
                </Button>
            </DialogActions>
        </Dialog>
    );
}
