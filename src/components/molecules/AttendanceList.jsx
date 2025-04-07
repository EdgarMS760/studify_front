import { use, useState } from "react";
import ButtonAtom from "@components/atoms/ButtonAtom";
import TextCardAtom from "@components/atoms/TextCardAtom";
import { useTheme } from "@mui/material";
import clsx from "clsx";
const AttendanceList = ({ students, attendance, onToggle, disabled }) => {
    return (
        <div className="border rounded-md p-4 divide-y">
            {students.map((student) => (
                <div
                    key={student.id}
                    className="flex items-center justify-between py-2"
                >
                    <span className="font-medium text-sm w-8">{student.listNumber}</span>
                    <span className="flex-1 text-sm">{student.fullName}</span>
                    <input
                        type="checkbox"
                        checked={attendance[student.id]}
                        onChange={() => onToggle(student.id)}
                        disabled={disabled}
                        className="w-4 h-4"
                    />
                </div>
            ))}
        </div>
    );
};

export default AttendanceList;

