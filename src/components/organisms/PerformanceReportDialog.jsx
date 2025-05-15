import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, IconButton
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Download, PictureAsPdf, Close } from "@mui/icons-material";

const mockGroups = ["Grupo A", "Grupo B", "Grupo C"];

export default function PerformanceReportDialog({ open, onClose }) {
    const [group, setGroup] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportData, setReportData] = useState(null);

    const handleGenerate = () => {
        if (group) {
            // Si se filtra por un grupo
            setReportData({
                tipo: "individual",
                data: {
                    desviacionEstandar: 1.24,
                    promedioGrupo: 8.6,
                    promedioAsistencias: "92%",
                },
            });
        } else {
            // Si no se filtra grupo → vista comparativa
            setReportData({
                tipo: "comparativo",
                data: [
                    {
                        grupo: "Grupo A",
                        promedioGrupo: 8.2,
                        promedioAsistencias: "90%",
                        desviacionEstandar: 1.1,
                    },
                    {
                        grupo: "Grupo B",
                        promedioGrupo: 8.8,
                        promedioAsistencias: "94%",
                        desviacionEstandar: 0.9,
                    },
                ],
            });
        }
    };

    const handleExportPDF = () => {
        console.log("Exportar PDF desempeño");
    };

    const handleExportExcel = () => {
        console.log("Exportar Excel desempeño");
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle className="flex justify-between items-center">
                Desempeño General
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <TextField
                        label="Grupo"
                        select
                        fullWidth
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                    >
                        <MenuItem value="">Todos los grupos</MenuItem>
                        {mockGroups.map((g) => (
                            <MenuItem key={g} value={g}>
                                {g}
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

                {reportData && (
                    <div className="mt-6 space-y-4">
                        <div className="flex justify-end gap-2">
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

                        {reportData.tipo === "individual" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div className="p-4 rounded-xl bg-gray-50 border">
                                    <div className="font-semibold text-gray-600">
                                        Desviación Estándar (vs otros grupos)
                                    </div>
                                    <div className="text-xl font-bold text-gray-900">
                                        {reportData.data.desviacionEstandar}
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-gray-50 border">
                                    <div className="font-semibold text-gray-600">
                                        Promedio General del Grupo
                                    </div>
                                    <div className="text-xl font-bold text-gray-900">
                                        {reportData.data.promedioGrupo}
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-gray-50 border">
                                    <div className="font-semibold text-gray-600">
                                        Promedio en Asistencias
                                    </div>
                                    <div className="text-xl font-bold text-gray-900">
                                        {reportData.data.promedioAsistencias}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200 text-sm">
                                    <thead className="bg-gray-100 text-left">
                                        <tr>
                                            <th className="p-2 border">Grupo</th>
                                            <th className="p-2 border">Promedio General</th>
                                            <th className="p-2 border">Promedio Asistencias</th>
                                            <th className="p-2 border">Desviación Estándar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.data.map((row, i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="p-2 border">{row.grupo}</td>
                                                <td className="p-2 border">{row.promedioGrupo}</td>
                                                <td className="p-2 border">{row.promedioAsistencias}</td>
                                                <td className="p-2 border">{row.desviacionEstandar}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
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
