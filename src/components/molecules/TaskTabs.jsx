import React, { use, useState } from 'react'
import SelectAtom from '@components/atoms/SelectAtom'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Tab, Tabs, TextField, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ButtonAtom from '@components/atoms/ButtonAtom';
import clsx from 'clsx';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import TextCardAtom from '@components/atoms/TextCardAtom';
import { TimePicker } from '@mui/x-date-pickers';
const TaskTabs = ({ visibleCreateTask = true, onStatusChange }) => {
  const [selected, setSelected] = useState('');
  const [valueCalendar, setValueCalendar] = useState(dayjs('2022-04-17'));
  const [valueTime, setValueTime] = useState(dayjs('2022-04-17T23:59'));
  const handleSelectChange = (event) => {
    setSelected(event.target.value);
  };
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const status = newValue === 0 ? 'abierta' : 'cerrada';
    onStatusChange(status);
  };
  const options = [
    { value: "asc", label: 'Mas Recientes primero' },
    { value: "desc", label: 'Mas Antiguos primero' }
  ];
  const theme = useTheme()
  const bgButtonDarkMode = theme.palette.mode === 'dark' ? '!secondaryHover hover:!bg-black !font-bold' : '!bg-secondary hover:!bg-secondaryHover !font-bold';

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleCreate = () => {
    console.log("Tarea creada:", { title, description });
    handleClose();
  };

  return (
    <div
      className={clsx(
        "mx-3 flex flex-wrap items-center justify-between px-4 py-2 shadow-sm rounded-md border-b gap-y-4",
        theme.palette.mode === "dark" ? "bg-neutral-800" : "bg-white"
      )}
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

          {visibleCreateTask && (
            <>
              <ButtonAtom onClick={handleOpen} className={bgButtonDarkMode + " !rounded-full"}>
                Crear Tarea
              </ButtonAtom>
              <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Crear Tarea</DialogTitle>

                <DialogContent>
                  <div className='flex flex-col gap-4 mt-2'>

                    <TextField
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      fullWidth
                      id="filled-basic"
                      label="Titulo de la tarea..."
                      multiline
                      maxRows={4}
                      variant="outlined"

                    />
                    <TextField
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      fullWidth
                      id="outlined-basic"
                      label="Descripción de la tarea..."
                      multiline
                      rows={4}
                      maxRows={4}
                      variant="outlined"

                    />

                    <TextCardAtom text="Fecha de entrega" className="text-lg" />
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
    </div>
  );

};

export default TaskTabs;