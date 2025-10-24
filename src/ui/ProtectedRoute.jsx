import styled from "styled-components";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    // OBS: We can just use the useNavigate hook inside a function or an effect
    const navigate = useNavigate();

    // 1. Loading the authenticaded user
    const { isLoading, isAuthenticated } = useUser();

    // 2. If there is NO authenticated user, redirect to login page
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isLoading, isAuthenticated, navigate]);

    // 3. While loading, show a spinner
    if (isLoading) return (<FullPage><Spinner /></FullPage>);


    // 4. Show AppLayout child component if flow reaches here 
    if (isAuthenticated) return children;
}

export default ProtectedRoute;
