import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdFoodBank, MdRestaurantMenu, MdCheckCircle } from "react-icons/md";
import { FaLock, FaLockOpen } from "react-icons/fa";
import Swal from "sweetalert2";
import OrderDetailsCard from "../components/OrderDetailsCard";
import { getUserdata } from "../services/Userdata";
import { getToken } from "../services/Authorize";
import { FarkOrderDetails } from "../types/Types";

const MyOrderDetails = () => {
  const [farks, setFarks] = useState<FarkOrderDetails[]>([]);

  const params = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const fetchData = () => {
    axios
      .get<FarkOrderDetails[]>(
        `${import.meta.env.VITE_APP_API}/fark/myorder/${params.id}`,
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
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
        `${import.meta.env.VITE_APP_API}/fark/status/order/${
          params.id
        }?status=WAIT_ORDER`,
        {},
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
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

  const isAllOrdersReceived = (farks: fark[]) => {
    let item = 0;
    for (item; item < farks.length; item++) {
      if (farks[item]?.Status !== "ORDER_RECEIVED") {
        return false;
      }
    }
    if (item === 0) {
      return false;
    }
    return true;
  };

  const checkout = () => {
    for (var fk = 0; fk < farks.length; fk++);
    axios
      .post(
        `${import.meta.env.VITE_APP_API}/history/create`,
        {
          Role: "ORDER",
          CoinSpending: fk,
          Restaurant: location.state.Restaurant,
          Category: location.state.Category,
          Menu: null,
          Location: null,
          Owner: location.state.Owner,
          UserId: getUserdata("Id"),
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => {
        deleteOrder(fk);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteOrder = (fk: number) => {
    axios
      .delete(`${import.meta.env.VITE_APP_API}/order/delete/${params.id}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then(() => {
        addFarkCoin(fk);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addFarkCoin = (fk: number) => {
    axios
      .put(
        `${import.meta.env.VITE_APP_API}/user/addcoin/${getUserdata(
          "Id"
        )}?coinAdd=${fk}`,
        {},
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire(
          "Checkout!",
          `You have received ${fk} Farkcoin!`,
          "success"
        ).then(() => {
          navigate("/myorder");
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
    <div className="pt-48 md:pt-40 pb-20 px-10 flex justify-center items-start  min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg space-y-5 shadow-lg w-[30rem]">
        <h1 className="text-center text-5xl text-teal-900 font-bold pt-6">
          My Order
        </h1>
        <div className="flex justify-between bg-teal-700 w-full px-10 py-8 text-teal-50  font-bold text-xl ">
          <div className="space-y-4">
            <div className="flex items-center gap-x-1">
              <span className="md:text-3xl text-xl mr-3">
                <MdFoodBank></MdFoodBank>
              </span>
              {location?.state.Restaurant}
            </div>
            <div className="flex items-center gap-x-1">
              <span className="md:text-3xl text-xl mr-3">
                <MdRestaurantMenu></MdRestaurantMenu>
              </span>
              {location?.state.Category}
            </div>
          </div>
          <div>
            {farks[0]?.Status === "WAIT_CONFIRM" && (
              <button onClick={askConfirmOrder}>
                <MdCheckCircle className="text-3xl text-lime-300 hover:text-lime-500 duration-500" />
              </button>
            )}
            {(farks[0]?.Status === "WAIT_ORDER" ||
              farks[0]?.Status === "ORDER_RECEIVED") && (
              <MdCheckCircle className="text-3xl text-gray-200" />
            )}
          </div>
        </div>

        <h2 className="text-center text-teal-900 font-bold text-3xl">Farks</h2>
        <div>
          {farks.length === 0 && (
            <div>
              <h1 className="text-center font-bold text-gray-400 text-lg">
                NO FARKS YET
              </h1>
            </div>
          )}
          {farks.map((fark, index) => (
            <div key={index}>
              <OrderDetailsCard
                Menu={fark.Menu}
                Location={fark.Location}
                Status={fark.Status}
                User={fark.User}
              />
            </div>
          ))}
        </div>
        <div className="pt-4 pb-8">
          <div className="flex justify-center items-center">
            {isAllOrdersReceived(farks) && (
              <button
                className="bg-teal-600 text-white font-bold px-5 py-3 text-xl w-1/2 rounded shadow-lg hover:bg-teal-500 duration-500 
                  flex justify-center items-center gap-x-3"
                onClick={checkout}
              >
                <span>
                  <FaLockOpen />
                </span>
                CHECKOUT
              </button>
            )}
            {!isAllOrdersReceived(farks) && (
              <button
                className="bg-gray-400 text-white font-bold px-5 py-3 text-xl w-1/2 rounded shadow-lg duration-500 cursor-auto 
                  flex justify-center items-center gap-x-3"
              >
                <span>
                  <FaLock />
                </span>
                CHECKOUT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderDetails;
