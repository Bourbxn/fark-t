import axios from "axios";
import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";

interface Order {
  restaurant: string;
  category: string;
  currentAmount: number;
  limitAmount: number;
  status: boolean;
  orderId: string;
  user: User;
}

interface User {
  userId: string;
  username: string;
  password: string;
  telephone: string;
  farkCoin: 3;
}

const Home = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchData = () => {
    axios
      .get<Order[]>(`${import.meta.env.VITE_APP_API}/order`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-40 py-10 px-10 text-5xl text-teal-500 space-y-4">
      {orders.map((order, index) => (
        <div key={index} className="">
          {order.status && (
            <OrderCard
              rest={order.restaurant}
              cate={order.category}
              curAmt={order.currentAmount}
              limit={order.limitAmount}
              owner={order.user.username}
              orderId={order.orderId}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
