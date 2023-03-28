import axios from "axios";
import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";

interface Order {
  restaurant: string;
  category: string;
  limitAmount: number;
  ownerId: string;
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
    <div className="pt-28 px-10 text-5xl text-teal-500">
      {orders.map((order, index) => (
        <div key={index}>
          <OrderCard
            rest={order.restaurant}
            cate={order.category}
            limit={order.limitAmount}
            owner={order.ownerId}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
