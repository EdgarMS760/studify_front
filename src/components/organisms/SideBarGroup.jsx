import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import CardSideBarGroup from "@components/molecules/CardSideBarGroup";
import TextCardAtom from "@components/atoms/TextCardAtom";

const SideBarGroup = ({ items }) => {
    const theme = useTheme();
    const [visibleItems, setVisibleItems] = useState(items.slice(0, 5)); // Carga inicial

    const { ref, inView } = useInView({ triggerOnce: false, threshold: 1 });

    useEffect(() => {
        if (inView && visibleItems.length < items.length) {
            setTimeout(() => {
                setVisibleItems((prev) => [
                    ...prev,
                    ...items.slice(prev.length, prev.length + 5),
                ]);
            }, 500);
        }
    }, [inView, items, visibleItems.length]);

    return (
        <aside
            className={clsx(
                "p-4 ml-3 mt-3 mb-3 rounded-md",
                "h-[90vh] overflow-y-auto ",
                theme.palette.mode === "dark" ? "bg-neutral-800" : "bg-white"
            )}
        >
            <div className="flex items-center justify-center mb-4">
                <TextCardAtom text="GRUPOS" className="text-2xl" isHighlighted={true} />
            </div>

            <ul>
                {visibleItems.map((item, index) => (
                    <li key={item.id} ref={index === visibleItems.length - 1 ? ref : null}>
                        <div
                            className={clsx(
                                "m-2 rounded-lg p-2 transition duration-300 ease-in-out",
                                theme.palette.mode === "dark"
                                    ? "hover:bg-neutral-700"
                                    : "hover:bg-neutral-200"
                            )}
                        >
                            <CardSideBarGroup image={item.image} text={item.text} />
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SideBarGroup;
