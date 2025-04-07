import { Routes, Route } from "react-router-dom";
import NotFound from "@components/templates/NotFound";
import MainLayout from "@components/templates/MainLayout";
import LoginLayout from "@components/templates/LoginLayout";
import TestPage from "@pages/TestPage";
import FeedGroupPage from "@pages/FeedGroupPage";
import FormRegister from "@components/organisms/FormRegister";
import FormLogin from "@components/organisms/FormLogin";
import AuthGate from "@components/organisms/AuthGate";
import GroupLayout from "@components/templates/GroupLayout";
import TasksPage from "@pages/TasksPage";
import MaterialPage from "@pages/MaterialPage";
import StudentsPage from "@pages/StudentsPage";
import DetailTaskPage from "@pages/DetailTaskPage";
import CalendarPage from "@pages/CalendarPage";
import FormGroups from "@components/organisms/FormGroups";
import FormReports from "@components/organisms/FormReports";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import SettingsPage from "../pages/SettingsPage";

export default function Router() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<TestPage />} />
                <Route path="groups" index element={<FormGroups />} />
                <Route path="reports" index element={<FormReports />} />
                <Route path="group/:id" element={<GroupLayout />}>
                    <Route index element={<FeedGroupPage />} />
                    <Route path="tasks">
                        <Route index element={<TasksPage />} />
                        <Route path=":taskId" element={<DetailTaskPage />} />
                    </Route>
                    <Route path="material" element={<MaterialPage />} />
                    <Route path="students" element={<StudentsPage />} />
                </Route>
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="homework" element={<TasksPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route
                path="/auth"
                element={
                    <PublicOnlyRoute>
                        <LoginLayout />
                    </PublicOnlyRoute>
                }
            >
                <Route index element={<AuthGate />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
// comentario de test