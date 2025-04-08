import { useState } from "react";
import TextCardAtom from "@components/atoms/TextCardAtom";
import ButtonAtom from "@components/atoms/ButtonAtom";
import clsx from "clsx";
import { useTheme } from "@mui/material";

const DetailTaskStudent = () => {
    const [isDelivered, setIsDelivered] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const deliveryDate = "2025-04-10 23:59";

    const handleDeliveryToggle = () => {
        setIsDelivered(!isDelivered);
    };

    const handleFileChange = (e) => {
        setUploadedFile(e.target.files[0]);
    };
    const theme = useTheme()
    return (
        <div className={clsx("m-3 space-y-6 p-4",
            theme.palette.mode === "dark" ? "bg-neutral-800" : "bg-white",)
        }>
          
            <div className="flex items-center justify-between">
                <TextCardAtom
                    text="Nombre de la tarea"
                    className="text-xl"
                    isHighlighted={true}
                />

                <div className="flex flex-col justify-center">
                    <ButtonAtom
                        onClick={handleDeliveryToggle}
                    >
                        {isDelivered ? "Deshacer entrega" : "Entregar"}
                    </ButtonAtom>
                    <TextCardAtom
                        text={`Fecha de entrega: ${deliveryDate}`}
                        className="text-sm text-gray-500"
                    />
                </div>
            </div>

         
            <TextCardAtom
                text="Descripción de la tarea"
                className={clsx("text-lg p-3 rounded-md shadow-sm",
                    theme.palette.mode === "dark" ? "bg-neutral-600" : "bg-secondary",
                )}
            />

          
            {uploadedFile && (
                <div className={clsx("border p-3 rounded-md shadow-sm",
                    theme.palette.mode === "dark" ? "bg-neutral-800" : "bg-neutral-100",
                )}>
                    <p className="text-sm font-medium">Archivo subido:</p>
                    <p className="text-sm text-blue-600 truncate">{uploadedFile.name}</p>
                </div>
            )}

        
            {!isDelivered && (
                <div>
                    <label
                        htmlFor="fileUpload"
                        className="bg-primary inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-primaryHover transition"
                    >
                        {uploadedFile ? "Cambiar archivo" : "Subir archivo"}
                    </label>
                    <input
                        id="fileUpload"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            )}
        </div>
    );
};

export default DetailTaskStudent;
