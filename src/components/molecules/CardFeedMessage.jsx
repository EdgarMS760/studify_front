import React from 'react'
import UserPreview from '@components/molecules/UserPreview'
import TextCardAtom from '@components/atoms/TextCardAtom'
import clsx from 'clsx';
import { Box, useTheme } from '@mui/material';
import { useAuth } from '@libs/store/AuthProvider';

const CardFeedMessage = ({ msgObj }) => {
  const theme = useTheme()
  const { user } = useAuth();
  const isTeacher = user?.rol === "maestro";

  if (isTeacher) {
    return (
      <Box className={clsx("p-4 rounded-lg")}
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
        <div className="text-left mb-2">
          <TextCardAtom text={msgObj.time} className="text-sm text-gray-500" />
        </div>

        <div className="grid grid-cols-3 ">
          <div className="col-span-2">
            <TextCardAtom text={msgObj.message} className="text-lg" isHighlighted={true} />
          </div>

          <div className='justify-self-end'>

            <UserPreview user={msgObj.user} />
          </div>
        </div>
      </Box>
    );
  } else {
    return (
      <Box className={clsx("p-4 rounded-lg")}
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
        <div className="grid grid-cols-3 items-center">
          <div className="col-span-1">
            <UserPreview user={msgObj.user} />
          </div>

          <div className="col-span-2">
            <TextCardAtom text={msgObj.message} className="text-lg" isHighlighted={true} />
          </div>
          <div className="col-span-3 text-right mt-2">
            <TextCardAtom text={msgObj.time} className="text-sm text-gray-500" />
          </div>
        </div>
      </Box>
    );

  }
};

export default CardFeedMessage;
