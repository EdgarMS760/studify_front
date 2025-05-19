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
    CircularProgress,
    Box
} from "@mui/material";
import ReportExporter from "@components/organisms/ReportExporter";
import CircularProgressWithLabel from "@components/atoms/CircularProgressWithLabel";
export default function AssesmentReportGroupView({ reportData }) {
    return (
        <>
            <div className="flex justify-between items-center my-4">
                <Typography variant="h6" gutterBottom>
                    Reporte por grupo
                </Typography>
                <ReportExporter
                    data={reportData}
                    columns={[
                        { label: "Alumno", key: "nombre_alumno" },
                        { label: "Entregas (%)", key: "porcentaje_entregadas_a_tiempo" },
                        { label: "Promedio Calificación", key: "promedio_calificacion" }
                    ]}
                    fileName="asistencia_grupo"
                />
            </div>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Alumno</TableCell>
                            <TableCell align="center">Entregas (%)</TableCell>
                            <TableCell align="center">Promedio Calificación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.nombre_alumno}</TableCell>
                                <TableCell align="center">

                                    <Box display="flex" justifyContent="center" gap={2}>
                                        <CircularProgressWithLabel
                                            value={parseFloat(row.porcentaje_entregadas_a_tiempo)}
                                            color={parseFloat(row.porcentaje_entregadas_a_tiempo) < 70 ? "error" : "success"}
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{row.promedio_calificacion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}
