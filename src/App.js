import React from "react";
// TODO: answer here
import AddStudent from "./Routes/AddStudent";
import { Routes, Route, useLocation } from "react-router-dom";
import EditStudent from "./Routes/EditStudent";
import Home from "./Routes/Home";
import NotFound from "./Routes/NotFound";
import Student from "./Routes/Student";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";

const App = () => {
    const location = useLocation();
    const home = location.pathname === "/";

    const notFound = location.pathname !== "/"
    && location.pathname !== "/add"
    && location.pathname !== "/student"
    // && location.pathname !== "/student/:id"; // 
    && !location.pathname.startsWith("/student/");

    return (
        <>
            {!home && !notFound && <NavBar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddStudent />} />
                <Route path="/student" element={<Student />} />
                <Route path="/student/:id" element={<EditStudent />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {!notFound && <Footer />}
        </> // TODO: replace this
    );
};

export default App;
