import { Navigate } from "react-router-dom";
import { getUserdata } from "./services/Userdata";

interface route {
  children: any;
}

const ProtectedRoute = ({ children }: route) => {
  if (!getUserdata("Username")) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
