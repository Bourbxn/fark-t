import {
  MdFoodBank,
  MdRestaurantMenu,
  MdFastfood,
  MdLocationOn,
  MdPhoneIphone,
  MdCancel,
  MdCheckCircle,
} from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa";

import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/Authorize";
import { Fark } from "../types/Types";

const FarkCard: React.FC<Fark> = ({
  FarkId,
  Menu,
  Location,
  Order,
  User,
  Status,
}: Fark) => {
  const navigate = useNavigate();

  const confirmCancel =
    (farkId: string): React.MouseEventHandler<SVGElement> | undefined =>
    () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be lost you Farkcoin!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel it!",
      }).then((result) => {
        if (result.isConfirmed) {
          cancelOrder(farkId);
        }
      });
    };

  const cancelOrder = (farkId: string) => {
    axios
      .delete(`${import.meta.env.VITE_APP_API}/fark/${farkId}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then(() => {
        Swal.fire("Canceled!", "Your order has been canceled.", "success");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmGetOrder =
    (farkId: string): React.MouseEventHandler<SVGElement> | undefined =>
    () => {
      Swal.fire({
        title: "Are you sure to receive order?",
        showCancelButton: true,
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          getOrder(farkId);
        }
      });
    };

  const getOrder = (farkId: string) => {
    axios
      .put(
        `${
          import.meta.env.VITE_APP_API
        }/fark/status/${farkId}?status=ORDER_RECEIVED`,
        {},
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire(
          "Good job!",
          "Your orders have been ordered!",
          "success"
        ).then(() => {
          navigate(0);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" text-white  shadow-xl border-teal-900 md:w-96 w-60">
      <div className="bg-white text-teal-800 p-6 md:text-2xl rounded-t-lg text-lg font-semibold flex justify-between">
        <div className="space-y-2 pb-6">
          <div className="flex items-center gap-x-2">
            <span className="md:text-3xl text-xl">
              <MdFoodBank></MdFoodBank>
            </span>
            {Order?.Restaurant}
          </div>
          <div className="flex items-center gap-x-2">
            <span className="md:text-3xl text-xl">
              <MdRestaurantMenu></MdRestaurantMenu>
            </span>
            {Order?.Category}
          </div>
          <div className="flex items-center gap-x-2">
            <span className="md:text-3xl text-xl">
              <MdFastfood></MdFastfood>
            </span>
            {Menu}
          </div>
          <div className="flex items-center gap-x-2">
            <span className="md:text-3xl text-xl">
              <MdLocationOn></MdLocationOn>
            </span>
            {Location}
          </div>
        </div>
        <div>
          {Status === "WAIT_CONFIRM" && (
            <MdCancel
              className="cursor-pointer text-rose-500 text-3xl"
              onClick={confirmCancel(FarkId)}
            ></MdCancel>
          )}
          {Status === "WAIT_ORDER" && (
            <div>
              <MdCheckCircle
                className="text-3xl text-green-500 cursor-pointer"
                onClick={confirmGetOrder(FarkId)}
              />
              <FaMotorcycle className="text-3xl text-sky-500" />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center px-6 py-3 rounded-b-lg bg-teal-700">
        <div className="md:text-xl text-base font-semibold space-y-2">
          <div className="flex items-center gap-x-2">
            <span className="md:text-2xl text-xl">
              <FaUserCircle></FaUserCircle>
            </span>
            {Order?.User.Username}
          </div>
          <div className="flex items-center gap-x-1">
            <span className="md:text-2xl text-xl">
              <MdPhoneIphone></MdPhoneIphone>
            </span>
            {User?.Telephone}
          </div>
        </div>
        <div className="md:text-xl text-base font-bold bg-teal-900 text-white px-4 py-2 rounded-lg">
          {Order?.CurrentAmount}/{Order?.LimitAmount}
        </div>
      </div>
    </div>
  );
};

export default FarkCard;
