import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"


const EquippedBy = () => {

  const[fetchError, setFetchError] = useState(null)
  const[EquippedBy, setEquippedBy] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEquippedBy, setFilteredEquippedBy] = useState(null);
  
  const navigate = useNavigate();

  
  const fetchEquippedBy = async() =>{
    const {data, error} = await supabase.from("Equipped_By")
    .select()

    if(error){
      setEquippedBy(null)
      setFetchError("Couldn't fetch the Suppliers data")
      console.log(error)
    }
    if(data){
      setEquippedBy(data)
      setFetchError(null)
      console.log(data)
    }
  }
  useEffect(() => { 
    fetchEquippedBy()
  }, [])

  useEffect(() => {
    if (EquippedBy) {
      const filteredData = EquippedBy.filter((op) =>
      `${op.Patient_FName} ${op.Patient_LName} ${op.Prosthetic_Name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEquippedBy(filteredData);
    }
  }, [searchTerm, EquippedBy]);

  const handleCreateEquippedBy = () => {
    navigate("/createequippedby");
  };

  const handleDelete = async (EquippedByID) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      await supabase.from('Equipped_By').delete().eq('ID', EquippedByID);
      fetchEquippedBy(); 
    }
  };

  return (
    <div className="page equippedby">
      <div className="createEquippedBy">
        <h1 className="tablesubj">
          Equipped By Info
          </h1>
        <button className="createButton" onClick={handleCreateEquippedBy}>
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
      {fetchError && (<p>{fetchError}</p>)}
      {filteredEquippedBy && EquippedBy && (
        <table className="table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Patient ID</th>
            <th>Prosthetic ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Prosthetic Name</th>
            <th>Dimensions</th>
            <th style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}}>Requires Maintenance</th>
            <th style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}}>Equipping Reason</th>
            <th>Specifications</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {filteredEquippedBy.map(row => (
            <tr key={row.ID}>
              {/* <td>{row.ID}</td> */}
              <td>{row.Patient_ID}</td>
              <td>{row.Prosthetic_ID}</td>
              <td>{row.Patient_FName}</td>
              <td>{row.Patient_LName}</td>
              <td>{row.Prosthetic_Name}</td>
              <td>{row.Prosthetic_Dimensions}</td>
              <td>{row.Maintenance}</td>
              <td>{row.EquippingReason}</td>
              <td>{row.EquippingNotes}</td>
              <td className="buttons">
              <i className="material-icons" style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(row.ID)}>
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

export default EquippedBy;