import React, { useState } from 'react'
import SelectAtom from '@components/atoms/SelectAtom'
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, InputAdornment, OutlinedInput, Tab, Tabs, TextField, useTheme
} from '@mui/material';
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

const TaskTabs = ({ visibleCreateTask, onStatusChange, isGeneralPage = true }) => {
  const [selected, setSelected] = useState('');
  const [valueCalendar, setValueCalendar] = useState(dayjs().add(1, 'day'));
  const [valueTime, setValueTime] = useState(dayjs());
  const [valueTask, setValueTask] = useState(0);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const handleSelectChange = (event) => setSelected(event.target.value);
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const theme = useTheme();
  const bgButtonDarkMode = theme.palette.mode === 'dark'
    ? '!bg-secondaryHover hover:!bg-black !font-bold'
    : '!bg-secondary hover:!bg-secondaryHover !font-bold';

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const status = newValue === 0 ? 'Abierta' : 'Cerrada';
    onStatusChange(status);
  };

  const options = [
    { value: "asc", label: 'Mas Recientes primero' },
    { value: "desc", label: 'Mas Antiguos primero' }
  ];

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleCreate = async () => {
    if (!valueCalendar || !valueTime) return;

    const combined = valueCalendar
      .set('hour', valueTime.hour())
      .set('minute', valueTime.minute())
      .set('second', 0)
      .set('millisecond', 0);

    const finalTimestamp = combined.toISOString();

    const taskData = {
      titulo: title,
      descripcion: description,
      fecha_vencimiento: finalTimestamp,
      puntos_totales: valueTask,
      grupo_id: id
    };

    try {
      setLoading(true);
      const response = await postTask(taskData);
      showSnackbar(response.message, "success");
    } catch (err) {
      const message = err.response?.data?.error || "Error al registrar. Revisa los campos.";
      showSnackbar(message, "error");
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Box
      className={clsx(
        "mx-3 flex flex-wrap items-center justify-between px-4 py-2 shadow-sm rounded-md border-b gap-y-4"
      )}
      sx={[
        { backgroundColor: "white" },
        (theme) => theme.applyStyles('dark', {
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
              "& .MuiTabs-indicator": { backgroundColor: "#808080" },
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
              "@media (max-width: 1500px)": { minWidth: "130px", fontSize: "15px" },
              "@media (max-width: 1400px)": { minWidth: "120px", fontSize: "14px" },
              "@media (max-width: 1370px)": { minWidth: "120px", fontSize: "14px" },
              "@media (max-width: 1250px)": { minWidth: "120px", fontSize: "13px" },
              "@media (max-width: 1170px)": { minWidth: "120px", fontSize: "12px" },
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
              <Button
                onClick={handleOpen}
                variant="contained"
                sx={[
                  {
                    backgroundColor: theme.vars.palette.secondary.main,
                    borderRadius: "20px",
                    '&:hover': {
                      backgroundColor: theme.vars.palette.secondary.hover,
                      fontWeight: "bold",
                      color: "white",
                    },
                  },
                  theme.applyStyles('dark', {
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "20px",
                  }),
                ]}
              >
                Crear Tarea
              </Button>

              <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
  <DialogTitle sx={{ textAlign: 'center' }}>Crear Tarea</DialogTitle>

  <DialogContent>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      mt={2}
    >
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label="Titulo de la tarea..."
        variant="outlined"
      />
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        label="Descripción de la tarea..."
        multiline
        maxRows={4}
        variant="outlined"
      />
      <TextCardAtom text="Fecha de entrega" className="text-lg text-center" />
      <DatePicker
        label="Selecciona una fecha"
        value={valueCalendar}
        onChange={(newValue) => setValueCalendar(newValue)}
      />
      <TimePicker
        label="Selecciona una hora"
        value={valueTime}
        onChange={(newValue) => setValueTime(newValue)}
      />
      <TextCardAtom text="Valor de la tarea" className="text-lg text-center" />
      <FormControl className="sm:w-[15ch]" variant="outlined">
        <OutlinedInput
          value={valueTask}
          onChange={(e) => setValueTask(e.target.value)}
          endAdornment={<InputAdornment position="end">Puntos</InputAdornment>}
          inputProps={{ 'aria-label': 'puntos' }}
        />
      </FormControl>
    </Box>
  </DialogContent>

  <DialogActions
    sx={{
      display: 'flex',
      justifyContent: 'center',
      px: 3,
      pb: 2,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
        maxWidth: 300,
        mx: 'auto',
      }}
    >
      <ButtonAtom onClick={handleCreate} fullWidth>
        Crear
      </ButtonAtom>
      <ButtonAtom onClick={handleClose} className={bgButtonDarkMode} fullWidth>
        Cancelar
      </ButtonAtom>
    </Box>
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
