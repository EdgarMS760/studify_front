import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const reportes = [
  { id: 1, nombre: 'Asistencia', color: 'bg-green-500', icono: '✅' },
  { id: 2, nombre: 'Tareas y Evaluaciones', color: 'bg-orange-500', icono: '📝' },
  { id: 3, nombre: 'Desempeño', color: 'bg-blue-600', icono: '📈' },
];

const tareas = [
  { id: 1, titulo: 'Entregar ensayo de literatura', fecha: '2025-04-05' },
  { id: 2, titulo: 'Resolver guía de matemáticas', fecha: '2025-04-04' },
  { id: 3, titulo: 'Estudiar para el examen de ciencias', fecha: '2025-04-03' },
  { id: 4, titulo: 'Subir actividad de inglés', fecha: '2025-04-01' },
];

const FormReports = () => {
  const navigate = useNavigate();
  const [modalAbierto, setModalAbierto] = useState(null);

  const irATarea = (id) => {
    navigate(`/tarea/${id}`);
  };

  const abrirModalReporte = (nombre) => {
    setModalAbierto(nombre);
  };

  const cerrarModalReporte = () => {
    setModalAbierto(null);
  };

  const modalProps = {
    Asistencia: {
      titulo: "Asistencia",
      fields: ['Grupo', 'Alumno', 'Fecha Inicio', 'Fecha Fin'],
      headers: ['Fecha', 'Nombre del Alumno', 'Asistencia (Hoy)', 'Porcentaje Asistencia', 'Faltas Justificadas', 'Faltas Injustificadas'],
      columnas: 6,
    },
    'Tareas y Evaluaciones': {
      titulo: "Tareas y Evaluaciones",
      fields: ['Grupo', 'Alumno', 'Fecha de Entrega'],
      headers: ['Fecha de Entrega', 'Nombre del Alumno', 'Estado', 'Porcentaje de tareas entregadas a tiempo', 'Promedio de calificación'],
      columnas: 5,
    },
    Desempeño: {
      titulo: "Desempeño General",
      fields: ['Grupo', 'Fecha Inicio', 'Fecha Fin'],
      headers: ['Fecha', 'Comparación con otros grupos\nDesviación estándar', 'Promedio general del grupo', 'Promedio en Asistencia', 'Promedio en Tareas', 'Evaluaciones Generales'],
      columnas: 6,
    }
  };

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') cerrarModalReporte();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <h1 className="text-3xl font-bold font-mono mb-10 text-center">Mis Reportes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          {reportes.map(({ id, nombre, color, icono }) => (
            <div
              key={id}
              onClick={() => abrirModalReporte(nombre)}
              className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 transition-colors duration-200 hover:bg-[#F25019] hover:text-white cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${color}`}>
                {icono}
              </div>
              <span className="font-semibold text-lg">{nombre}</span>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Últimas Tareas</h2>
          <div className="space-y-4">
            {tareas.map(({ id, titulo, fecha }) => (
              <button
                key={id}
                onClick={() => irATarea(id)}
                className="w-full text-white hover:bg-[#F25019] hover:text-white text-left rounded-lg p-4 shadow transition-colors duration-200 bg-[#333]"
              >
                <p className="text-lg font-medium">{titulo}</p>
                <p className="text-sm">{new Date(fecha).toLocaleDateString()}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modales */}
      {modalAbierto && (
        <ModalReporte
          titulo={modalProps[modalAbierto].titulo}
          onClose={cerrarModalReporte}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {modalProps[modalAbierto].fields.map((label) => (
              <div key={label}>
                <label className="block font-semibold mb-1">{label}</label>
                <select className="w-full bg-gray-300 px-4 py-2 rounded">
                  <option>Seleccionar...</option>
                </select>
              </div>
            ))}
          </div>
          <TablaReporte
            headers={modalProps[modalAbierto].headers}
            columnas={modalProps[modalAbierto].columnas}
          />
        </ModalReporte>
      )}
    </div>
  );
};

// Modal actualizado: más estrecho y a la derecha con animación
const ModalReporte = ({ titulo, onClose, children }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 flex justify-end items-center z-50"
    onClick={onClose}
  >
    <div
      className="bg-white border border-black rounded-lg px-8 py-6 w-full max-w-4xl mr-60 transform transition-all duration-300 scale-100 translate-x-0 shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold text-center mb-6">{titulo}</h2>
      {children}
      <div className="text-center my-6">
        <button className="bg-[#F25019] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#e03f0c] transition">
          Generar Reporte
        </button>
      </div>
      <div className="text-right">
        <button onClick={onClose} className="text-gray-600 hover:underline font-medium">
          Cerrar
        </button>
      </div>
    </div>
  </div>
);

// Tabla reusable
const TablaReporte = ({ headers, columnas }) => (
  <div className="overflow-x-auto">
    <table className="w-full border border-black text-sm text-center">
      <thead className="bg-gray-300 font-semibold">
        <tr>
          {headers.map((header, idx) => (
            <th key={idx} className="border border-black px-2 py-1 whitespace-pre-line">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-black px-2 py-1" colSpan={columnas}>
            Sin datos por ahora
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default FormReports;
