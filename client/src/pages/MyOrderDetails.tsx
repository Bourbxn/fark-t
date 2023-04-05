import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdFoodBank,
  MdRestaurantMenu,
  MdFastfood,
  MdLocationOn,
  MdPhoneIphone,
  MdAccessTimeFilled,
} from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { FaUserCircle, FaMotorcycle } from "react-icons/fa";
import Swal from "sweetalert2";

interface fark {
  Menu: string;
  Location: string;
  Status: string;
  User: user;
  Order: order;
}

interface user {
  Username: string;
  Telephone: string;
}

interface order {
  Restaurant: string;
  Category: string;
}

const MyOrderDetails = () => {
  const [farks, setFarks] = useState<fark[]>([]);

  const params = useParams();

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/fark/myorder/${params.id}`)
      .then((response) => {
        setFarks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const askConfirmOrder = () => {
    Swal.fire({
      title: "Do you want to confirm orders?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmOrder();
      }
    });
  };

  const confirmOrder = () => {
    axios
      .put(
        `${import.meta.env.VITE_APP_API}/fark/status/${
          params.id
        }?status=WAIT_ORDER`
      )
      .then(() => {
        Swal.fire(
          "Confirm!",
          "Your orders have been confirmed!",
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
    <div className="md:pt-0 mt-40 mb-20 px-10 flex justify-center items-center">
      <div className="bg-white rounded space-y-5 shadow-lg w-[30rem]">
        <h1 className="text-center text-5xl text-teal-900 font-bold">
          My Order
        </h1>
        <div className="flex justify-between bg-teal-700 w-full px-10 py-8 text-teal-50  font-bold text-xl ">
          <div className="space-y-4">
            <div className="flex items-center gap-x-1">
              <span className="md:text-3xl text-xl mr-3">
                <MdFoodBank></MdFoodBank>
              </span>
              Restaurant
            </div>
            <div className="flex items-center gap-x-1">
              <span className="md:text-3xl text-xl mr-3">
                <MdRestaurantMenu></MdRestaurantMenu>
              </span>
              Category
            </div>
          </div>
          <div>
            <button onClick={askConfirmOrder}>
              <BsCartCheckFill className="text-3xl text-lime-300 hover:text-lime-500 duration-500" />
            </button>
          </div>
        </div>

        <h2 className="text-center text-teal-900 font-bold text-3xl">Orders</h2>
        <div>
          {farks.map((fark, index) => (
            <div
              key={index}
              className="bg-teal-700 border-b-2 border-teal-200 px-10 py-8 font-bold text-xl text-white flex justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-x-2">
                  <span className="md:text-3xl text-xl">
                    <MdFastfood></MdFastfood>
                  </span>
                  {fark.Menu}
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="md:text-3xl text-xl">
                    <MdLocationOn></MdLocationOn>
                  </span>
                  {fark.Location}
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="md:text-2xl text-xl">
                    <FaUserCircle></FaUserCircle>
                  </span>
                  {fark.User.Username}
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="md:text-2xl text-xl">
                    <MdPhoneIphone></MdPhoneIphone>
                  </span>
                  {fark.User.Telephone}
                </div>
              </div>
              <div>
                {fark.Status === "WAIT_CONFIRM" && (
                  <MdAccessTimeFilled className="text-3xl text-amber-200" />
                )}
                {fark.Status === "WAIT_ORDER" && (
                  <FaMotorcycle className="text-3xl text-sky-200" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrderDetails;
