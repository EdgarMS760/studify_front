import React from 'react'
import MiniImg from '../atoms/MiniImg'
import TextCardAtom from '../atoms/TextCardAtom'
import { useTheme } from '@emotion/react'
import clsx from 'clsx'

const CardStudent = ({ student }) => {
    const theme = useTheme()

    return (
        <div className={clsx("border p-4 rounded-md shadow-sm flex flex-col sm:flex-row items-center sm:space-x-4", 
            theme.palette.mode === "dark" ? "bg-neutral-800" : "bg-white"
        )}>
            <MiniImg src="https://placehold.co/60" className="w-16 h-16 rounded-full mb-4 sm:mb-0" />
            <div className="flex flex-col items-center sm:items-start">
                <TextCardAtom text={student.fullName} isHighlighted={true} />
                <TextCardAtom text={student.email} className="text-sm text-gray-500" />
            </div>
        </div>
    )
}

export default CardStudent;
