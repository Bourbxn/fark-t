const History = () => {
  return (
    <div className="pt-40 py-10 px-20 flex justify-center items-center">
      <div className="rounded shadow-lg w-5/6">
        <div className="px-10 py-8 space-y-2 border-b-2 border-opacity-20">
          <h1 className="font-bold text-2xl text-teal-700">FARKS & ORDERS</h1>
          <h2 className="font-semibold text-lg opacity-40">
            All farks and orders history
          </h2>
        </div>
        <table className="w-full">
          <tbody>
            <tr className="">
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
            <tr>
              <td className="text-center">Anom</td>
              <td className="text-center">19</td>
              <td className="text-center">Male</td>
            </tr>
            <tr>
              <td className="text-center">Anom</td>
              <td className="text-center">19</td>
              <td className="text-center">Male</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
