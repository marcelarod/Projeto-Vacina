import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeAdm from "./pages/administration";
import Calendar from "./pages/calendar";
import Reports from "./pages/charts";

import Home from "./pages/home";
import Login from "./pages/login";
import MySchedule from "./pages/mySchedule";
import Register from "./pages/register";
import Reset from "./pages/reset";
import Schedule from "./pages/schedule";
import UBSSchedule from "./pages/UBSSchedule";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset" element={<Reset />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/my-schedule" element={<MySchedule />} />
                <Route path="/administration" element={<HomeAdm />} />
                <Route path="/ubs-schedule" element={<UBSSchedule />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </BrowserRouter>
    );
}