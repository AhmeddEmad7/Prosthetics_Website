import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const UpdateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [OrderName, setOrderName] = useState("");
  const [Date, setDate] = useState("");
  const [Status, setStatus] = useState("");
  const [Notes, setNotes] = useState("");
  const [Supplier_ID, setSupplier_ID] = useState("");
  const [formError, setFormError] = useState(null);

  const [fetchError, setFetchError] = useState(null);
  const [Supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      const { data, error } = await supabase.from("Supplier").select();

      if (error) {
        setSupplier(null);
        setFetchError("Couldn't fetch the Suppliers data");
        console.log(error);
      }
      if (data) {
        setSupplier(data);
        setFetchError(null);
      }
    };
    fetchSupplier();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!OrderName || !Date || !Status || !Notes || !Supplier_ID) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }
    const { data, error } = await supabase
      .from("Order")
      .update([{ OrderName, Date, Status, Notes, Supplier_ID }])
      .eq("ID", id);

    if (error) {
      setFormError("Please fill in all the fields correctly.");
    }
    if (data) {
      setFormError(null);
    }
    navigate("/order");
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from("Order")
        .select()
        .eq("ID", id)
        .single();

      if (error) {
        navigate("/order", { replace: true });
      }
      if (data) {
        setOrderName(data.OrderName);
        setDate(data.Date);
        setStatus(data.Status);
        setNotes(data.Notes);
        setSupplier_ID(data.Supplier_ID);
      }
    };
    fetchOrder();
  }, [id, navigate]);

  return (
    <div className="page create">
      {fetchError && <p>{fetchError}</p>}
      {Supplier && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="OrderName">Order Name:</label>
          <input
            type="text"
            id="OrderName"
            value={OrderName}
            onChange={(e) => {
              const value = e.target.value;
              if (!/\d/.test(value) || value === "") {
                setOrderName(value);
                setFormError(null);
              } else {
                setFormError("Order Name cannot contain numbers");
              }
            }}
          />

          <label htmlFor="Date">Date:</label>
          <input
            type="date"
            id="Date"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label htmlFor="Status">Status:</label>
          <input
            type="text"
            id="Status"
            value={Status}
            onChange={(e) => {
              const value = e.target.value;
              if (!/\d/.test(value) || value === "") {
                setStatus(value);
                setFormError(null);
              } else {
                setFormError("Status cannot contain numbers");
              }
            }}
          />

          <label htmlFor="Notes">Notes:</label>
          <input
            type="text"
            id="Notes"
            value={Notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="droplist">
            <label htmlfor="supp"> Supplier Name: </label>
            <select
              name="supplier"
              id="supp"
              onChange={(e) => setSupplier_ID(e.target.value)}
              value={Supplier_ID}
            >
              <option label=" Please specify: "></option>
              {Supplier.map((supplier) => (
                <option value={supplier.ID}>{supplier.Name} </option>
              ))}
            </select>
          </div>

          <button style={{marginTop: '5px'}} className="add">Update Order Data</button>
          {formError && <p className="error">{formError}</p>}
        </form>
      )}
    </div>
  );
};
export default UpdateOrder;