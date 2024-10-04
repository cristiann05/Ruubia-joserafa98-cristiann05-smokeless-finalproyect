import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import CoachCard from "../component/CoachCards";

const ControlPanelSmoker = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem("token");
            if (!token) {
                // Redirige a la página principal si no hay token
                navigate('/');
            } else {
                setLoading(false); // Deja de cargar si el token es válido
            }
        };

        checkToken();
    }, [navigate]);

    const handleLogout = () => {
        actions.logout(); // Llama a la acción de cierre de sesión
        navigate('/'); // Redirige a la página principal después de cerrar sesión
    };

    if (loading) {
        return <div>Loading...</div>; // Mensaje mientras se verifica el token
    }

    return (
        <div className="container mt-5">
            <h1>Welcome to your Dashboard!</h1>
            <p>This is the control panel for smokers.</p>
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>
            <CoachCard />
        </div>
    );
};

export default ControlPanelSmoker;
