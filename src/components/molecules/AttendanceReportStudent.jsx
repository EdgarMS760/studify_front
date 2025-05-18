import {
    Box,
    Grid2,
    Paper,
    Typography,
    useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ReportExporter from "@components/organisms/ReportExporter";

function AttendanceReportStudent({ reportData }) {
    const theme = useTheme();

    return (
        <Box mt={4}>
            <div className="flex justify-between items-center my-4">
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Detalle de asistencia - {reportData.nombre_alumno}
                </Typography>
                <ReportExporter
                    data={reportData}
                    isDetail
                    fileName={`detalle_asistencia_${reportData.nombre_alumno}`}
                />
            </div>


            <Grid2 container spacing={2}>
                {reportData.detalle_asistencia.map((item, i) => {
                    const estado = item.estado.toLowerCase();
                    const isAsistio = estado === "asistió";

                    return (
                        <Grid2 item xs={12} sm={6} md={4} key={i}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    borderLeft: `6px solid ${isAsistio ? theme.palette.success.main : theme.palette.error.main}`,
                                    backgroundColor: isAsistio
                                        ? theme.palette.mode === "dark"
                                            ? "rgba(76, 175, 80, 0.1)"
                                            : "rgba(76, 175, 80, 0.05)"
                                        : theme.palette.mode === "dark"
                                            ? "rgba(244, 67, 54, 0.1)"
                                            : "rgba(244, 67, 54, 0.05)",
                                    transition: "all 0.3s ease-in-out",
                                }}
                            >
                                <Box display="flex" alignItems="center" gap={2}>
                                    {isAsistio ? (
                                        <CheckCircleIcon color="success" fontSize="large" />
                                    ) : (
                                        <CancelIcon color="error" fontSize="large" />
                                    )}
                                    <Box>
                                        <Typography fontWeight="medium">{item.fecha}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.estado}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid2>
                    );
                })}
            </Grid2>
        </Box>
    );
}

export default AttendanceReportStudent;
