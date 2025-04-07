import React from 'react'
import CardMaterial from '../components/molecules/CardMaterial'
import { InputAdornment, Pagination, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ButtonAtom from '../components/atoms/ButtonAtom';
const MaterialPage = () => {
  const isTeacher = true;
  const dummy = [
    {
      id: 1,
      name: "Material 1",
      type: "pdf"
    },
    {
      id: 2,
      name: "Material 2",
      type: "video"
    },
    {
      id: 3,
      name: "Material 3",
      type: "audio"
    },
    {
      id: 4,
      name: "Material 4",
      type: "pdf"
    },
    {
      id: 5,
      name: "Material 5",
      type: "video"
    },
    {
      id: 6,
      name: "Material 6",
      type: "audio"
    },
    {
      id: 7,
      name: "Material 7",
      type: "pdf"
    },
    {
      id: 8,
      name: "Material 8",
      type: "video"
    },
    {
      id: 9,
      name: "Material 9",
      type: "audio"
    }
  ]
  return (
    <>
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
      {dummy.map((item, index) => (
        <div key={index} className="m-3">
          <CardMaterial data={item} />
        </div>
      ))}
      <div className="flex justify-center m-4">

        <Pagination count={10} showFirstButton showLastButton color="primary" />
      </div>
      {isTeacher && (
        <div className="flex justify-center m-4">
          <ButtonAtom >
            Subir Material
          </ButtonAtom>
        </div>
      )}

    </>
  )
}

export default MaterialPage