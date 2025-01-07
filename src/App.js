import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CreateAccount from "./pages/CreateAccount";
import AllTerapistsPage from "./pages/AllTerapistsPage";
import TherapistDetails from "./components/TherapistDetails";
import UserPage from "./pages/UserPage";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

function App() {
    return (
        <BrowserRouter>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="light">
                    <RoutesComponent/>
                </NextThemesProvider>
            </NextUIProvider>
        </BrowserRouter>
    );
}

function RoutesComponent() {
    return (
        <Routes>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/forgot-password" element={<ResetPasswordPage/>}/>
            <Route path="/create-account" element={<CreateAccount/>}/>
            <Route path="/all-therapists" element={<AllTerapistsPage/>}/>
            <Route path="/all-therapists/:id" element={<TherapistDetails/>}/>
            <Route path="/my-account/:id" element={<UserPage/>}/>
            <Route path="/" element={<Navigate to="/login"/>}/>
        </Routes>
    );
}

export default App;
