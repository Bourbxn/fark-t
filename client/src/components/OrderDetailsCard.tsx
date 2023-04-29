import {
  MdFastfood,
  MdLocationOn,
  MdPhoneIphone,
  MdAccessTimeFilled,
} from "react-icons/md";
import { FaUserCircle, FaMotorcycle } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { FarkProps } from "../types/Types";

const OrderDetailsCard = ({ Menu, Location, Status, User }: FarkProps) => {
  return (
    <div className="bg-teal-700 border-b-2 border-teal-200 px-10 py-8 font-bold text-xl text-white flex justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-x-2">
          <span className="md:text-3xl text-xl">
            <MdFastfood></MdFastfood>
          </span>
          {Menu}
        </div>
        <div className="flex items-center gap-x-2">
          <span className="md:text-3xl text-xl">
            <MdLocationOn></MdLocationOn>
          </span>
          {Location}
        </div>
        <div className="flex items-center gap-x-2">
          <span className="md:text-2xl text-xl">
            <FaUserCircle></FaUserCircle>
          </span>
          {User.Username}
        </div>
        <div className="flex items-center gap-x-2">
          <span className="md:text-2xl text-xl">
            <MdPhoneIphone></MdPhoneIphone>
          </span>
          {User.Telephone}
        </div>
      </div>
      <div>
        {Status === "WAIT_CONFIRM" && (
          <MdAccessTimeFilled className="text-3xl text-amber-200" />
        )}
        {Status === "WAIT_ORDER" && (
          <FaMotorcycle className="text-3xl text-sky-300" />
        )}
        {Status === "ORDER_RECEIVED" && (
          <BsCartCheckFill className="text-3xl text-lime-300" />
        )}
      </div>
    </div>
  );
};

export default OrderDetailsCard;
