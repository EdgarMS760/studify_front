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
