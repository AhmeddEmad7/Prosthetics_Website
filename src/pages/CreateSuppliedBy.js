import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";


const CreateSuppliedBy = () => {
  const navigate = useNavigate();  
  const [Supplier, setSupplier] = useState("");
  const [Prosthetics, setProsthetics] = useState("");
  const [Supplier_ID, setSupplier_ID] = useState("");
  const [Prosthetic_ID, setProsthetic_ID] = useState("");
  const [Supplier_Name, setSupplier_Name] = useState("");
  const [Prosthetic_Name, setProsthetic_Name] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [formError, setFormError] = useState(null);
  
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

  useEffect(() => {
  const fetchProsthetics= async () => {
       const { data, error } = await supabase.from("Prosthetics").select();
  
       if (error) {
         setProsthetics(null);
       setFetchError("Couldn't fetch the Prosthetics data");
         console.log(error);
       }
       if (data) {
         setProsthetics(data);
         setFetchError(null);
       }
     };
     fetchProsthetics();
   }, []); 


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Supplier_Name || !Prosthetic_Name ) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

   const { data, error } = await supabase
    .from("Supplied_By")
    .insert([{Supplier_ID, Prosthetic_ID, Supplier_Name, Prosthetic_Name }]);

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
    }
    if (data) {
      console.log(data);
      setFormError(null);
    }
    navigate("/suppliedby");
  }; 


  return (
       <div className="page create">
          {fetchError && <p>{fetchError}</p>}
          {Supplier && Prosthetics && (
            <form onSubmit={handleSubmit}>
               <div className="droplist">
                 <label htmlfor="supp"> Supplier Name: </label>
                 <select
                  name="supp"
                  id="supp"
                  // value={Supplier_Name}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const [name, id] = selectedValue.split(':');
                    setSupplier_Name(name);
                    setSupplier_ID(id);
                  }}
                >
                  <option label=" Please specify: "></option>
                  {Supplier.map((supplier) => (
                    <option value={`${supplier.Name}:${supplier.ID}`}>
                      {supplier.Name}
                    </option>
                  ))}
                </select>

                </div>
              <div className="droplist">
                <label htmlfor="pros"> Prosthetic Name: </label>
                <select
                  name="prosthetic"
                  id="p"
                  // value={Prosthetic_Name}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const [name, id] = selectedValue.split(':');
                    setProsthetic_Name(name);
                    setProsthetic_ID(id);
                  }}
                >
                  <option label=" Please specify: "></option>
                  {Prosthetics.map((prosthetic) => (
                    <option value={`${prosthetic.ProstheticName}:${prosthetic.ID}`}>
                      {prosthetic.ProstheticName}
                    </option>
                  ))}
                </select>
              </div> 
              <button className="add">Create Relation</button>
              {formError && <p className="error">{formError}</p>}
            </form>
          )};
        </div> 
  )
}

export default CreateSuppliedBy;













