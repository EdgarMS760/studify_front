import { Routes, Route } from "react-router-dom";
import NotFound from "@components/templates/NotFound";
import MainLayout from "@components/templates/MainLayout";
import TestPage from "@pages/TestPage";
import FeedGroupPage from "@pages/FeedGroupPage";

import LoginLayout from "@components/templates/LoginLayout";
import FormLogin from "@components/organisms/FormLogin";

import RegisterLayout from "@components/templates/RegisterLayout";
import FormRegister from "@components/organisms/FormRegister";

import FormGroups from "@components/organisms/FormGroups";



export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
            
                <Route path="grupos" index element={<FormGroups />} />

                <Route path="group/:id" element={<FeedGroupPage />} />
            </Route>
            
            <Route path="/login" element={<LoginLayout />}>
                <Route index element={<FormLogin />} />
            </Route>

            <Route path="/register" element={<RegisterLayout />}>
                <Route index element={<FormRegister />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
// comentario de test