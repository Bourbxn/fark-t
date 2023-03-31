import { CgMenu, CgClose } from "react-icons/cg";
import { MdOutlineNoFood } from "react-icons/md";
import { useState } from "react";
import { getUser, logout } from "../services/Authorize";
import { Link, useNavigate } from "react-router-dom";
import { CgAddR } from "react-icons/cg";

const Navbar: React.FC = () => {
  const paths = [
    { key: 1, name: "Orders", path: "/" },
    { key: 2, name: "My Order", path: "/order" },
  ];

  const navigate = useNavigate();

  let [open, setOpen] = useState(false);

  return (
    <nav className="shadow-lg w-full fixed top-0 lef-0">
      <div className="md:flex items-center justify-between bg-white py-[1.8rem] md:px-[6rem] px-[3rem]">
        <div className="font-bold text-2xl cursor-pointer flex items-center text-teal-700">
          <span className="mr-2 text-teal-700 text-4xl">
            <MdOutlineNoFood></MdOutlineNoFood>
          </span>
          Fark-T
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
          {getUser() && (
            <li className="ml-7 md:my-0 my-7">
              <a
                href="/neworder"
                className="text-teal-700 hover:text-teal-500 font-bold duration-500 text-2xl"
              >
                <CgAddR></CgAddR>
              </a>
            </li>
          )}
          {paths.map((path) => (
            <li key={path.key} className="md:ml-7 md:my-0 my-7">
              <a
                href={path.path}
                className="text-teal-700 hover:text-teal-500 font-bold duration-500"
              >
                {path.name}
              </a>
            </li>
          ))}
          {!getUser() && (
            <li className="md:ml-7 md:my-0 my-7">
              <Link to="/login">
                <button className="font-bold bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-500 duration-500">
                  Login
                </button>
              </Link>
            </li>
          )}
          {getUser() && (
            <li className="md:ml-7 md:my-0 my-7">
              <button
                className="font-bold text-teal-700 rounded-lg hover:text-teal-500 duration-500"
                onClick={() => logout(() => navigate("/login"))}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
