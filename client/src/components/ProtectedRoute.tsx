import { Navigate } from "react-router-dom";
import { getUserdata } from "../services/Userdata";

interface route {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: route) => {
  if (!getUserdata("Username")) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
