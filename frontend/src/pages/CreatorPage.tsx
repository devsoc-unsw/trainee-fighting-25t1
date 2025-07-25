import { useEffect, useState } from "react";
import StyledBackground from "../components/background/StyledBackground";
import AuthBox from "../components/containers/AuthBox";
import { useNavigate } from "react-router";

export default function CreatorPage() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    }

    useEffect(() => {
        const checkSession = async () => {
            const sessionId = localStorage.getItem('user-session-id');
            if (sessionId) {
                const API_URL = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${API_URL}/api/auth/checkSession`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            sessionId: sessionId,
                        }),
                });
                if (response.ok) {
                    navigate('/creator/view-voting-sessions');
                    return;
                }
            }
            // No valid session
            setLoading(false);
        };

        checkSession();
    }, [navigate]);
    //ADd loading component here
    if (loading) {
        return (
            <StyledBackground className='main justify-center items-center'>
                <div>Loading...</div>
            </StyledBackground>
        );
    }

    return (
        <StyledBackground className='main flex flex-col justify-center items-center md:items-start md:justify-start'>
            <button className="hover:cursor-pointer text-white p-4 text-2xl absolute sm:top-2 sm:left-4 sm:z-10 sm:translate-0 -translate-x-1/2 -translate-y-1/2" onClick={goBack}>
                ←
            </button>
            <AuthBox user={"creator"} />
        </StyledBackground>
    )
}