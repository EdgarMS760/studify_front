// import { Document, Page } from 'react-pdf';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import ReactPlayer from 'react-player';
import { useEffect } from 'react';
import PdfViewer from '@components/organisms/PdfViewer';

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
          <img src={fileUrl} style={{ objectFit: 'cover' }} alt="" />
        </PhotoView>
      </PhotoProvider>
    );
  }

  // Si el tipo de archivo es video
  if (fileType === 'video') {
    return (
      <div className="video-preview">
        <ReactPlayer url={fileUrl} controls={true} />
      </div>
    );
  }

  // Si el archivo es de otro tipo, se muestra un botón para descargarlo
  return (
    <div className="file-preview">
      <button onClick={() => window.open(fileUrl, '_blank')} className="download-button">
        Descargar archivo
      </button>
    </div>
  );
};

export default FilePreview;
