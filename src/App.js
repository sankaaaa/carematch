import React from "react";
import {BrowserRouter, Routes, Route, Link, Navigate, useLocation} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeSwitcher} from "./components/ThemeSwitcher";

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
        <>
            <Routes>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<Navigate to="/main" />} />
            </Routes>
        </>
    );
}

export default App;

// <ThemeSwitcher>
// </ThemeSwitcher>