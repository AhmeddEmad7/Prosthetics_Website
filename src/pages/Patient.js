import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"



const Patient = () => {
  const [fetchError, setFetchError] = useState(null)
  const [Patient, setPatient] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatient, setFilteredPatient] = useState(null);
  
  const navigate = useNavigate();

  const fetchPatient = async() =>{
    const {data, error} = await supabase.from('Patient')
    .select()

    if(error){
      setPatient(null)
      setFetchError("Couldn't fetch the Patient data")
      console.log(error)
    }
    if(data){
      setPatient(data)
      setFetchError(null)
    }
  }

  useEffect(() => {
    fetchPatient()
  }, [])

  useEffect(() => {
    if (Patient) {
      const filteredData = Patient.filter((op) =>
      `${op.FirstName} ${op.LastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPatient(filteredData);
    }
  }, [searchTerm, Patient]);

  const handleCreatePatient = () => {
    navigate("/createpatient");
  };

  const handleDelete = async (patientID) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      await supabase.from('Patient').delete().eq('ID', patientID);
      fetchPatient(); // Fetch the updated patient data after deletion
    }
  };

  return (
    <div className="page Home">
      <div className="createPatient">
        <h1 className="tablesubj">Patients Info</h1>
        <button className="createButton" onClick={handleCreatePatient}>
          Create New
        </button>
        <label id="searchLabel">
          <input
            type="text"
            style = {{textAlign:"center"}}
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      {fetchError && <p>{fetchError}</p>}
      {filteredPatient && Patient && (
        <table className="table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Birth Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatient.map(patient => (
            <tr key={patient.ID}>
              <td>{patient.ID}</td>
              <td>{patient.FirstName}</td>
              <td>{patient.LastName}</td>
              <td>{'0' + patient.PhoneNumber}</td>
              <td>{patient.Email}</td>
              <td>{patient.Address}</td>
              <td>{patient.Gender}</td>
              <td>{patient.BirthDate}</td>

              <td className="buttons">
                <Link to={'/patient' + patient.ID}>
                  <i className="material-icons">
                    edit 
                    </i>
                </Link>
              </td>
              <td className="buttons">
                <i className="material-icons" style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(patient.ID)}>
                  delete
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  )
}


export default Patient;