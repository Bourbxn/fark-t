import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getToken } from "../services/Authorize";
import { isPasswordInvalid, isTelephoneInvalid } from "../utils/Function";

const Register = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    cPassword: "",
    telephone: "",
  });

  const { username, password, cPassword, telephone } = state;

  const [invalidTel, setInvalidTel] = useState(false);
  const [invalidPwd, setInvalidPwd] = useState(false);
  const [invalidCpwd, setInvalidCpwd] = useState(false);

  const inputValue = (name: string, event: any) => {
    setState({ ...state, [name]: event.target.value });
  };

  const navigate = useNavigate();

  const isInvalidForm = () => {
    let isInvalid = 0;
    if (isTelephoneInvalid(telephone)) {
      setInvalidTel(true);
      isInvalid++;
    } else setInvalidTel(false);

    if (isPasswordInvalid(password)) {
      setInvalidPwd(true);
      isInvalid++;
    } else setInvalidPwd(false);

    if (password !== cPassword) {
      setInvalidCpwd(true);
      isInvalid++;
    } else setInvalidCpwd(false);
    if (isInvalid > 0) {
      return true;
    }
    return false;
  };

  const submitForm: React.FormEventHandler<HTMLFormElement> | undefined = (
    e: any
  ) => {
    e.preventDefault();
    if (isInvalidForm()) {
      return;
    }
    axios
      .post(
        `${import.meta.env.VITE_APP_API}/user/create`,
        {
          Username: username,
          Password: password,
          Telephone: telephone,
          FarkCoin: 3,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Good job!", "Successfully to Register!", "success").then(
          () => navigate("/login")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getToken() && navigate("/");
  }, []);

  return (
    <div className="pt-32 md:pt-16 pb-20 md:pb-0 px-10 w-screen min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg space-y-5 shadow-lg w-[30rem]">
        <h1 className="text-center text-5xl text-teal-900 font-bold">
          Register
        </h1>
        <form onSubmit={submitForm} className="space-y-6">
          <div>
            <div className="text-teal-800 font-semibold pb-1">Username</div>
            <input
              type="text"
              className={`rounded border-[2px] py-2 px-3 w-full border-slate-300`}
              value={username}
              onChange={(e) => inputValue("username", e)}
              placeholder="username"
            />
          </div>
          <div>
            <div className="text-teal-800 font-semibold pb-1">Phone</div>
            <input
              type="text"
              className={`rounded border-[2px] py-2 px-3 w-full ${
                invalidTel ? "border-rose-400" : "border-slate-300"
              }`}
              value={telephone}
              onChange={(e) => inputValue("telephone", e)}
            />
            {invalidTel && (
              <div className="absolute text-sm text-rose-400 font-semibold">
                Invalid telephone number
              </div>
            )}
          </div>
          <div>
            <div className="text-teal-800 font-semibold pb-1">Password</div>
            <input
              type="password"
              className={`rounded border-[2px] py-2 px-3 w-full ${
                invalidPwd ? "border-rose-400" : "border-slate-300"
              }`}
              value={password}
              onChange={(e) => inputValue("password", e)}
              placeholder="password"
            />
            {invalidPwd && (
              <div className=" text-sm text-rose-400 font-semibold">
                Password must use at least 8 characters and contains numbers and
                characters
              </div>
            )}
          </div>
          <div>
            <div className="text-teal-800 font-semibold pb-1">
              Confirm Password
            </div>
            <input
              type="password"
              className={`rounded border-[2px] py-2 px-3 w-full ${
                invalidCpwd ? "border-rose-400" : "border-slate-300"
              }`}
              value={cPassword}
              onChange={(e) => inputValue("cPassword", e)}
              placeholder="confirm password"
            />
            {invalidCpwd && (
              <div className=" text-sm text-rose-400 font-semibold">
                Password are not matching
              </div>
            )}
          </div>

          <br />
          <input
            type="submit"
            value="REGISTER"
            className="cursor-pointer bg-teal-700 px-5 py-3 text-white font-bold rounded w-full"
          />
        </form>
        <div className="text-sm font-semibold text-center">
          <span className="text-slate-500">Already have an Account.</span>{" "}
          <Link to="/login" className="text-teal-700">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
