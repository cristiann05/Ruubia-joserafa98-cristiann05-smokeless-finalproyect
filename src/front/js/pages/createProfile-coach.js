import React, { useEffect, useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { Context } from "../store/appContext"; 
import "../../styles/CreateProfileCoach.css";
import logo from '../../img/logos/logoblanco.png';
import logoOscuro from '../../img/logos/logonegro.png';

const CreateProfileCoach = () => {
    const { store, actions } = useContext(Context); 
    const [nombre_coach, setnombre_coach] = useState("");
    const [genero, setGenero] = useState("masculino");
    const [cumpleaños, setCumpleaños] = useState("");
    const [foto_coach, setfoto_coach] = useState(null); 
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (store.loggedInCoach) {
            setnombre_coach(store.loggedInCoach.nombre_coach || "");
            setGenero(store.loggedInCoach.genero_coach || "masculino");
            if (store.loggedInCoach.nacimiento_coach && typeof store.loggedInCoach.nacimiento_coach === 'string') {
                setCumpleaños(store.loggedInCoach.nacimiento_coach.split("T")[0]);
            }
            setfoto_coach(store.loggedInCoach.foto_coach || null); 
        }
    }, [store.loggedInCoach]);

    const handleImageUpload = (e) => {
        setfoto_coach(e.target.files[0]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!store.loggedInCoach) {
            setError("No hay coach logueado. Por favor, inicia sesión.");
            return;
        }

        const coachId = store.loggedInCoach.id;

        if (!coachId) {
            setError("ID de coach no válido.");
            return;
        }

        if (!cumpleaños) {
            setError("La fecha de cumpleaños es requerida.");
            return;
        }

        let imageUrl = store.loggedInCoach.foto_coach; 
        if (foto_coach) {
            const uploadResult = await actions.uploadCoachImage(foto_coach);
            if (uploadResult && uploadResult.secure_url) {
                imageUrl = uploadResult.secure_url; 
            } else {
                setError("Error al subir la imagen. Inténtalo de nuevo.");
                return;
            }
        }

        const updatedData = {
            nombre_coach: nombre_coach,
            genero_coach: genero,
            nacimiento_coach: cumpleaños,
            foto_coach: imageUrl, 
        };

        const success = await actions.updateProfileCoach(coachId, updatedData);
        if (success) {
            alert("Perfil actualizado con éxito");
            navigate('/question-address-coach');
        } else {
            alert("Error al actualizar el perfil");
        }
    };

    if (!store.loggedInCoach) {
        return <div>No hay coach logueado. Por favor, inicia sesión.</div>;
    }

    return (
        <>
            <div className="row g-0 justify-content-center gradient-bottom-right start-purple middle-indigo end-pink">
                <div className="col-md-6 col-lg-5 col-xl-5 position-fixed start-0 top-0 vh-100 overflow-y-hidden d-none d-lg-flex flex-lg-column">
                    <div className="p-12 py-xl-10 px-xl-20">
                        <div className="d-block">
                            <img src={logo} alt="Logo" className="logo" />
                        </div>
    
                        <div className="mt-16 text-center px-5">
                            <h1 className="ls-tight fw-bolder display-4 text-white mb-3">
                                ¡Cuentanos más de ti!
                            </h1>
                            <p className="text-white text-opacity-75 pe-xl-24" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                                Ayudanos a conocerte mejor. Estos detalles básicos harán que tu experiencia sea única y personalizada en cada paso del camino.
                            </p>
                        </div>
                    </div>
                </div>
    
                <div className="col-12 col-md-12 col-lg-7 offset-lg-5 min-vh-100 overflow-y-auto d-flex flex-column justify-content-center position-relative bg-body rounded-top-start-lg-4 rounded shadow-soft-5">
                    <div className="w-md-50 mx-auto px-10 px-md-0 py-10">
                        <div className="mb-10">
                            <a className="d-inline-block d-lg-none mb-10" href="/pages/dashboard.html">
                                <img src={logoOscuro} alt="Logo Oscuro" className="logo" />
                            </a>
                            <h1 className="ls-tight fw-bolder h1">Actualizar Perfil</h1> 
                        </div>
    
                        {error && <div className="alert alert-danger">{error}</div>}
                        
                        <form className="form" onSubmit={handleSubmit} style={{ fontSize: '1.25rem' }}>
                            {/* Nombre */}
                            <div className="group mb-4">
                                <i className="fa-regular fa-user icon"></i>
                                <input
                                    type="text"
                                    name="nombre_coach"
                                    id="nombre_coach"
                                    className="input"
                                    value={nombre_coach}
                                    onChange={(e) => setnombre_coach(e.target.value)}
                                    placeholder="Nombre de Coach"
                                    required
                                    style={{ height: '60px', fontSize: '1.25rem' }}
                                />
                            </div>
    
                            {/* Género */}
                            <div className="group mb-4">
                                <i className="fa-solid fa-venus-mars icon"></i>
                                <select
                                    name="genero"
                                    id="genero"
                                    className="input"
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                    required
                                    style={{ height: '60px', fontSize: '1.25rem' }}
                                >
                                    <option value="" disabled>Seleccionar Género</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                </select>
                            </div>
    
                            {/* Fecha de nacimiento */}
                            <div className="group mb-4">
                                <i className="fa-regular fa-calendar icon"></i>
                                <input
                                    type="date"
                                    name="cumpleaños"
                                    id="cumpleaños"
                                    className="input"
                                    value={cumpleaños}
                                    onChange={(e) => setCumpleaños(e.target.value)}
                                    required
                                    style={{ height: '60px', fontSize: '1.25rem' }}
                                />
                            </div>
    
                            {/* Foto */}
                            <div className="group mb-4">
                                <i className="fa-solid fa-camera icon"></i>
                                <input
                                    type="file"
                                    name="foto"
                                    id="foto"
                                    className="input"
                                    onChange={handleImageUpload}
                                    style={{ height: '60px', fontSize: '1.25rem' }}
                                />
                            </div>
    
                            <button className="btn btn-dark w-100" type="submit" style={{ fontSize: '1.25rem', padding: '15px' }}>
                                Actualizar Perfil
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}    
export default CreateProfileCoach;