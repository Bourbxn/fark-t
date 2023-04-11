import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getUserdata } from "../services/Userdata";

const EditProfile = () => {
  const [state, setState] = useState({
    Username: "",
    Telephone: "",
    Password: "",
    NewPassword: "",
  });

  const [invalid, setInvalid] = useState({
    passwordInvalid: false,
    TelephoneInvalid: false,
  });

  const { Username, Telephone, Password, NewPassword } = state;

  const { passwordInvalid, TelephoneInvalid } = invalid;

  const [curPassword, setCurPassword] = useState("");

  const inputValue = (name: string, event: any) => {
    setState({ ...state, [name]: event.target.value });
  };

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/user/${getUserdata("Id")}`)
      .then((response) => {
        const { Username, Telephone } = response.data;
        setCurPassword(response.data.Password);
        setState({ ...state, Username, Telephone });
      });
  };

  const submitForm: React.FormEventHandler<HTMLFormElement> | undefined = (
    e: any
  ) => {
    e.preventDefault();
    if (curPassword !== Password) {
      return;
    }
    axios
      .put(`${import.meta.env.VITE_APP_API}/user/update/${getUserdata("Id")}`, {
        Telephone: Telephone,
        Password: NewPassword,
      })
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
    <div className="md:pt-20 pt-32 px-10 w-screen h-screen flex justify-center items-center">
      <div className="bg-white p-10 rounded space-y-5 shadow-lg w-[30rem]">
        <h1 className="text-center text-5xl text-teal-900 font-bold">
          Profile
        </h1>
        <form onSubmit={submitForm} className="space-y-3">
          <div>
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
                TelephoneInvalid ? "border-rose-400" : "border-slate-300"
              }`}
              value={Telephone}
              onChange={(e) => inputValue("Telephone", e)}
            />
          </div>
          <div className="py-5">
            <hr className=" bg-gray-200 border-2" />
          </div>
          <div>
            <div className="text-teal-800 font-semibold pb-1">Password</div>
            <input
              type="password"
              className={`rounded border-[2px] py-2 px-3 w-full ${
                passwordInvalid ? "border-rose-400" : "border-slate-300"
              }`}
              value={Password}
              onChange={(e) => inputValue("Password", e)}
              placeholder="password"
            />
          </div>
          <div>
            <div className="text-teal-800 font-semibold pb-1">New Password</div>
            <input
              type="password"
              className="rounded border-slate-300 border-[2px] py-2 px-3 w-full"
              value={NewPassword}
              onChange={(e) => inputValue("NewPassword", e)}
              placeholder="new password"
            />
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
