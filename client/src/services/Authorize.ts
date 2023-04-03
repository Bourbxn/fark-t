import jwt_decode from "jwt-decode";

interface auth {
  response: any;
  username: string;
  next: () => void;
}

interface token {
  Id: string;
}

export const authenticate = ({ response, username, next }: auth) => {
  if (window !== undefined) {
    console.log(response);
    sessionStorage.setItem("token", response.data);
    sessionStorage.setItem("user", username);
    sessionStorage.setItem("userId", jwt_decode<token>(response.data).Id);
  }
  next();
};

export const getToken = () => {
  if (window !== undefined) {
    if (sessionStorage.getItem("token")) {
      return sessionStorage.getItem("token");
    } else {
      return false;
    }
  }
};

export const logout = (next: () => void) => {
  if (window !== undefined) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userId");
    next();
  }
};
