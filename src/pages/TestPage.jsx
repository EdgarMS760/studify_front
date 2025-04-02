import React from 'react'
import TextCardAtom from '../components/atoms/TextCardAtom';
import MiniImg from '../components/atoms/MiniImg';

const TestPage = () => {
  return (
    <>
      <TextCardAtom text="Texto normal" />
      <TextCardAtom text="Texto con highlighted" isHighlighted={true} />
      <TextCardAtom text="Texto rojo " className="text-red-500 underline" />
      <MiniImg src={"https://placehold.co/600"} alt="Imagen de prueba" />
      <MiniImg src={"https://placehold.co/600x400"} alt="Imagen de prueba" style='rounded-xl'/>
    </>
  )
}

export default TestPage;