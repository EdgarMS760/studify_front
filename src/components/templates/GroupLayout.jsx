import { Outlet, useNavigate, useParams } from "react-router-dom";
import HeadBarGroup from "@components/organisms/HeadBarGroup";
import clsx from "clsx";
import { Box, useMediaQuery } from "@mui/material";
import SideBarGroup from "@components/organisms/SideBarGroup";
import { useEffect, useState } from "react";
import { getGroupById, getGroups } from "@services/groupService";

const GroupLayout = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [grupos, setGrupos] = useState([]);
    const [infoGrupo, setInfoGrupo] = useState({});
    const isLargeScreen = useMediaQuery('(min-width:1348px)');
    const [showSideBar, setShowSideBar] = useState(true);
    const navigate = useNavigate();
    const fetchGroups = async () => {
        setLoading(true);
        try {
            const { groups, total, page } = await getGroups();
            const filteredGroups = groups.filter(grupo => grupo._id !== id);

            setGrupos(filteredGroups);
        } catch (error) {
            console.error("Error al obtener grupos:", error);
        }
        finally {
            setLoading(false);
        }
    };
    const fetchGroupById = async () => {
        setLoading(true);
        try {
            const { group, post } = await getGroupById(id);
            setInfoGrupo(group);
        } catch (error) {
            console.error("Error al obtener grupos:", error);
            if (error.status === 403) {
                navigate("/notfound");
            }
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!isLargeScreen) {
            setGrupos([]);
        }
    }, [isLargeScreen]);


    useEffect(() => {
        if (isLargeScreen) {
            fetchGroups();
        }
    }, [isLargeScreen, id]);

    useEffect(() => {
        if (isLargeScreen && grupos.length > 0) {
            setShowSideBar(true);
        } else {
            setShowSideBar(false);
        }
    }, [grupos, isLargeScreen]);

    useEffect(() => {
        fetchGroupById();
    }, [id]);
    return (
        <div className="flex flex-col overflow-hidden min-h-full">

            <Box
                className={clsx(
                    "h-full flex [@media(min-width:<1348px>)]:flex-row"
                )}
                sx={[
                    (theme) => ({
                        backgroundColor: theme.vars.palette.secondary.main,
                    }),
                    (theme) =>
                        theme.applyStyles('dark', {
                            backgroundColor: "black",
                        }),
                ]}
            >
                {/* este se oculta si pantalla es <= 1348px */}
                {showSideBar && (

                    <div className="hidden [@media(min-width:1348px)]:block h-full">
                        <SideBarGroup items={grupos} />
                    </div>
                )}

                <div className="flex flex-col h-full w-full">
                    <HeadBarGroup info={infoGrupo} />

                    <div className="flex-1 overflow-y-auto">
                        <Outlet />
                    </div>
                </div>

            </Box>

        </div>
    );
};

export default GroupLayout;
