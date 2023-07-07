import supabase from '../config/supabaseClient';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateDoctor from "./CreateDoctor";
import { Routes, Route } from "react-router-dom";

const Doctor = () => {
  // const { ID } = useParams();
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [Doctor, setDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctor, setFilteredDoctor] = useState(null);
  
  const fetchDoctors = async () => {
        const { data, error } = await supabase
          .from('Doctor')
          .select();

        if (error) {
          setDoctor(null);
          setFetchError("Couldn't fetch the Doctors data");
          console.log(error);
        }

        if (data) {
          setDoctor(data);
          setFetchError(null);
        }
    };
    useEffect(() => {
      fetchDoctors()
    }, [])
    
  const handleDelete = async (doctorID) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      await supabase.from('Doctor').delete().eq('ID', doctorID);
      fetchDoctors(); // Fetch the updated supplier data after deletion
    }
  };
  useEffect(() => {
    if (Doctor) {
      const filteredData = Doctor.filter((op) =>
      `${op.FirstName} ${op.LastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDoctor(filteredData);
    }
  }, [searchTerm, Doctor]);
  const handleCreateDoctor = () => {
    navigate("/createDoctor");
  };

  return (
    <div className="page home">
      <div className="createDoctor">
      <h1 className="tablesubj">Doctors Info</h1>
      <button className="createButton" onClick={handleCreateDoctor}>
          Create New
        </button>
        <label id="searchLabel">
          <input
            style={{textAlign: "center"}}
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <Routes>
          <Route path="/CreateDoctor" element={<CreateDoctor />} />
        </Routes>
      </div>
      {fetchError && (<p>{fetchError}</p>)}
      {filteredDoctor && Doctor && (
        <table className="table">
        <thead>
          <tr>
            <th >Doctor ID</th>
            <th >First Name</th>
            <th >Last Name</th>
            <th >Gender</th>
            <th >Birth Date</th>
            <th >Specialty</th>
            <th >Schedule</th>
            <th >Email</th>
            <th >Phone Number</th>
            <th >Edit</th>
            <th >Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctor.map(doctor => (
            <tr key={doctor.ID}>
              <td >{doctor.ID}</td>
              <td >{doctor.FirstName}</td>
              <td >{doctor.LastName}</td>
              <td >{doctor.Gender}</td>
              <td >{doctor.BirthDate}</td>
              <td >{doctor.Speciality}</td>
              <td >{doctor.Schedule}</td>
              <td >{doctor.Email}</td>
              <td >{'0'+doctor.PhoneNumber}</td>
              <td className="buttons">
                <Link to={'/doctor' + doctor.ID}>
                  <i className="material-icons">edit</i>
                </Link>
              </td>
              <td className="buttons">
                  <i 
                    className="material-icons"style={{cursor: "pointer"}} onClick={() => handleDelete(doctor.ID)
                    }
                    >delete</i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default Doctor;