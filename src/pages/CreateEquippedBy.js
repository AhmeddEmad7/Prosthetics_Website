import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";


const CreateEquippedBy = () => {
  const navigate = useNavigate();  
  const [Patient, setPatient] = useState("");
  const [Prosthetics, setProsthetics] = useState("");

  const [Patient_ID, setPatient_ID] = useState("");
  const [Prosthetic_ID, setProsthetic_ID] = useState("");
  const [Patient_FName, setPatient_FName] = useState("");
  const [Patient_LName, setPatient_LName] = useState("");
  const [Prosthetic_Name, setProsthetic_Name] = useState("");
  const [Prosthetic_Dimensions, setProsthetic_Dimensions] = useState("");
  const [EquippingReason, setEquippingReason] = useState("");
  const [Maintenance, setMaintenance] = useState("");
  const [EquippingNotes, setEquippingNotes] = useState("");

  const [fetchError, setFetchError] = useState(null);
  const [formError, setFormError] = useState(null);
  
  useEffect(() => {
    const fetchPatient = async () => {
      const { data, error } = await supabase.from("Patient").select();
  
      if (error) {
        setPatient(null);
        setFetchError("Couldn't fetch the Patients data");
        console.log(error);
      }
      if (data) {
        setPatient(data);
        setFetchError(null);
      }
    };
    fetchPatient();
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

    const handleProstheticChange = (e) => {
        const selectedValue = e.target.value;
        const [name, id] = selectedValue.split(":");
        setProsthetic_Name(name);
        setProsthetic_ID(id);

        const selectedProsthetic = Prosthetics.find(
        (prosthetic) => prosthetic.ProstheticName === name
        );
        if (selectedProsthetic) {
        setProsthetic_Dimensions(selectedProsthetic.ProstheticSize);
        }
    };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Patient_FName || !Patient_LName || !Prosthetic_Name || !EquippingReason || !Maintenance) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

   const { data, error } = await supabase
    .from("Equipped_By")
    .insert([{Patient_ID, Prosthetic_ID, Patient_FName, Patient_LName, Prosthetic_Name, Prosthetic_Dimensions,
     EquippingReason, Maintenance, EquippingNotes}]);

    setProsthetic_Dimensions()

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
    }
    if (data) {
      console.log(data);
      setFormError(null);
    }
    navigate("/equippedby");

  }; 


  return (
       <div className="page create">
          {fetchError && <p>{fetchError}</p>}
          {Patient && Prosthetics && (
            <form onSubmit={handleSubmit}>
               <div className="droplist">
                 <label htmlfor="patientt">Patient Name:</label>
                 <select
                  name="patientt"
                  id="patientt"
                  // value={Supplier_Name}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const [name, id] = selectedValue.split(':');
                    const [firstName, lastName] = name.split(' ');
                    setPatient_FName(firstName);
                    setPatient_LName(lastName);
                    setPatient_ID(id);
                  }}
                >
                  <option label=" Please specify"></option>
                  {Patient.map((patient) => (
                    <option value={`${patient.FirstName} ${patient.LastName}:${patient.ID}`}>
                      {patient.FirstName}
                      {' ' + patient.LastName}
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
                  onChange={handleProstheticChange} 
                >
                  <option label=" Please specify"></option>
                  {Prosthetics.map((prosthetic) => (
                    <option value={`${prosthetic.ProstheticName}:${prosthetic.ID}`}>
                      {prosthetic.ProstheticName}
                    </option>
                  ))}
                </select>
              </div>

                <label htmlFor="Reason">Equipping Reason:</label>
                <input
                type="text"
                id="reason"
                value={EquippingReason}
                onChange={(e) => setEquippingReason(e.target.value)}
                />

                <label htmlFor="Maintenance">Requires Maintenance:</label>
                <input
                type="text"
                id="duration"
                placeholder="Yes / No"
                maxLength={3}
                value={Maintenance}
                onChange={(e) => {
                    const value = e.target.value;
                    setMaintenance(value);
                    if (value !== 'Yes' && value !== 'No') {
                      setFormError('Maintenance can only contain Yes or No');
                    } else {
                      setFormError(null);
                    }
                  }}                  
                />

                <label htmlFor="Specifications">Specifications:</label>
                <input
                type="text"
                id="specs"
                value={EquippingNotes}
                onChange={(e) => setEquippingNotes(e.target.value)}
                />

              <button className="add">Create Relation</button>
              {formError && <p className="error">{formError}</p>}
            </form>
          )};
        </div> 
  )
}

export default CreateEquippedBy;













