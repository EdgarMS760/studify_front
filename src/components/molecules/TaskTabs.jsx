import { useState } from 'react'
import SelectAtom from '@components/atoms/SelectAtom'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputAdornment, OutlinedInput, Tab, Tabs, TextField, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ButtonAtom from '@components/atoms/ButtonAtom';
import clsx from 'clsx';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import TextCardAtom from '@components/atoms/TextCardAtom';
import { TimePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router';
import { postTask } from '@services/taskService';
import { useSnackbar } from '@libs/store/SnackbarContext';
import { formatToISOString } from '@libs/helpers/dateUtils';
const TaskTabs = ({ visibleCreateTask, onStatusChange, onCreateTask, isGeneralPage = true }) => {
  const [selected, setSelected] = useState('');
  const [valueCalendar, setValueCalendar] = useState(dayjs().add(1, 'day')); // Día de mañana
  const [valueTime, setValueTime] = useState(dayjs());
  const [valueTask, setValueTask] = useState(0);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const handleSelectChange = (event) => {
    setSelected(event.target.value);
  };
  const [value, setValue] = useState(0);

  const { id } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const status = newValue === 0 ? 'Abierta' : 'Cerrada';
    onStatusChange(status);
  };
  const options = [
    { value: "asc", label: 'Mas Recientes primero' },
    { value: "desc", label: 'Mas Antiguos primero' }
  ];
  const theme = useTheme()
  const bgButtonDarkMode = theme.palette.mode === 'dark' ? '!bg-secondaryHover hover:!bg-black !font-bold' : '!bg-secondary hover:!bg-secondaryHover !font-bold';

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
  };

  const validateCreateForm = () => {
    const newErrors = {};
    const now = dayjs();

    if (!title.trim()) newErrors.title = "El título es obligatorio";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";

    if (!valueTask || isNaN(valueTask) || Number(valueTask) <= 0) {
      newErrors.valueTask = "El valor debe ser un número mayor a 0";
    }

    if (!valueCalendar) {
      newErrors.date = "La fecha es obligatoria";
    } else if (valueCalendar.isBefore(now, "day")) {
      newErrors.date = "La fecha debe ser hoy o posterior";
    }

    if (!valueTime) {
      newErrors.time = "La hora es obligatoria";
    } else if (
      valueCalendar.isSame(now, "day") && valueTime.isBefore(now.add(1, "hour"))
    ) {
      newErrors.time = "La hora debe ser al menos una hora después de la hora actual";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateCreateForm()) return;



    const finalTimestamp = formatToISOString(valueCalendar, valueTime);
    const taskData = {
      titulo: title, descripcion: description,
      fecha_vencimiento: finalTimestamp,
      puntos_totales: valueTask, grupo_id: id
    };

    try {
      setLoading(true);


      const response = await postTask(taskData);

      showSnackbar(response.message, "success");
      onCreateTask(true);
    } catch (err) {
      console.error("Error al registrar:", err);
      const message = err.response?.data?.error || "Error al registrar. Revisa los campos.";
      showSnackbar(message, "error");



    } finally {
      setLoading(false);
    }
    handleClose();
  };

  return (
    <Box
      className={clsx(
        "mx-3 flex flex-wrap items-center justify-between px-4 py-2 shadow-sm rounded-md border-b gap-y-4"
      )}
      sx={[
        (theme) => ({
          backgroundColor: "white",
        }),
        (theme) =>
          theme.applyStyles('dark', {
            backgroundColor: theme.vars.palette.secondary.main,
          }),
      ]}
    >
      <div className="w-full flex flex-wrap justify-center items-center [@media(min-width:1486px)]:grid [@media(min-width:1486px)]:grid-cols-3 [@media(min-width:1486px)]:items-center">

        <div className="flex justify-center [@media(min-width:1486px)]:justify-start">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="task tabs"
            textColor="inherit"
            indicatorColor="primary"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#808080",
              },
              "& .MuiTab-root": {
                color: "#808080",
                minWidth: "160px",
                fontSize: "16px",
                padding: "10px",
                transition: "all 0.3s ease-in-out",
                "&.Mui-selected": {
                  color: "#000000",
                  backgroundColor: "#D9D9D9",
                  borderRadius: "8px",
                },
              },

              "@media (max-width: 1500px)": {
                minWidth: "130px",
                fontSize: "15px",
              },

              "@media (max-width: 1400px)": {
                minWidth: "120px",
                fontSize: "14px",
              },
              "@media (max-width: 1370px)": {
                minWidth: "120px",
                fontSize: "14px",
              },

              "@media (max-width: 1250px)": {
                minWidth: "120px",
                fontSize: "13px",
              },

              "@media (max-width: 1170px)": {
                minWidth: "120px",
                fontSize: "12px",
              },
            }}
          >
            <Tab label="Próximas" />
            <Tab label="Expiradas" />
          </Tabs>
        </div>

        <div className="flex justify-center my-4">
          <TextField
            id="search-task"
            variant="standard"
            placeholder="Buscar..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 180 }}
          />
        </div>

        <div className="flex flex-col gap-2 items-center justify-center [@media(min-width:785px)]:flex-row  [@media(min-width:1486px)]:justify-end">
          <SelectAtom
            items={options}
            placeholder="Ordenar"
            value={selected}
            onChange={handleSelectChange}
          />

          {visibleCreateTask && !isGeneralPage && (
            <>
              <Button onClick={handleOpen} variant="contained" sx={[
                (theme) => ({
                  backgroundColor: theme.vars.palette.secondary.main,
                  borderRadius: "20px",
                  '&:hover': {
                    backgroundColor: theme.vars.palette.secondary.hover,
                    fontWeight: "bold",
                    color: "white",
                  },
                }),
                (theme) =>
                  theme.applyStyles('dark', {
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "20px",
                  }),
              ]}>Crear Tarea</Button>
              <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Crear Tarea</DialogTitle>

                <DialogContent>
                  <div className='flex flex-col gap-4 mt-2'>

                    <TextField
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      fullWidth
                      label="Titulo de la tarea..."
                      variant="outlined"
                      error={!!errors.title}
                      helperText={errors.title}
                    />

                    <TextField
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      fullWidth
                      label="Descripción de la tarea..."
                      multiline
                      maxRows={4}
                      variant="outlined"
                      error={!!errors.description}
                      helperText={errors.description}
                    />

                    <TextCardAtom text="Fecha de entrega" className="text-lg" />
                    <DatePicker
                      label="Selecciona una fecha"
                      value={valueCalendar}
                      onChange={(newValue) => setValueCalendar(newValue)}
                      slotProps={{
                        textField: {
                          error: !!errors.date,
                          helperText: errors.date,
                        },
                      }}
                    />

                    <TimePicker
                      label="Selecciona una hora"
                      value={valueTime}
                      onChange={(newValue) => setValueTime(newValue)}
                      slotProps={{
                        textField: {
                          error: !!errors.time,
                          helperText: errors.time,
                        },
                      }}
                    />

                    <TextCardAtom text="Valor de la tarea" className="text-lg" />
                    <FormControl className='sm:w-[15ch]' variant="outlined">

                      <OutlinedInput
                        value={valueTask}
                        onChange={(e) => setValueTask(e.target.value)}
                        error={!!errors.valueTask}
                        endAdornment={<InputAdornment position="end">Puntos</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{ 'aria-label': 'puntos' }}
                      />
                      {errors.valueTask && (
                        <p className="text-red-500 text-sm mt-1">{errors.valueTask}</p>
                      )}

                    </FormControl>
                  </div>
                </DialogContent>

                <DialogActions>
                  <ButtonAtom onClick={handleCreate}>Crear</ButtonAtom>
                  <ButtonAtom onClick={handleClose} className={bgButtonDarkMode}>Cancelar</ButtonAtom>
                </DialogActions>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </Box>
  );

};

export default TaskTabs;