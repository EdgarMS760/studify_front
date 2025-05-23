import { Routes, Route } from "react-router-dom";
import MainLayout from "@components/templates/MainLayout";
import LoginLayout from "@components/templates/LoginLayout";
import FeedGroupPage from "@pages/FeedGroupPage";
import AuthGate from "@components/organisms/AuthGate";
import GroupLayout from "@components/templates/GroupLayout";
import TasksPage from "@pages/TasksPage";
import MaterialPage from "@pages/MaterialPage";
import StudentsPage from "@pages/StudentsPage";
import DetailTaskPage from "@pages/DetailTaskPage";
import CalendarPage from "@pages/CalendarPage";
import ProtectedRoute from "@routes/ProtectedRoute";
import PublicOnlyRoute from "@routes/PublicOnlyRoute";
import SettingsPage from "@pages/SettingsPage";
import GroupsPage from "@pages/GroupsPage";
import ReportPage from "@pages/ReportPage";
import NotFoundPage from "@pages/NotFoundPage";
import ChatBotPage from "@pages/ChatBotPage";

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
                <Route index element={<GroupsPage />} />
                <Route path="groups" index element={<GroupsPage />} />
                <Route path="reports" index element={<ReportPage />} />
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
                <Route path="studimate" element={<ChatBotPage />} />
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
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
// comentario de test