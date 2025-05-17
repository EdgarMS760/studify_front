import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const CircularProgressWithLabel = ({value,color}) => {
  return (
    <Box position="relative" display="inline-flex">
            <CircularProgress
                variant="determinate"
                value={value}
                size={48}
                thickness={5}
                color={color || "primary"}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(value)}%`}
                </Typography>
            </Box>
        </Box>
  )
}

export default CircularProgressWithLabel