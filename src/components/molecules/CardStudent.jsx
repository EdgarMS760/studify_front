import React from 'react'
import MiniImg from '@components/atoms/MiniImg'
import TextCardAtom from '@components/atoms/TextCardAtom'
import clsx from 'clsx'
import { Box } from '@mui/material'

const CardStudent = ({ student }) => {

    return (
        <Box className={clsx("border p-4 rounded-md shadow-sm flex flex-col sm:flex-row items-center sm:space-x-4"
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
            <MiniImg src="https://placehold.co/60" className="w-16 h-16 rounded-full mb-4 sm:mb-0" />
            <div className="flex flex-col items-center sm:items-start">
                <TextCardAtom text={student.fullName} isHighlighted={true} />
                <TextCardAtom text={student.email} className="text-sm text-gray-500" />
            </div>
        </Box>
    )
}

export default CardStudent;
