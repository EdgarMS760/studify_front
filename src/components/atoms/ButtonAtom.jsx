import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@emotion/react';
/**
  * componente para botones estandarizados en la aplicacion
  * @param {string} children - texto a mostrar
  * @param {string} onClick - funcion a ejecutar al hacer click
  * @param {string} type - tipo de boton, por defecto es button
  * @param {style} className - IMPORTANTE USAR ! EN CADA ESTILO. en caso de necesitar un estilo mas personalizado se usa este prop"
  * @param {boolean} disabled - si el boton esta deshabilitado o no, por defecto es false
  * @param {string} icon - icono a mostrar en el boton, por defecto es null 
*/
const ButtonAtom = ({
  children,
  onClick,
  type = 'button',
  className = '!bg-primary hover:!bg-primaryHover',
  disabled = false,
  icon = null,
}) => {
  const theme = useTheme();
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        // Estilos base
        'font-medium transition duration-300 ease-in-out flex items-center gap-2',

        // Tamaño responsivo
        'px-4 py-2 text-sm',                // base
        'md:px-5 md:py-2.5 md:text-base',   // ≥768px
        'lg:px-6 lg:py-3 lg:text-base',     // ≥1024px

        // Forma
        'rounded-full',

        // Estados
        'disabled:opacity-50 disabled:cursor-not-allowed',

        // Clase custom del padre
        className,
        theme.palette.mode === 'dark' ? 'text-white' : 'text-black'
      )}
    >
      {icon}
      {children}
    </button>
  );
};

export default ButtonAtom;