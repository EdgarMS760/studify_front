import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Chip
} from "@mui/material";
import ReportExporter from "@components/organisms/ReportExporter";

export default function AssesmentReportStudentView({ reportData }) {
    return (
        <div>

            <div className="flex justify-between items-center my-4">
                <Typography variant="h6" gutterBottom>
                    Detalle de tareas - {reportData[0]?.nombre_alumno || "Alumno"}
                </Typography>
                <ReportExporter
                    data={reportData}
                    columns={[
                        { label: "Fecha de Entrega", key: "fecha_entrega" },
                        { label: "Nombre de Tarea", key: "nombre_tarea" },
                        { label: "Estado", key: "estado" },
                        { label: "Entregada a Tiempo", key: "entregada_a_tiempo" },
                        { label: "Calificación", key: "calificacion" },
                    ]}
                    fileName="detalle_tareas_alumno"
                />
            </div>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha de Entrega</TableCell>
                            <TableCell>Nombre de Tarea</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Entregada a Tiempo</TableCell>
                            <TableCell>Calificación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{row.fecha_entrega}</TableCell>
                                <TableCell>{row.nombre_tarea}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.estado}
                                        color={row.estado === "Entregado" ? "success" : "error"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{row.entregada_a_tiempo ? "Sí" : "No"}</TableCell>
                                <TableCell>{row.calificacion ?? "N/A"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}