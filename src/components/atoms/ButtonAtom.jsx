import { Button } from '@mui/material';
import React from 'react'

const ButtonAtom = () => {
  return (
    <Button
    size="small"
    onClick={handleClick}
    endIcon={<SendIcon />}
    loading={loading}
    loadingPosition="end"
    variant="contained"
  >
    Send
  </Button>
  )
}

export default ButtonAtom;