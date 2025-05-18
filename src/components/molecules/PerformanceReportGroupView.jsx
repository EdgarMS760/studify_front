import {
    Card,
    CardContent,
    Typography,
    Grid2,
    Divider,
    Box,
    LinearProgress,
} from "@mui/material";

import ReportExporter from "@components/organisms/ReportExporter";
export default function PerformanceReportGroupView({ reportData }) {
    if (!reportData || reportData.length === 0) return null;


    return (
        <Box>
            <div className="flex justify-between items-center my-4">

                <Typography variant="h6" className="px-4 pt-4 pb-2">
                    Rendimiento General por Grupo
                </Typography>
                <ReportExporter
                    data={reportData}
                    columns={[
                        { label: "Grupo", key: "grupo" },
                        { label: "Prom. General", key: "promedio_general" },
                        { label: "Prom. Asistencias", key: "promedio_asistencia" },
                        { label: "Prom. Tareas", key: "promedio_tareas" },
                        { label: "Evaluaciones", key: "evaluaciones_realizadas" },
                    ]}
                    fileName={`desempeno_grupo_${reportData[0]?.grupo?.replace(/ /g, "_") || ""}`}
                />
            </div>
            {reportData.map((grupo, index) => {
                const asistencia = parseFloat(grupo.promedio_asistencia) || 0;
                const tareas = parseFloat(grupo.promedio_tareas) || 0;
                const general = parseFloat(grupo.promedio_general) || 0;

                return (
                    <Grid2 item xs={12} key={index}>

                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {grupo.grupo}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Periodo: {grupo.fecha_inicio} a {grupo.fecha_fin}
                                </Typography>

                                <Divider className="my-3" />

                                <Box mb={2}>
                                    <Typography variant="subtitle2">
                                        Promedio General
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={general}
                                        color="primary"
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        {general}%
                                    </Typography>
                                </Box>

                                <Box mb={2}>
                                    <Typography variant="subtitle2">
                                        Promedio de Asistencia
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={asistencia}
                                        color="success"
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        {asistencia}%
                                    </Typography>
                                </Box>

                                <Box mb={2}>
                                    <Typography variant="subtitle2">
                                        Promedio de Tareas
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={tareas}
                                        color="info"
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        {tareas}%
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2">
                                        Evaluaciones Realizadas
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        {grupo.evaluaciones_realizadas}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid2>
                );
            })}
        </Box>
    );
}
