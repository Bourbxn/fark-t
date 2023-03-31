interface auth {
  response: any;
  username: string;
  next: () => void;
}

export const authenticate = ({ response, username, next }: auth) => {
  console.log(username);
  if (window !== undefined) {
    console.log(response);
    sessionStorage.setItem("token", response.data);
    sessionStorage.setItem("user", username);
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

export const getUser = () => {
  if (window !== undefined) {
    if (sessionStorage.getItem("user")) {
      return sessionStorage.getItem("user");
    } else {
      return false;
    }
  }
};

export const logout = (next: () => void) => {
  if (window !== undefined) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    next();
  }
};
