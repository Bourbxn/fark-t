import axios from "axios";
import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import { getToken } from "../services/Authorize";
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

const Home = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchData = () => {
    axios
      .get<Order[]>(
        `${import.meta.env.VITE_APP_API}/order?username=${getUserdata(
          "Username"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-40 py-10 px-20 text-5xl text-teal-500 space-y-4 bg-gray-100 min-h-screen">
      {orders.length === 0 && (
        <div className="text-center">
          <h1 className="text-gray-400 font-bold text-6xl">NO ORDERS YET</h1>
        </div>
      )}
      <div className="flex flex-wrap gap-16 md:justify-start justify-center items-center">
        {orders.map((order, index) => (
          <div key={index}>
            {order?.Status && order?.User.UserId !== getUserdata("Id") && (
              <OrderCard
                rest={order?.Restaurant || ""}
                cate={order?.Category || ""}
                curAmt={order?.CurrentAmount || 0}
                limit={order?.LimitAmount || 0}
                owner={order?.User?.Username || ""}
                orderId={order?.OrderId || ""}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
