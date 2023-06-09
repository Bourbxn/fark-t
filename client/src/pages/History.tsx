import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getToken } from "../services/Authorize";
import { getUserdata } from "../services/Userdata";
import { HistoryTypes } from "../types/Types";
import { formatDate } from "../utils/Formatting";

const History = () => {
  const [histories, setHistories] = useState<HistoryTypes[]>([]);

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage: number = 5;

  const endOffset = itemOffset + itemsPerPage;
  const currentHistories = histories.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(histories.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % histories.length;
    setItemOffset(newOffset);
  };
  const fetchData = () => {
    axios
      .get<HistoryTypes[]>(
        `${import.meta.env.VITE_APP_API}/history/${getUserdata("Id")}`,
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
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
    <div className="md:pt-40 pt-28 py-10 md:px-20 px-8 flex min-h-screen justify-center  bg-gray-100">
      <div className="rounded shadow-lg w-screen overflow-hidden h-full bg-white">
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
                <th className="text-center p-5 tracking-wide">DATE</th>
                <th className="text-center p-5 tracking-wide">ROLE</th>
                <th className="text-center p-5 tracking-wide">RESTAURANT</th>
                <th className="text-center p-5 tracking-wide">CATEGORY</th>
                <th className="text-center p-5 tracking-wide">MENU</th>
                <th className="text-center p-5 tracking-wide">LOCATION</th>
                <th className="text-center p-5 tracking-wide">OWNER</th>
                <th className="text-center p-5 tracking-wide">COIN SPENDING</th>
              </tr>
            </thead>
            <tbody>
              {currentHistories.map((history, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                >
                  <td className="text-center text-sm p-6 whitespace-nowrap font-semibold text-gray-400">
                    {formatDate(history?.Date)}
                  </td>
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
                  <td className="text-center p-6 whitespace-nowrap font-semibold w-1">
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
        <div className="flex justify-end items-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            className="flex md:pr-12 pr-6 py-6 gap-x-3 font-semibold text-gray-400  justify-center items-center"
            activeClassName="text-teal-500 border-2 border-teal-500 px-2"
          />
        </div>
      </div>
    </div>
  );
};

export default History;
