import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    useTheme,
} from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';

export default function DeviationChartView({ data }) {
    const theme = useTheme();

    if (!data || data.length === 0) return null;

    const xLabels = data.map(item => item.grupo);
    const yValues = data.map(item => parseFloat(item.desviacion_estandar) || 0);

    return (
        <Card className="" variant="outlined" sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Comparativa de Desviación Estándar entre Grupos (promedio general)
                </Typography>
                <Box sx={{ pr: 6 }}>
                    <LineChart
                        xAxis={[{
                            data: xLabels,
                            scaleType: 'band',
                            slotProps: {
                                tickLabel: {
                                    style: { fontSize: 12 }
                                }
                            }
                        }]}
                        series={[{
                            data: yValues,
                            label: 'Desv. Estándar',
                            showMark: true,
                            color: theme.palette.primary.main,
                            valueFormatter: v => `${v.toFixed(2)}%`,
                        }]}
                        slotProps={{
                            mark: { r: 4 }
                        }}
                    />
                </Box>

            </CardContent>
        </Card>
    );
}
