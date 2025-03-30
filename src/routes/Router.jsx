import { Routes, Route } from "react-router-dom";
import NotFound from "@components/templates/NotFound";
import MainLayout from "@components/templates/MainLayout";
import LoginLayout from "@components/templates/LoginLayout";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={ <MainLayout />} >
                {/* <Route index element={<Dashboard />} />
                <Route path="/users" element={<Users />} /> */}
            </Route>
            <Route path="/login" element={<LoginLayout />} />
{/* 
            <Route path="/login" element={<Login />}>
                <Route index element={<FormLogin />} />
            </Route> */}


            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
// comentario de test