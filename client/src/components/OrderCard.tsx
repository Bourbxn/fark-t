interface Props {
  rest: string;
  cate: string;
  limit: number;
  owner: string;
}

const OrderCard: React.FC<Props> = ({ rest, cate, limit, owner }: Props) => {
  return (
    <div className="bg-teal-700 p-8">
      <div>{rest}</div>
      <div>{cate}</div>
      <div>{limit}</div>
      <div>{owner}</div>
    </div>
  );
};

export default OrderCard;
