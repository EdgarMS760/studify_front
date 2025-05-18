import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";

import ReportExporter from "@components/organisms/ReportExporter";
import CircularProgressWithLabel from "@components/atoms/CircularProgressWithLabel";

function AttendanceReportTableGroup({ reportData }) {
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
                        { label: "Total Asistencias", key: "total_asistencias" },
                        { label: "Total Faltas", key: "total_faltas" },
                        { label: "% Asistencia", key: "porcentaje_asistencia" },
                        { label: "% Faltas", key: "porcentaje_faltas" },
                    ]}
                    fileName="asistencia_grupo"
                />
            </div>
            <TableContainer component={Paper} elevation={3}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Alumno</TableCell>
                            <TableCell align="center">Asistencias</TableCell>
                            <TableCell align="center">Faltas</TableCell>
                            <TableCell align="center">Asistencia/Faltas (%)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.map((row, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{row.nombre_alumno}</TableCell>
                                <TableCell align="center">{row.total_asistencias}</TableCell>
                                <TableCell align="center">{row.total_faltas}</TableCell>
                                <TableCell align="center">
                                    <Box display="flex" justifyContent="center" gap={2}>
                                        <CircularProgressWithLabel
                                            value={parseFloat(row.porcentaje_asistencia)}
                                            color="success"
                                        />
                                        <CircularProgressWithLabel
                                            value={parseFloat(row.porcentaje_faltas)}
                                            color="error"
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default AttendanceReportTableGroup;
