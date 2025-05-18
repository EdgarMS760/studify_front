
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";
import { Download, PictureAsPdf } from "@mui/icons-material";

/**
 * @param {Object[]} data - Si `isDetail` es false, debe ser un array plano de objetos.
 *                          Si `isDetail` es true, debe ser un objeto con `nombre_alumno` y `detalle_asistencia[]`.
 * @param {Array<{ label: string, key: string }>} columns - Columnas para mostrar.
 * @param {string} fileName - Nombre base del archivo.
 * @param {boolean} isDetail - Si es reporte por alumno con detalle.
 */
export default function ReportExporter({ data = [], columns = [], fileName = "reporte", isDetail = false }) {
    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text(fileName, 14, 20);

        if (isDetail) {
            const { nombre_alumno, detalle_asistencia = [] } = data;
            doc.text(`Alumno: ${nombre_alumno}`, 14, 30);

            autoTable(doc, {
                startY: 40,
                head: [["Fecha", "Estado"]],
                body: detalle_asistencia.map(d => [d.fecha, d.estado]),
                styles: { fontSize: 10 }
            });
        } else {
            autoTable(doc, {
                startY: 30,
                head: [columns.map(col => col.label)],
                body: data.map(row => columns.map(col => row[col.key])),
                styles: { fontSize: 10 }
            });
        }

        doc.save(`${fileName}.pdf`);
    };

    const handleExportExcel = () => {
        let wsData = [];

        if (isDetail) {
            const { nombre_alumno, detalle_asistencia = [] } = data;
            wsData.push(["Alumno", nombre_alumno]);
            wsData.push([]); // Línea en blanco
            wsData.push(["Fecha", "Estado"]);
            detalle_asistencia.forEach(d => wsData.push([d.fecha, d.estado]));
        } else {
            wsData.push(columns.map(col => col.label));
            data.forEach(row => {
                wsData.push(columns.map(col => row[col.key]));
            });
        }

        const worksheet = XLSX.utils.aoa_to_sheet(wsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        const file = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(file, `${fileName}.xlsx`);
    };

    return (
        <div className="flex gap-2 mb-2">
            <Button variant="outlined" startIcon={<PictureAsPdf />} onClick={handleExportPDF}>
                PDF
            </Button>
            <Button variant="outlined" startIcon={<Download />} onClick={handleExportExcel}>
                Excel
            </Button>
        </div>
    );
}
