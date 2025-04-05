import React from 'react';
import clsx from 'clsx';
/**
 * componente para renderizar una imagen pequeña
 * @param {string} src - la imagen a renderizar
 * @param {string} alt - el alt de la imagen por defecto es "imagen"
 * @param {style} style - en caso de necesitar un estilo mas personalizado se usa este prop, por defecto tiene "rounded-full"
 */

const MiniImg = ({ src, alt = "imagen", style = "rounded-full" }) => {
  return (
    <div className={clsx(style, "w-12 h-12 overflow-hidden")}>
      <img
        src={src}
        alt={alt}
        className={clsx(style, "w-full h-full object-cover")} 
      />
    </div>
  );
};

export default MiniImg;
