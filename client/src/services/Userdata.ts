import jwt_decode from "jwt-decode";
import { getToken } from "./Authorize";

interface token {
  Id: string;
  Username: string;
}

export const getUserdata = (data: string) => {
  if (window !== undefined) {
    const tokenString = getToken();
    if (typeof tokenString === "string") {
      const decodedToken = jwt_decode<token>(tokenString);
      if (data === "Username") {
        return decodedToken.Username;
      } else if (data === "Id") {
        return decodedToken.Id;
      }
    } else {
      return null;
    }
  }
};
