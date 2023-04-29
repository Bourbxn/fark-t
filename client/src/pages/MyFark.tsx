import axios from "axios";
import { useEffect, useState } from "react";
import FarkCard from "../components/FarkCard";
import { getToken } from "../services/Authorize";
import { getUserdata } from "../services/Userdata";
import { Fark } from "../types/Types";

const MyFark = () => {
  const [farks, setFarks] = useState<Fark[]>([]);

  const fetchData = () => {
    axios
      .get<Fark[]>(
        `${import.meta.env.VITE_APP_API}/fark/myfark/${getUserdata("Id")}`,
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
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
    <div className="pt-40 py-10 px-20 text-5xl text-teal-500 space-y-4 bg-gray-100 min-h-screen">
      {farks.length === 0 && (
        <div className="text-center">
          <h1 className="text-gray-400 font-bold text-6xl">NO FARKS YET</h1>
        </div>
      )}
      <div className="flex flex-wrap gap-16 md:justify-start justify-center items-center">
        {farks.map((fark, index) => (
          <div key={index}>
            {fark.Status !== "ORDER_RECEIVED" && (
              <FarkCard
                FarkId={fark.FarkId}
                Menu={fark.Menu}
                Location={fark.Location}
                User={fark.User}
                Order={fark.Order}
                Status={fark.Status}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFark;
