import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const CreateProsthetic = () => {
  const navigate = useNavigate();

  const [ProstheticName, setProstheticName] = useState("");
  const [ProstheticType, setProstheticType] = useState("");
  const [ProstheticDescription, setProstheticDescription] = useState("");
  const [ProstheticMaterial, setProstheticMaterial] = useState("");
  const [ProstheticWeight, setProstheticWeight] = useState("");
  const [ProstheticWarranty, setProstheticWarranty] = useState("");
  const [ProstheticPrice, setProstheticPrice] = useState("");
  const [ProstheticSize, setProstheticSize] = useState("");
  const [Order_ID, setOrder_ID] = useState("");
  const [formError, setFormError] = useState(null);

  const [fetchError, setFetchError] = useState(null);
  const [Order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase.from("Order").select();

      if (error) {
        setOrder(null);
        setFetchError("Couldn't fetch the Order data");
        console.log(error);
      }
      if (data) {
        setOrder(data);
        setFetchError(null);
      }
    };
    fetchOrder();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!ProstheticName || !ProstheticType || !ProstheticDescription || !ProstheticMaterial 
        || !ProstheticWeight || !ProstheticWarranty || !ProstheticPrice || !ProstheticSize || !Order_ID) {
      setFormError("Please enter all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("Prosthetics")
      .insert([{ ProstheticName, ProstheticType, ProstheticDescription, ProstheticMaterial,
         ProstheticWeight, ProstheticWarranty, ProstheticPrice, ProstheticSize, Order_ID }]);

    if (error) {
      console.log(error);
      setFormError("Please enter all the fields correctly");
    }
    if (data) {
      console.log(data);
      setFormError(null);
    }

    navigate("/prosthetics");
  };

  return (
    <div className="page create">
      {fetchError && <p>{fetchError}</p>}
      {Order && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="ProstheticName">Prosthetic Name:</label>
          <input
            type="text"
            id="ProstheticName"
            value={ProstheticName}
            onChange={(e) => {
              const value = e.target.value;
              if (!/\d/.test(value) || value === "") {
                setProstheticName(value);
                setFormError(null);
              } else {
                setFormError("Prosthetic Name cannot contain numbers");
              }
            }}
          />

          <label htmlFor="ProstheticType">Prosthetic Type:</label>
          <input
            type="text"
            id="ProstheticType"
            value={ProstheticType}
            onChange={(e) => setProstheticType(e.target.value)}
          />

            <label htmlFor="ProstheticDescription">Prosthetic Description:</label>
            <input
                type="text"
                id="ProstheticDescription"
                value={ProstheticDescription}
                onChange={(e) => setProstheticDescription(e.target.value)}
            />

            <label htmlFor="ProstheticMaterial">Prosthetic Material:</label>
            <input
                type="text"
                id="ProstheticMaterial"
                value={ProstheticMaterial}
                onChange={(e) => setProstheticMaterial(e.target.value)}
            />

            <label htmlFor="ProstheticWeight">Prosthetic Weight (in KG):</label>
            <input
                type="number"
                id="ProstheticWeight"
                value={ProstheticWeight}
                onChange={(e) => setProstheticWeight(e.target.value)}
            />

            <label htmlFor="ProstheticWarranty">Prosthetic Warranty:</label>
            <input
                type="text"
                id="ProstheticWarranty"
                placeholder="# Years"
                maxLength={7}
                value={ProstheticWarranty}
                onChange={(e) => setProstheticWarranty(e.target.value)}
            />

            <label htmlFor="ProstheticPrice">Prosthetic Price (in EGP):</label>
            <input
                type="number"
                id="ProstheticPrice"
                value={ProstheticPrice}
                onChange={(e) => setProstheticPrice(e.target.value)}
            />

            <label htmlFor="ProstheticSize">Prosthetic Dimnesions:</label>
            <input
                type="text"
                id="ProstheticSize"
                placeholder="** cm x ** cm x ** cm"
                maxLength={20}
                value={ProstheticSize}
                onChange={(e) => setProstheticSize(e.target.value)}
            />

          <div className="droplist">
            <label htmlfor="ord"> Order ID: </label>
            <select
              name="order"
              id="ord"
              onChange={(e) => setOrder_ID(e.target.value)}
              value={Order_ID}
            >
              <option label=" Please specify: "></option>
              {Order.map((order) => (
                <option value={order.ID}>{order.ID} </option>
              ))}
            </select>
          </div>
          <button className="add">Add a Prosthetic</button>
          {formError && <p className="error">{formError}</p>}
        </form>
      )}
    </div>
  );
};

export default CreateProsthetic;