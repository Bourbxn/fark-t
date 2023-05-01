import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getToken } from "../services/Authorize";
import { getUserdata } from "../services/Userdata";

const NewOrder = () => {
  const [state, setState] = useState({
    restaurant: "",
    category: "",
    farkLimit: "1",
  });

  const { restaurant, category, farkLimit } = state;

  const inputValue = (name: string, event: any) => {
    setState({ ...state, [name]: event.target.value });
  };

  const navigate = useNavigate();

  const submitForm: React.MouseEventHandler<HTMLButtonElement> | undefined = (
    e: any
  ) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_APP_API}/order/create`,
        {
          UserId: getUserdata("Id"),
          Restaurant: restaurant,
          Category: category,
          LimitAmount: farkLimit,
          CurrentAmount: 0,
          Status: true,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire(
          "Good job!",
          "Successfully to add new order!",
          "success"
        ).then(() => navigate("/myorder"));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {}, []);

  return (
    <div className="md:pt-0 pt-32 px-10 w-screen min-h-screen flex justify-center items-center bg-gray-100 pb-10">
      <div className="bg-white p-10 rounded space-y-5 shadow-lg w-[30rem]">
        <h1 className="text-center text-5xl text-teal-900 font-bold">
          New Order
        </h1>
        <form className="space-y-3">
          <div>
            <div className="text-teal-800 font-semibold pb-1">Restaurant</div>
            <input
              type="text"
              className="rounded border-slate-300 border-[2px] py-2 px-3 w-full"
              value={restaurant}
              onChange={(e) => inputValue("restaurant", e)}
              placeholder="restaurant"
            />
          </div>
          <div>
            <div className="text-teal-800 font-semibold pb-1">
              Food Category
            </div>
            <input
              type="text"
              className="rounded border-slate-300 border-[2px] py-2 px-3 w-full"
              value={category}
              onChange={(e) => inputValue("category", e)}
              placeholder="food category"
            />
          </div>
          <div>
            <div className="text-teal-800 font-semibold pb-1">Fark Limit</div>
            <div className="relative w-full">
              <select
                className="w-full py-2 px-3  bg-white rounded  outline-none appearance-none relative text-black text-base
                border-slate-300 border-[2px]"
                onChange={(e) => inputValue("farkLimit", e)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <br />
          <div className="flex gap-4">
            <button
              className="cursor-pointer bg-teal-700  px-5 py-3 text-white font-bold rounded w-full border-2 border-teal-700 
              hover:text-teal-700 hover:bg-transparent  duration-500 "
              onClick={submitForm}
            >
              NEW ORDER
            </button>
            <Link
              to="/"
              className="w-full cursor-pointer bg-gray-500 px-5 py-3 text-white font-bold rounded flex justify-center items-center
              border-gray-500 border-2 hover:text-gray-500 hover:bg-transparent  duration-500"
            >
              <button>CANCEL</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;
