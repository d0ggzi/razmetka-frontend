import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";

function ProtectedRoute({children}) {
    const [token] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
          navigate('/login', { replace: true });
        }
    }, [navigate, token]);

    return children;
}

export default ProtectedRoute