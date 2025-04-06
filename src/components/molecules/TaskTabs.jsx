import React, { use } from 'react'
import SelectAtom from '@components/atoms/SelectAtom'
import { InputAdornment, Tab, Tabs, TextField, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ButtonAtom from '@components/atoms/ButtonAtom';
import clsx from 'clsx';
const TaskTabs = ({ visibleCreateTask = true }) => {
  const [selected, setSelected] = React.useState('');

  const handleSelectChange = (event) => {
    setSelected(event.target.value);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const options = [
    { value: "asc", label: 'Mas Recientes primero' },
    { value: "desc", label: 'Mas Antiguos primero' }
  ];
  const theme = useTheme()
  const bgButtonDarkMode = theme.palette.mode === 'dark' ? '!secondaryHover hover:!bg-black !font-bold' : '!bg-secondary hover:!bg-secondaryHover !font-bold';
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
            <ButtonAtom className={bgButtonDarkMode + " !rounded-full"}>
              Crear Tarea
            </ButtonAtom>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default TaskTabs;