import React from 'react'
import UserPreview from '@components/molecules/UserPreview'
import TextCardAtom from '@components/atoms/TextCardAtom'
import clsx from 'clsx';
import { useTheme } from '@mui/material';
import { useAuth } from '@libs/store/AuthProvider';

const CardFeedMessage = ({msgObj}) => {
    const theme = useTheme()
    const { user } = useAuth();
    const isTeacher = user?.rol === "maestro";

    if (isTeacher){
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
  }else{
    return (
      <div className={clsx("p-4 rounded-lg", theme.palette.mode === 'dark' ? 'bg-neutral-800' : 'bg-white')}>
        <div className="grid grid-cols-3 items-center">
          {/* UserPreview moved to the left */}
          <div className="col-span-1">
            <UserPreview user={msgObj.user} />
          </div>
    
          <div className="col-span-2">
            {/* TextCardAtom for message content */}
            <TextCardAtom text={msgObj.message} className="text-lg" isHighlighted={true} />
          </div>
    
          {/* Time moved to the right */}
          <div className="col-span-3 text-right mt-2">
            <TextCardAtom text={msgObj.time} className="text-sm text-gray-500" />
          </div>
        </div>
      </div>
    );
    
  }
  };
  
  export default CardFeedMessage;
  