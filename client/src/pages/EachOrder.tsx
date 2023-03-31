import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

const EachOrder = () => {
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

  return (
    <div>
      <h1 className="pt-40 py-10 text-5xl text-teal-500">hello world</h1>
      <h1>slug : {params.id}</h1>
      <div>{JSON.stringify(order)}</div>
      <div>{order?.restaurant}</div>
    </div>
  );
};

export default EachOrder;
