import React from 'react'
import UserPreview from '@components/molecules/UserPreview'
import TextCardAtom from '@components/atoms/TextCardAtom'
import clsx from 'clsx';
import { useTheme } from '@mui/material';

const CardFeedMessage = ({msgObj}) => {
    const theme = useTheme()
    return (
      <div className={clsx("p-4 rounded-lg",theme.palette.mode === 'dark' ? 'bg-neutral-800' : 'bg-white')}>
        <div className="text-left mb-2">
          <TextCardAtom text={msgObj.time} className="text-sm text-gray-500" />
        </div>
  
        <div className="grid grid-cols-3 ">
          <div className="col-span-2">
            <TextCardAtom text={msgObj.message} className="text-lg" isHighlighted={true} />
          </div>
  
          <div className='justify-self-end'>

          <UserPreview user={msgObj.user}/>
          </div>
        </div>
      </div>
    );
  };
  
  export default CardFeedMessage;
  