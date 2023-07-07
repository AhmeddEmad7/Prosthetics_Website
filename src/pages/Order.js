import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [Order, setOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrder, setFilteredOrder] = useState(null);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from("Order").select();

    if (error) {
      setOrder(null);
      setFetchError("Couldn't fetch the Orders data");
      console.log(error);
    }
    if (data) {
      setOrder(data);
      setFetchError(null);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    if (Order) {
      const filteredData = Order.filter((op) =>
        op.OrderName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrder(filteredData);
    }
  }, [searchTerm, Order]);

  const handleCreateOrder = () => {
    navigate("/createOrder");
  };

  const handleDelete = async (orderID) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      await supabase.from("Order").delete().eq("ID", orderID);
      fetchOrders();
    }
  };
  return (
    <div className="page home">
      <div className="createOperation">
        <h1 className="tablesubj">Orders Info</h1>
        <button className="createButton" onClick={handleCreateOrder}>
          Create New
        </button>
        <label id="searchLabel">
          <input
            type="text"
            style={{ textAlign: "center" }}
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      {fetchError && <p>{fetchError}</p>}
      {filteredOrder && Order && (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Code</th>
              <th>Date</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Supplier ID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrder.map((order) => (
              <tr key={order.id}>
                <td>{order.ID}</td>
                <td>{order.OrderName}</td>
                <td>{order.Date}</td>
                <td>{order.Status}</td>
                <td style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}}>{order.Notes}</td>
                <td className="supp">{order.Supplier_ID}</td>
                <td className="buttons">
                  <Link to={"/order" + order.ID}>
                    <i className="material-icons">edit</i>
                  </Link>
                </td>
                <td className="buttons">
                  <i
                    className="material-icons"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(order.ID)}
                  >
                    delete
                  </i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Order;

// <div className="Supplier">
//   {/* Order by buttons */}
//   <div className="supplier-grid">
//     {Supplier.map(Supplier => (
//       <SupplierCard key={Supplier.ID} Supplier={Supplier}/>
//     ))}
//   </div>
// </div>