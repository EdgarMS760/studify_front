// import { Document, Page } from 'react-pdf';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import ReactPlayer from 'react-player';
import { useEffect } from 'react';

const FilePreview = ({ fileUrl, fileType }) => {
  useEffect(() => {
    console.log('first', fileType, fileUrl);
  }, []);
  if (!fileUrl) return null;

  // if (fileType === 'pdf') {
  //   return (
  //     <div className="pdf-preview">
  //       <Document file={fileUrl}>
  //         <Page pageNumber={1} />
  //       </Document>
  //     </div>
  //   );
  // }

  // Si el tipo de archivo es imagen
  if (fileType === 'image') {
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
