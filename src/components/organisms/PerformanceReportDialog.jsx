import React, { useEffect, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, IconButton,
    CircularProgress,
    Autocomplete
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Close } from "@mui/icons-material";

import { useSnackbar } from "@libs/store/SnackbarContext";
import dayjs from "dayjs";
import PerformanceReportGroupView from "@components/molecules/PerformanceReportGroupView";

import { getGroups } from '@services/groupService';
import PerformanceReportGeneralView from "@components/molecules/PerformanceReportGeneralView";
import { performanceReport } from "@services/reportService";
export default function PerformanceReportDialog({ open, onClose }) {
    const { showSnackbar } = useSnackbar();
    const [group, setGroup] = useState("");
    const [groups, setGroups] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [loadingGroups, setLoadingGroups] = useState(false);
    const [pageGroup, setPageGroup] = useState(1);
    const [totalPagesGroup, setTotalPagesGroup] = useState(1);

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

        if(!startDate) {
            newErrors.startDate = "La fecha de inicio es obligatoria";
            showSnackbar("La fecha de inicio es obligatoria", "error");
            return Object.keys(newErrors).length === 0;
        }
        if(!endDate) {
            newErrors.endDate = "La fecha de fin es obligatoria";
            showSnackbar("La fecha de fin es obligatoria", "error");
            return Object.keys(newErrors).length === 0;
        }

        if (startDate > endDate) {
            newErrors.startDate = "La fecha de inicio no puede ser mayor a la fecha de fin";
            newErrors.endDate = "La fecha de inicio no puede ser mayor a la fecha de fin";
            showSnackbar("La fecha de inicio no puede ser mayor a la fecha de fin", "error");
        return Object.keys(newErrors).length === 0;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleGenerate = async () => {
        if (!validate()) return;

        setLoading(true);
        setReportData([]);

        try {
            const response = await performanceReport(
                group,
                startDate && dayjs(startDate).format("YYYY-MM-DD"),
                endDate && dayjs(endDate).format("YYYY-MM-DD")
            );
            setReportData(response);
            console.log("Reporte generado:", response);
        } catch (error) {
            console.error("Error al generar el reporte:", error);
        } finally {
            setLoading(false);
        }
    };
    const resetFields = (onlyFilters = false) => {
        setGroup("");
        setStartDate(null);
        setEndDate(null);
        setErrors({});
        if (!onlyFilters) { setReportData([]); }
    };

    const handleClose = () => {
        console.log("cerrar");
        resetFields();
        onClose();
    };
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle className="flex justify-between items-center">
                Desempeño General
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Autocomplete
                        fullWidth
                        options={groups}
                        getOptionLabel={(option) => option.nombre}
                        value={groups.find(g => g._id === group) || null}
                        onChange={(e, newValue) => {
                            const groupId = newValue?._id || "";
                            setGroup(groupId);
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
                ) : (
                    <>
                        {reportData ? (
                            Array.isArray(reportData) ? (
                                <PerformanceReportGroupView reportData={reportData} />
                            ) : (
                                <PerformanceReportGeneralView reportData={reportData} />
                            )
                        ) : (
                            <div className="flex justify-center py-6">
                                <p className="text-gray-500">No hay datos para mostrar</p>
                            </div>
                        )}
                    </>


                )}

            </DialogContent>


            <DialogActions className="px-6 pb-4">
                <Button onClick={handleClose} color="inherit">
                    Cancelar
                </Button>
                <Button variant="contained" onClick={handleGenerate}>
                    Generar Reporte
                </Button>
            </DialogActions>
        </Dialog>
    );
}
