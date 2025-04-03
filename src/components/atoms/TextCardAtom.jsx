import React from 'react';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx'; 

/**
 * componente para texto ya sea general o resaltado
 * @param {string} text - texto a mostrar
 * @param {boolean} isHighlighted - bool para decidir si estara resaltado con negritas o no
 * @param {style} className - en caso de necesitar un estilo mas personalizado se usa este prop"
 */
const TextCardAtom = ({ text, isHighlighted = false, className = '' }) => {
  const theme = useTheme();

  const textColorClass = theme.palette.mode === 'dark' ? 'text-white' : 'text-black'; //para cuando el tema cambie
  
  return (
    <p
      className={clsx(
        isHighlighted ? 'font-bold' : 'font-normal', // para cuando es un titulo o algo que se necesite resaltar
        textColorClass, // Color según el tema claro o oscurio
        className // estilo personalizado
      )}
    >
      {text}
    </p>
  );
};

export default TextCardAtom;
