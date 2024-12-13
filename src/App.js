import React from "react";
import {BrowserRouter, Routes, Route, Link, Navigate, useLocation} from 'react-router-dom';
import MainPage from "./pages/MainPage";
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
    const location = useLocation();
    return (
        <>
            <Routes>
                <Route path="/main" element={<MainPage/>}/>
            </Routes>
            {location.pathname === '/main'}
        </>
    );
}

export default App;

// <ThemeSwitcher>
// </ThemeSwitcher>