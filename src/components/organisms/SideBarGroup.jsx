import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import CardSideBarGroup from "@components/molecules/CardSideBarGroup";
import TextCardAtom from "@components/atoms/TextCardAtom";
import { Box } from "@mui/material";

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
        <Box
            className={clsx(
                "p-4 ml-3 mt-3 mb-3 rounded-md",
                "h-fit overflow-y-auto "
            )}
            sx={[
                (theme) => ({
                    backgroundColor: "white",
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        backgroundColor: theme.vars.palette.secondary.main,
                    }),
            ]}
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
        </Box>
    );
};

export default SideBarGroup;
