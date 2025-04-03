import { Routes, Route } from "react-router-dom";
import NotFound from "@components/templates/NotFound";
import MainLayout from "@components/templates/MainLayout";
import LoginLayout from "@components/templates/LoginLayout";
import TestPage from "@pages/TestPage";
import FeedGroupPage from "@pages/FeedGroupPage";
import FormRegister from "@components/organisms/FormRegister";
import FormLogin from "@components/organisms/FormLogin";
import AuthGate from "@components/organisms/AuthGate";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                <Route index element={<TestPage />} />
                <Route path="group/:id" element={<FeedGroupPage />} />
            </Route>
            
            <Route path="/login" element={<LoginLayout />}>
                <Route index element={<AuthGate />} />
            </Route>

            <Route path="/register" element={<LoginLayout />}>
                <Route index element={<FormRegister />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
// comentario de test