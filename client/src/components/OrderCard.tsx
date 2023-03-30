import { Link } from "react-router-dom";

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
    <div className="bg-teal-700 p-8 text-white">
      <div>{rest}</div>
      <div>{cate}</div>
      <div>
        {curAmt}/{limit}
      </div>
      <div>{owner}</div>
      <Link to={`/order/${orderId}`}>Order</Link>
    </div>
  );
};

export default OrderCard;
