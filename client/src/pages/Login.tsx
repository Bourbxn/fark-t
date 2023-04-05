import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authenticate, getToken } from "../services/Authorize";

const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = state;

  const inputValue = (name: string, event: any) => {
    setState({ ...state, [name]: event.target.value });
  };

  const navigate = useNavigate();

  const submitForm: React.FormEventHandler<HTMLFormElement> | undefined = (
    e: any
  ) => {
    e.preventDefault();
    axios
      .post(
        `${
          import.meta.env.VITE_APP_API
        }/login?username=${username}&password=${password}`
      )
      .then((response) => {
        authenticate({
          response,
          username,
          next: () => {
            navigate("/");
            navigate(0);
          },
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username or Password is incorrect!",
        });
      });
  };
  useEffect(() => {
    getToken() && navigate("/");
  }, []);

  return (
    <div className="md:pt-0 pt-30 px-10 w-screen h-screen flex justify-center items-center">
      <div className="bg-white p-10 rounded space-y-5 shadow-lg w-[30rem]">
        <h1 className="text-center text-5xl text-teal-900 font-bold">Login</h1>
        <form onSubmit={submitForm} className="space-y-3">
          <div>
            <div className="text-teal-800 font-semibold pb-1">Username</div>
            <input
              type="text"
              className="rounded border-slate-300 border-[2px] py-2 px-3 w-full"
              value={username}
              onChange={(e) => inputValue("username", e)}
              placeholder="username"
            />
          </div>
          <div>
            <div className="text-teal-800 font-semibold pb-1">Password</div>
            <input
              type="password"
              className="rounded border-slate-300 border-[2px] py-2 px-3 w-full"
              value={password}
              onChange={(e) => inputValue("password", e)}
              placeholder="password"
            />
          </div>
          <br />
          <input
            type="submit"
            value="LOGIN"
            className="cursor-pointer bg-teal-700 px-5 py-3 text-white font-bold rounded w-full"
          />
        </form>
        <div className="text-sm font-semibold text-center">
          <span className="text-slate-500">New here?</span>{" "}
          <Link to="/register" className="text-teal-700">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
