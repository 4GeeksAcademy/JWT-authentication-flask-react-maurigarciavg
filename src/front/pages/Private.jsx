import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(resp => {
            if (resp.status !== 200) {
                navigate("/login");
                return;
            }
            return resp.json();
        })
        .then(data => {
            if (data) setMessage(data.msg);
        });
    }, []);

    return (
        <div className="container mt-5">
            <h1>Bienvenido a la zona VIP 😎</h1>
            <p>{message}</p>
        </div>
    );
};