import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { WiDaySleetStorm } from "react-icons/wi";
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Definisco il mio componente MyNavbar
export default function MyNavbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Gestisco il click sul link Preferiti
    const handlePreferitiClick = () => {
        if (location.pathname !== '/') {
            navigate('/', { hash: '#preferiti' });
        } else {
            const preferitiSection = document.getElementById('preferiti');
            if (preferitiSection) {
                preferitiSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Ritorno JSX per rendere il componente MyNavbar
    return (
        <>
            <Navbar className="navBar px-4" style={{ position: 'sticky', top: 0, zIndex: 100 }} expand="lg">
                <Navbar.Brand as={Link} to="/" className="d-flex text-light">
                    <WiDaySleetStorm
                        alt=""
                        className="fs-1 me-1"
                    />
                    <p className="fs-3 fw-semibold">MyMeteo</p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="flex-column align-items-end">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="navMenu text-light">Home</Nav.Link>
                        <Nav.Link onClick={handlePreferitiClick} className="navMenu text-light">Preferiti</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}
