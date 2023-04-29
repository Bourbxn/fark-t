import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getToken } from "../services/Authorize";
import { getUserdata } from "../services/Userdata";
import { isTelephoneInvalid } from "../utils/FormValidation";

const EditProfile = () => {
  const [state, setState] = useState({
    Username: "",
    Telephone: "",
    Password: "",
    NewPassword: "",
  });

  const [pwdInvalid, setPwdInvalid] = useState(false);
  const [telInvalid, setTelInvalid] = useState(false);
  const [cpwdInvalid, setCpwdInvalid] = useState("VALID");

  const { Username, Telephone, Password, NewPassword } = state;

  const [curPassword, setCurPassword] = useState("");

  const inputValue = (name: string, event: any) => {
    setState({ ...state, [name]: event.target.value });
  };

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/user/${getUserdata("Id")}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        const { Username, Telephone } = response.data;
        setCurPassword(response.data.Password);
        setState({ ...state, Username, Telephone });
      });
  };

  const isInvalidForm = () => {
    let isInvalid = 0;
    if (curPassword !== Password) {
      setPwdInvalid(true);
      isInvalid++;
    } else {
      setPwdInvalid(false);
    }
    if (isTelephoneInvalid(Telephone)) {
      setTelInvalid(true);
      isInvalid++;
    } else {
      setTelInvalid(false);
    }
    if (NewPassword === curPassword) {
      setCpwdInvalid("SAME_PASSWORD");
      isInvalid++;
    } else {
      setCpwdInvalid("VALID");
    }
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
      .put(
        `${import.meta.env.VITE_APP_API}/user/update/${getUserdata("Id")}`,
        {
          Telephone: Telephone,
          Password: NewPassword,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire(
          "Updated!",
          "Successfully updated your profile!",
          "success"
        ).then(() => {
          navigate(0);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="md:pt-20 pt-32 px-10 w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded space-y-5 shadow-lg w-[30rem]">
        <h1 className="text-center text-5xl text-teal-900 font-bold">
          Profile
        </h1>
        <form onSubmit={submitForm} className="space-y-3">
          <div className="pb-4">
            <div className="text-teal-800 font-semibold pb-1">Username</div>
            <input
              type="text"
              className="rounded bg-gray-200 opacity-70 border-slate-300 border-[2px] py-2 px-3 w-full"
              value={Username}
              disabled
            />
          </div>
          <div>
            <div className="text-teal-800 font-semibold pb-1">Phone</div>
            <input
              type="text"
              className={`rounded border-[2px] py-2 px-3 w-full ${
                telInvalid ? "border-rose-400" : "border-slate-300"
              }`}
              value={Telephone}
              onChange={(e) => inputValue("Telephone", e)}
            />
            {telInvalid && (
              <div className="text-rose-400 text-sm font-semibold absolute">
                Invalid telephone number
              </div>
            )}
          </div>
          <div className="pb-5 pt-8">
            <hr className=" bg-gray-200 border-2" />
          </div>
          <div className="pb-4">
            <div className="text-teal-800 font-semibold pb-1">Password</div>
            <input
              type="password"
              className={`rounded border-[2px] py-2 px-3 w-full ${
                pwdInvalid ? "border-rose-400" : "border-slate-300"
              }`}
              value={Password}
              onChange={(e) => inputValue("Password", e)}
              placeholder="password"
            />
            {pwdInvalid && (
              <div className="text-rose-400 text-sm font-semibold absolute">
                Incorrect password
              </div>
            )}
          </div>
          <div className="pb-2">
            <div className="text-teal-800 font-semibold pb-1">New Password</div>
            <input
              type="password"
              className={`rounded border-[2px] py-2 px-3 w-full ${
                !pwdInvalid && cpwdInvalid === "SAME_PASSWORD"
                  ? "border-rose-400"
                  : "border-slate-300"
              }`}
              value={NewPassword}
              onChange={(e) => inputValue("NewPassword", e)}
              placeholder="new password"
            />
            {cpwdInvalid === "SAME_PASSWORD" && !pwdInvalid && (
              <div className="text-rose-400 text-sm font-semibold absolute">
                Cannot be same current password
              </div>
            )}
          </div>

          <br />
          <input
            type="submit"
            value="UPDATE"
            className="cursor-pointer bg-teal-700 px-5 py-3 text-white font-bold rounded w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
