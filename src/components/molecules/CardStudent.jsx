import React from 'react'
import MiniImg from '@components/atoms/MiniImg'
import TextCardAtom from '@components/atoms/TextCardAtom'
import clsx from 'clsx'
import { Box } from '@mui/material'

const CardStudent = ({ student, onSelected }) => {

    const handleClick = () => {
        onSelected(student);
    }

    return (
        <Box onClick={handleClick} className={clsx("cursor-pointer border p-4 rounded-md shadow-sm flex flex-col sm:flex-row items-center sm:space-x-4"
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
            <MiniImg src={student.foto_perfil || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.nombre)}`} className="w-16 h-16 rounded-full mb-4 sm:mb-0" />
            <div className="flex flex-col items-center sm:items-start">
                <TextCardAtom text={student.nombre} isHighlighted={true} />
                <TextCardAtom text={student.email} className="text-sm text-gray-500" />
            </div>
        </Box>
    )
}

export default CardStudent;
