// import { Document, Page } from 'react-pdf';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import ReactPlayer from 'react-player';
import { useEffect } from 'react';
import PdfViewer from '@components/organisms/PdfViewer';
import { Box, Button, Typography } from '@mui/material';

const FilePreview = ({ fileUrl, fileType }) => {

  if (!fileUrl) return null;

  if (fileType === 'pdf') {

    return (
      <PdfViewer fileUrl={fileUrl} />
    );
  }


  // Si el tipo de archivo es imagen
  if (fileType === 'imagen') {
    return (
      <PhotoProvider>
        <PhotoView src={fileUrl}>
          <img src={fileUrl} style={{ objectFit: 'cover', cursor: 'zoom-in' }} alt="" />
        </PhotoView>
      </PhotoProvider>

    );
  }

  // Si el tipo de archivo es video
  if (fileType === 'video') {
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: {
            xs: '300px',
            sm: '400px', 
            md: '500px', 
            lg: '600px', 
          },
        }}
      >
        <ReactPlayer url={fileUrl} controls={true} width="100%" />
      </Box>

    );
  }

  // Si el archivo es de otro tipo, se muestra un botón para descargarlo
  return (
    <div className="flex flex-col items-center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.open(fileUrl, "_blank")}
      >
        <Typography variant="body1" color="white">
          Descargar archivo
        </Typography>
      </Button>
    </div>
  );
};

export default FilePreview;
