import { Navigate } from "react-router-dom";
import { getUser } from "./services/Authorize";

interface route {
  children: any;
}

const ProtectedRoute = ({ children }: route) => {
  if (!getUser()) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
