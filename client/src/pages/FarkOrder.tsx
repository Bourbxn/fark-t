import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getToken } from "../services/Authorize";
import { MdFoodBank, MdRestaurantMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { getUserdata } from "../services/Userdata";

interface Order {
  Restaurant: string;
  Category: string;
  CurrentAmount: number;
  LimitAmount: number;
  Status: boolean;
  OrderId: string;
  User: User;
}

interface User {
  UserId: string;
  Username: string;
  Password: string;
  Telephone: string;
  FarkCoin: 3;
}

const FarkOrder = () => {
  const params = useParams();

  const [order, setOrder] = useState<Order>();

  const fetchData = () => {
    axios
      .get<Order>(`${import.meta.env.VITE_APP_API}/order/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [state, setState] = useState({
    menu: "",
    location: "",
  });

  const { menu, location } = state;

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
        `${import.meta.env.VITE_APP_API}/fark/create`,
        {
          OrderId: order?.OrderId,
          UserId: getUserdata("Id"),
          Menu: menu,
          Location: location,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Good job!", "Successfully to Fark Order", "success").then(
          () => navigate("/")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {}, []);

  return (
    <div className="md:pt-0 pt-32 px-10 w-screen h-screen flex justify-center items-center">
      <div className="bg-white rounded space-y-5 shadow-lg w-[30rem]">
        <h1 className="text-center text-5xl text-teal-900 font-bold">
          Fark Order
        </h1>
        <div className="bg-teal-700 w-full text-teal-50 px-10 py-8 space-y-4 font-bold text-xl">
          <div className="flex items-center gap-x-1">
            <span className="md:text-3xl text-xl mr-3">
              <MdFoodBank></MdFoodBank>
            </span>
            {order?.Restaurant}
          </div>
          <div className="flex items-center gap-x-1">
            <span className="md:text-3xl text-xl mr-3">
              <MdRestaurantMenu></MdRestaurantMenu>
            </span>
            {order?.Category}
          </div>
          <div className="flex items-center gap-x-1">
            <span className="md:text-3xl text-xl mr-3">
              <FaUserCircle></FaUserCircle>
            </span>
            {order?.User.Username}
          </div>
        </div>

        <form onSubmit={submitForm} className="space-y-3 px-10 py-3 ">
          <div>
            <div className="text-teal-800 font-semibold pb-1">Menu</div>
            <input
              type="text"
              className="rounded border-slate-300 border-[2px] py-2 px-3 w-full"
              value={menu}
              onChange={(e) => inputValue("menu", e)}
              placeholder="menu"
            />
          </div>
          <div>
            <div className="text-teal-800 font-semibold pb-1">Location</div>
            <input
              type="text"
              className="rounded border-slate-300 border-[2px] py-2 px-3 w-full"
              value={location}
              onChange={(e) => inputValue("location", e)}
              placeholder="location"
            />
          </div>
          <br />
          <div className="flex gap-4">
            <input
              type="submit"
              value="FARK ORDER"
              className="cursor-pointer bg-teal-700 px-5 py-3 text-white font-bold rounded w-full"
            />
            <button className="cursor-pointer bg-rose-500 px-5 py-3 text-white font-bold rounded w-full">
              <Link to="/">CANCEL</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarkOrder;