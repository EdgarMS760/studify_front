import {
    Grid2,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import DeviationChartView from "@components/molecules/DeviationChartView";
import { useEffect } from "react";
import CircularProgressWithLabel from "@components/atoms/CircularProgressWithLabel";

import ReportExporter from "@components/organisms/ReportExporter";
export default function PerformanceReportGeneralView({ reportData }) {

    return (
        <>
            <div className="flex justify-between items-center my-4">
                
                <Typography variant="h6" className="px-4 pt-4 pb-2">
                    Rendimiento General de todos los grupos
                </Typography>
                <ReportExporter
                    data={reportData.grupos}
                    columns={[
                        { label: "Grupo", key: "grupo" },
                        { label: "Prom. General", key: "promedio_general" },
                        { label: "Prom. Asistencias", key: "promedio_asistencia" },
                        { label: "Prom. Tareas", key: "promedio_tareas" },
                        { label: "Evaluaciones", key: "evaluaciones_realizadas" },
                    ]}
                    fileName="desempeno_grupo"
                />
            </div>
            <Grid2 item xs={12}>
                <DeviationChartView data={reportData.desviacion_estandar_promedio} />
            </Grid2 >
            <TableContainer component={Paper} elevation={3}>
                
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Grupo</TableCell>
                            <TableCell align="center">Prom. General</TableCell>
                            <TableCell align="center">Prom. Asistencia</TableCell>
                            <TableCell align="center">Prom. Tareas</TableCell>
                            <TableCell align="center">Evaluaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.grupos.map((grupo, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{grupo.grupo}</TableCell>
                                <TableCell align="center">
                                    <CircularProgressWithLabel value={grupo.promedio_general} />
                                </TableCell>
                                <TableCell align="center">
                                    <CircularProgressWithLabel value={grupo.promedio_asistencia} />
                                </TableCell>
                                <TableCell align="center">
                                    <CircularProgressWithLabel value={grupo.promedio_tareas} />
                                </TableCell>
                                <TableCell align="center">{grupo.evaluaciones_realizadas}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> </>
    );
}
