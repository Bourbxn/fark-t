import { CgMenu, CgClose } from "react-icons/cg";
import { MdOutlineNoFood } from "react-icons/md";
import { useEffect, useState } from "react";
import { getToken, logout } from "../services/Authorize";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgAddR } from "react-icons/cg";
import { FaUserCircle, FaHistory } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { RiUserSettingsFill } from "react-icons/ri";
import { getUserdata } from "../services/Userdata";
import axios from "axios";
import { User } from "../types/Types";

const Navbar: React.FC = () => {
  const paths = [
    { key: 1, name: "Orders", path: "/" },
    { key: 2, name: "My Order", path: "/myorder" },
    { key: 3, name: "My Fark", path: "/fark" },
  ];
  const navigate = useNavigate();
  let [open, setOpen] = useState(false);

  const [user, setUser] = useState<User>();

  const navbarStyle =
    "text-teal-700 hover:text-teal-500 font-bold duration-500";

  const fetchData = () => {
    axios
      .get<User>(`${import.meta.env.VITE_APP_API}/user/${getUserdata("Id")}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getUserdata("Username") && fetchData();
  }, []);

  return (
    <nav className="shadow-lg w-full fixed top-0 lef-0">
      <div className="md:flex items-center justify-between bg-white py-[1.8rem] md:px-[6rem] px-[3rem]">
        <div className="font-bold text-2xl cursor-pointer flex items-center text-teal-700">
          <span className="mr-2 text-teal-700 text-4xl">
            <MdOutlineNoFood></MdOutlineNoFood>
          </span>
          FARK-T
        </div>
        <div
          className="text-teal-700 absolute right-8 top-7 text-3xl cursor-pointer md:hidden"
          onClick={() => setOpen(!open)}
        >
          {!open && <CgMenu></CgMenu>}
          {open && <CgClose></CgClose>}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-6 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full
            md:w-auto md:pl-0 pl-12 transition-all ease-in duration-500 md:border-b-0 border-b-2  ${
              open ? "top-20 opacity-100" : "top-[-490px]"
            }`}
        >
          {getUserdata("Username") && (
            <li className="md:my-0 my-7">
              <Link
                to="/neworder"
                className="text-teal-700 hover:text-teal-500 font-bold duration-500 text-2xl"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CgAddR></CgAddR>
              </Link>
            </li>
          )}
          {paths.map((path) => (
            <li key={path.key} className="md:ml-7 md:my-0 my-7">
              <NavLink
                to={path.path}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `${navbarStyle} border-b-[2.5px] border-teal-700 p-1 hover:border-teal-500`
                    : `${navbarStyle}`
                }
                onClick={() => {
                  setOpen(false);
                }}
              >
                {path.name}
              </NavLink>
            </li>
          ))}
          {!getUserdata("Username") && (
            <li className="md:ml-7 md:my-0 my-7">
              <Link to="/login">
                <button className="font-bold bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-500 duration-500">
                  Login
                </button>
              </Link>
            </li>
          )}
          {getUserdata("Username") && (
            <li className="dropdown md:dropdown-bottom md:dropdown-end md:ml-7 md:my-0 mb-7">
              <label tabIndex={0}>
                <div className="bg-teal-700 rounded-xl flex py-3 px-5  gap-3 text-white justify-center items-center cursor-pointer">
                  <div className="flex justify-center items-center gap-2 bg-teal-600 text-teal-50 rounded-lg px-3 font-bold">
                    <GiTwoCoins className="text-lg"></GiTwoCoins>
                    {user?.FarkCoin || "0"}
                  </div>
                  <FaUserCircle className=" text-2xl"></FaUserCircle>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu font-bold p-2 shadow bg-white rounded-xl md:w-52 w-72"
              >
                <li>
                  <Link
                    to="/profile"
                    className="text-teal-700 hover:text-teal-500"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <span>
                      <RiUserSettingsFill></RiUserSettingsFill>
                    </span>
                    {getUserdata("Username")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="text-teal-700 hover:text-teal-500"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <span>
                      <FaHistory></FaHistory>
                    </span>
                    History
                  </Link>
                </li>
                <li className="border-t-2">
                  <button
                    className="font-bold text-teal-700 rounded-lg hover:text-teal-500 duration-500"
                    onClick={() => logout(() => navigate("/login"))}
                  >
                    <span>
                      <FiLogOut></FiLogOut>
                    </span>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
