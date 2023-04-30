import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getToken } from "../services/Authorize";
import { getUserdata } from "../services/Userdata";
import { Order } from "../types/Types";

const EditOrder = () => {
  const [state, setState] = useState({
    Restaurant: "",
    Category: "",
    LimitAmount: 1,
  });

  const [order, setOrder] = useState<Order>();

  const { Restaurant, Category, LimitAmount } = state;

  const params = useParams();

  const inputValue = (name: string, event: any) => {
    setState({ ...state, [name]: event.target.value });
  };

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get<Order>(`${import.meta.env.VITE_APP_API}/order/${params.id}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        const { Restaurant, Category, LimitAmount } = response.data;
        setOrder(response.data);
        console.log(response.data);
        setState({ ...state, Restaurant, Category, LimitAmount });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitForm: React.MouseEventHandler<HTMLButtonElement> | undefined = (
    e: any
  ) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_APP_API}/order/update/${params.id}`,
        {
          Restaurant: Restaurant,
          Category: Category,
          LimitAmount: LimitAmount,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Good job!", "Successfully to edit order!", "success").then(
          () => {
            navigate(`/myorder/${params.id}`);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="md:pt-0 pt-32 px-10 w-screen min-h-screen flex justify-center items-center bg-gray-100 pb-10">
      <div className="bg-white p-10 rounded space-y-5 shadow-lg w-[30rem]">
        <h1 className="text-center text-5xl text-teal-900 font-bold">
          Edit Order
        </h1>
        <form className="space-y-3">
          <div>
            <div className="text-teal-800 font-semibold pb-1">Restaurant</div>
            <input
              type="text"
              className="rounded border-slate-300 border-[2px] py-2 px-3 w-full"
              value={Restaurant}
              onChange={(e) => inputValue("Restaurant", e)}
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
              value={Category}
              onChange={(e) => inputValue("Category", e)}
              placeholder="food category"
            />
          </div>
          <div>
            <div className="text-teal-800 font-semibold pb-1">Fark Limit</div>
            <div className="relative w-full">
              <select
                className="w-full py-2 px-3  bg-white rounded  outline-none appearance-none relative text-black text-base
                border-slate-300 border-[2px]"
                onChange={(e) => inputValue("LimitAmount", e)}
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
              className="cursor-pointer bg-teal-700 px-5 py-3 text-white font-bold rounded w-full"
              onClick={submitForm}
            >
              EDIT ORDER
            </button>
            <Link
              to={`/myorder/${params.id}`}
              state={{
                Restaurant: order?.Restaurant,
                Category: order?.Category,
              }}
              className="w-full cursor-pointer bg-gray-500 px-5 py-3 text-white font-bold rounded flex justify-center items-center"
            >
              <button>CANCEL</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
