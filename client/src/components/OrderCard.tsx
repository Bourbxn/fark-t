import { Link } from "react-router-dom";
import { getUser } from "../services/Authorize";
import { MdFoodBank, MdRestaurantMenu } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";

interface Props {
  rest: string;
  cate: string;
  curAmt: number;
  limit: number;
  owner: string;
  orderId: string;
}

const OrderCard: React.FC<Props> = ({
  rest,
  cate,
  limit,
  owner,
  curAmt,
  orderId,
}: Props) => {
  return (
    <div className="bg-teal-700 text-white rounded-lg shadow-xl border-teal-900 md:w-96 w-60">
      <div className="bg-white text-teal-800 p-6 md:text-2xl text-lg font-semibold flex justify-between">
        <div className="space-y-2 pb-6">
          <div className="flex items-center gap-x-1">
            <span className="md:text-3xl text-xl">
              <MdFoodBank></MdFoodBank>
            </span>
            {rest}
          </div>
          <div className="flex items-center gap-x-1">
            <span className="md:text-3xl text-xl">
              <MdRestaurantMenu></MdRestaurantMenu>
            </span>
            {cate}
          </div>
        </div>
        <div>
          <button className="md:text-3xl text-xl hover:text-teal-500 duration-500">
            <HiShoppingCart></HiShoppingCart>
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center px-6 py-3">
        <div className="md:text-xl text-base font-semibold">By {owner}</div>
        <div className="md:text-xl text-base font-bold bg-teal-900 text-white px-4 py-2 rounded-lg">
          {curAmt}/{limit}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
