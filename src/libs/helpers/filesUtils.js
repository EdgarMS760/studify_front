export const getFileType = (fileName, customTypes = {}) => {
    if (!fileName) return 'Archivo';

    const extension = fileName.split('.').pop().toLowerCase();

    const defaultTypes = {
        pdf: 'PDF',
        doc: 'Word',
        docx: 'Word',
        xls: 'Excel',
        xlsx: 'Excel',
        ppt: 'PowerPoint',
        pptx: 'PowerPoint',
        jpg: 'Imagen',
        jpeg: 'Imagen',
        png: 'Imagen',
        gif: 'Imagen',
        mp4: 'Video',
        mp3: 'Audio',
        json: 'JSON',
        txt: 'Texto',
        zip: 'Archivo comprimido',
    };

    // Combina el mapeo por defecto con los tipos personalizados
    const typesMap = { ...defaultTypes, ...customTypes };

    return typesMap[extension] || extension.toUpperCase();
};

export const detectarTipoArchivo = (nombreArchivo) => {
  const extension = nombreArchivo.split('.').pop().toLowerCase();

  const tiposImagen = [
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg',
    'tiff', 'tif', 'ico', 'avif'
  ];

  const tiposVideo = [
    'mp4', 'webm', 'ogg', 'mov', 'm4v', 'avi', 'flv', 'wmv', '3gp', 'mkv'
  ];

  const tiposPDF = ['pdf'];

  if (tiposImagen.includes(extension)) return 'imagen';
  if (tiposVideo.includes(extension)) return 'video';
  if (tiposPDF.includes(extension)) return 'PDF';

  return nombreArchivo; // Retorna lo original si no es reconocido
};

