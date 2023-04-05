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
    farkLimit: "",
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
        ).then(() => navigate("/login"));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {}, []);

  return (
    <div className="md:pt-0 pt-32 px-10 w-screen h-screen flex justify-center items-center">
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
            <input
              type="text"
              className="rounded border-slate-300 border-[2px] py-2 px-3 w-full"
              value={farkLimit}
              onChange={(e) => inputValue("farkLimit", e)}
              placeholder="fark limit"
            />
          </div>
          <br />
          <div className="flex gap-4">
            <button
              className="cursor-pointer bg-teal-700 px-5 py-3 text-white font-bold rounded w-full"
              onClick={submitForm}
            >
              NEW ORDER
            </button>
            <button className="cursor-pointer bg-rose-500 px-5 py-3 text-white font-bold rounded w-full">
              <Link to="/">CANCEL</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;
