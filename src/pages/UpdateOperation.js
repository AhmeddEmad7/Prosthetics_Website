import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";

const UpdateOperation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [OperationName, setOperationName] = useState("");
  const [Room, setRoom] = useState("");
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [Notes, setNotes] = useState("");
  const [Patient_ID, setPatient_ID] = useState("");
  const [Doctor_ID, setDoctor_ID] = useState("");
  const [Prosthetic_ID, setProsthetic_ID] = useState("");
  const [formError, setFormError] = useState(null);

  const [fetchError, setFetchError] = useState(null);
  const [Patient, setPatient] = useState(null);
  const [Doctor, setDoctor] = useState(null);
  const [Prosthetics, setProsthetics] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const { data, error } = await supabase.from("Patient").select();

      if (error) {
        setPatient(null);
        setFetchError("Couldn't fetch the Patient data");
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
    const fetchDoctor = async () => {
      const { data, error } = await supabase.from("Doctor").select();

      if (error) {
        setDoctor(null);
        setFetchError("Couldn't fetch the Doctor data");
        console.log(error);
      }
      if (data) {
        setDoctor(data);
        setFetchError(null);
      }
    };
    fetchDoctor();
  }, []);

  useEffect(() => {
    const fetchProsthetics = async () => {
      const { data, error } = await supabase.from("Prosthetics").select();

      if (error) {
        setProsthetics(null);
        setFetchError("Couldn't fetch the Prosthetic data");
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

    if (
      !OperationName ||
      !Room ||
      !Date ||
      !Time ||
      !Prosthetic_ID ||
      !Patient_ID ||
      !Doctor_ID
    ) {
      setFormError("Please enter all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("Operation")
      .update({
        OperationName,
        Room,
        Date,
        Time,
        Notes,
        Prosthetic_ID,
        Patient_ID,
        Doctor_ID,
      })
      .eq("ID", id);

    if (error) {
      console.log(error);
      setFormError("Please enter all the fields correctly");
    }
    if (data) {
      console.log(data);
      setFormError(null);
    }
    navigate("/operation");
  };

  useEffect(() => {
    const fetchOperations = async () => {
      const { data, error } = await supabase
        .from("Operation")
        .select()
        .eq("ID", id)
        .single();

      if (error) {
        navigate("/operation", { replace: true });
      }

      if (data) {
        setOperationName(data.OperationName);
        setRoom(data.Room);
        setDate(data.Date);
        setTime(data.Time);
        setNotes(data.Notes);
        setProsthetic_ID(data.Prosthetic_ID);
        setPatient_ID(data.Patient_ID);
        setDoctor_ID(data.Doctor_ID);
      }
    };

    fetchOperations();
  }, [id, navigate]);

  return (
    <div className="page update">
      {fetchError && <p>{fetchError}</p>}
      {Prosthetics && Doctor && Patient && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="OperationName">Operation Name:</label>
          <input
            type="text"
            id="OperationName"
            value={OperationName}
            onChange={(e) => {
              const value = e.target.value;
              if (!/\d/.test(value) || value === "") {
                setOperationName(value);
                setFormError(null);
              } else {
                setFormError("Operation Name cannot contain numbers");
              }
            }}
          />

          <label htmlFor="Room">Room:</label>
          <input
            type="text"
            id="room"
            value={Room}
            onChange={(e) => setRoom(e.target.value)}
          />

          <label htmlFor="Date">Date:</label>
          <input
            type="date"
            id="date"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label htmlFor="Time">Time:</label>
          <input
            type="time"
            id="time"
            value={Time}
            onChange={(e) => setTime(e.target.value)}
          />

          <label htmlFor="Notes">Notes:</label>
          <input
            type="text"
            id="notes"
            value={Notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="droplist">
            <label htmlfor="pat"> Patient Name: </label>
            <select
              name="patient"
              id="pat"
              onChange={(e) => setPatient_ID(e.target.value)}
              value={Patient_ID}
            >
              <option label=" Please specify: "></option>
              {Patient.map((patient) => (
                <option value={patient.ID}>{patient.FirstName} {patient.LastName}</option>
              ))}
            </select>
          </div>
          <div className="droplist">
            <label htmlFor="doc"> Doctor Name: </label>
            <select
              name="doctor"
              id="doc"
              onChange={(e) => setDoctor_ID(e.target.value)}
              value={Doctor_ID}
            >
              <option label=" Please specify: "></option>
              {Doctor.map((doctor) => (
                <option value={doctor.ID}>{doctor.FirstName} {doctor.LastName} </option>
              ))}
            </select>
          </div>

          <div className="droplist">
            <label htmlFor="proth"> Prosthetic Name: </label>
            <select
              name="prosthetic"
              id="proth"
              style={{marginBottom: "16px"}}
              onChange={(e) => setProsthetic_ID(e.target.value)}
              value={Prosthetic_ID}
            >
              <option label=" Please specify: "></option>
              {Prosthetics.map((prosthetics) => (
                <option value={prosthetics.ID}>
                  {prosthetics.ProstheticName}
                </option>
              ))}
            </select>
          </div>

          <button className="add">Update Operation Data</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      )}
    </div>
  );
};
export default UpdateOperation;