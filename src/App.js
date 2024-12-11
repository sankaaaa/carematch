import React from "react";
import {BrowserRouter, Routes, Route, Link, Navigate, useLocation} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import {Button, NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeSwitcher} from "./components/ThemeSwitcher";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="light">
                    <Header/>
                    <ThemeSwitcher>
                    </ThemeSwitcher>
                    <Button>lol</Button>

                </NextThemesProvider>
                <RoutesComponent/>
            </NextUIProvider>

        </BrowserRouter>
    );
}

function RoutesComponent() {
    const location = useLocation();
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/main"/>}/>
            </Routes>
            {location.pathname === '/main'}
        </>
    );
}

export default App;
