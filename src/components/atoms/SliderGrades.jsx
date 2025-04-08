import { Box, Slider, Typography } from '@mui/material'
import React from 'react'

import { MIN_GRADES_VALUE, MAX_GRADES_VALUE } from '@libs/constants/Grades';
import TextCardAtom from '@components/atoms/TextCardAtom';
const SliderGrades = () => {
    const [valGrade, setValGrade] = React.useState(MIN_GRADES_VALUE);
    const marks = [
        {
            value: MIN_GRADES_VALUE,
            label: '',
        },
        {
            value: MAX_GRADES_VALUE,
            label: '',
        },
    ];
    const handleChange = (_, newValue) => {
        setValGrade(newValue);
    };

    return (
        <>
            <Slider
                marks={marks}
                value={valGrade}
                valueLabelDisplay="auto"
                min={MIN_GRADES_VALUE}
                max={MAX_GRADES_VALUE}
                onChange={handleChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="body2"
                    onClick={() => setValGrade(MIN_GRADES_VALUE)}
                    sx={{ cursor: 'pointer' }}
                >
                    {MIN_GRADES_VALUE}
                </Typography>
                <TextCardAtom text={valGrade} className="text-xl" isHighlighted={true}/>
                <Typography
                    variant="body2"
                    onClick={() => setValGrade(MAX_GRADES_VALUE)}
                    sx={{ cursor: 'pointer' }}
                >
                    {MAX_GRADES_VALUE}
                </Typography>
            </Box>
        </>
    )
}

export default SliderGrades