import axios from "axios";
import { useEffect, useState } from "react";
import { getUserdata } from "../services/Userdata";

interface History {
  Role: string;
  CoinSpending: number;
  Restaurant: string;
  Category: string;
  Owner: string;
  Menu: string;
  Location: string;
}

const History = () => {
  const [histories, setHistories] = useState<History[]>([]);

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/history/${getUserdata("Id")}`)
      .then((response) => {
        console.log(response.data);
        setHistories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-40 py-10 px-20 flex justify-center items-center">
      <div className="rounded shadow-lg w-screen ">
        <div className="px-10 py-8 space-y-2 border-b-2 border-opacity-20">
          <h1 className="font-bold text-2xl text-teal-700">FARKS & ORDERS</h1>
          <h2 className="font-semibold text-lg text-gray-400">
            All farks and orders history
          </h2>
        </div>
        <div className="overflow-auto rounded shadow">
          <table className="w-full overflow-hidden">
            <thead>
              <tr className="border-b-2 font-bold">
                <th className="text-center p-5">ROLE</th>
                <th className="text-center p-5">RESTAURANT</th>
                <th className="text-center p-5">CATEGORY</th>
                <th className="text-center p-5">MENU</th>
                <th className="text-center p-5">LOCATION</th>
                <th className="text-center p-5">OWNER</th>
                <th className="text-center p-5">COIN SPENDING</th>
              </tr>
            </thead>
            <tbody>
              {histories.map((history, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                >
                  <td className="text-center p-6 whitespace-nowrap font-bold text-gray-500">
                    {history?.Role === "FARK" && (
                      <span className="text-rose-500">{history?.Role}</span>
                    )}
                    {history?.Role === "ORDER" && (
                      <span className="text-green-500">{history?.Role}</span>
                    )}
                  </td>
                  <td className="text-center p-6 whitespace-nowrap font-semibold text-gray-600">
                    {history?.Restaurant}
                  </td>
                  <td className="text-center p-6 whitespace-nowrap font-semibold text-gray-600">
                    {history?.Category}
                  </td>
                  <td className="text-center p-6 whitespace-nowrap font-semibold">
                    {history?.Menu === null && (
                      <div className="text-gray-400">-</div>
                    )}
                    {history?.Menu !== null && (
                      <div className="text-gray-600">{history?.Menu}</div>
                    )}
                  </td>
                  <td className="text-center p-6 whitespace-nowrap font-semibold">
                    {history?.Location === null && (
                      <div className="text-gray-400">-</div>
                    )}
                    {history?.Location !== null && (
                      <div className="text-gray-600">{history?.Location}</div>
                    )}
                  </td>
                  <td className="text-center p-6 whitespace-nowrap font-semibold">
                    {history?.Owner === getUserdata("Username") && (
                      <div className="text-gray-600">Me</div>
                    )}
                    {history?.Owner !== getUserdata("Username") && (
                      <div className="text-gray-600">{history?.Owner}</div>
                    )}
                  </td>
                  <td className="text-center p-6 whitespace-nowrap">
                    {history?.CoinSpending < 0 && (
                      <span className="bg-rose-500 py-1.5 px-3 rounded-lg text-white font-extrabold">
                        - {history?.CoinSpending * -1}
                      </span>
                    )}
                    {history?.CoinSpending > 0 && (
                      <span className="bg-green-500 py-1.5 px-3 rounded-lg text-white font-extrabold">
                        + {history?.CoinSpending}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
