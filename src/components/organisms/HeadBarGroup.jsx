
import React from 'react'

import TextCardAtom from '@components/atoms/TextCardAtom';
import ItemsToHeadBarDesktop from '@components/molecules/ItemsToHeadBarDesktop';
import ItemsToHeadBarMobile from '@components/molecules/ItemsToHeadBarMobile';
import { useTheme } from '@emotion/react';
import clsx from 'clsx';
import { Box } from '@mui/material';
const HeadBarGroup = () => {
    const theme = useTheme()

    return (
        <Box className={clsx("flex p-5 m-3 rounded-md max-h-full max-w-screen")}
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
            <div className="hidden [@media(min-width:1170px)]:grid grid-cols-3 items-center">
                <div className="justify-self-start">
                    <TextCardAtom text="GRUPO 1" className="text-2xl" isHighlighted={true} />
                </div>

                <div className="justify-self-center">
                    <ItemsToHeadBarDesktop />
                </div>

                {/* Espacio vacio a la derecha para balancear*/}
                <div></div>
            </div>

            {/* para pantallas pequeñas */}
            <div className="[@media(min-width:1170px)]:hidden grid grid-cols-1 items-center w-full">
                <div className='justify-self-center'>

                <TextCardAtom text="GRUPO 1" className="text-2xl" isHighlighted={true} />
                </div>

                <div className='justify-self-center'>
                <ItemsToHeadBarMobile />
                </div>
            </div>
        </Box>
    );
};

export default HeadBarGroup;
