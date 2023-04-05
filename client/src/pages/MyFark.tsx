import axios from "axios";
import { useEffect, useState } from "react";
import FarkCard from "../components/FarkCard";
import { getUserdata } from "../services/Userdata";

interface Fark {
  FarkId: string;
  Menu: string;
  Location: string;
  Status: string;
  User: User;
  Order: Order;
}

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

const MyFark = () => {
  const [farks, setFarks] = useState<Fark[]>([]);

  const fetchData = () => {
    axios
      .get<Fark[]>(
        `${import.meta.env.VITE_APP_API}/fark/myfark/${getUserdata("Id")}`
      )
      .then((response) => {
        setFarks(response.data);
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
    <div className="pt-40 py-10 px-20 text-5xl text-teal-500 space-y-4">
      <div className="flex flex-wrap gap-16 md:justify-start justify-center items-center">
        {farks.map((fark, index) => (
          <div key={index} className="">
            <FarkCard
              FarkId={fark.FarkId}
              Menu={fark.Menu}
              Location={fark.Location}
              User={fark.User}
              Order={fark.Order}
              Status={fark.Status}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFark;