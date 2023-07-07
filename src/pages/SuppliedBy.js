import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"


const SuppliedBy = () => {

  const[fetchError, setFetchError] = useState(null)
  const[SuppliedBy, setSuppliedBy] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliedBy, setFilteredSuppliedBy] = useState(null);
  
  const navigate = useNavigate();

  
  const fetchSuppliedBy = async() =>{
    const {data, error} = await supabase.from("Supplied_By")
    .select()

    if(error){
      setSuppliedBy(null)
      setFetchError("Couldn't fetch the Suppliers data")
      console.log(error)
    }
    if(data){
      setSuppliedBy(data)
      setFetchError(null)
      console.log(data)
    }
  }
  useEffect(() => { 
    fetchSuppliedBy()
  }, [])

  useEffect(() => {
    if (SuppliedBy) {
      const filteredData = SuppliedBy.filter((op) =>
      `${op.Supplier_Name} ${op.Prosthetic_Name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuppliedBy(filteredData);
    }
  }, [searchTerm, SuppliedBy]);

  const handleCreateSuppliedBy = () => {
    navigate("/createsuppliedby");
  };

  const handleDelete = async (SuppliedByID) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      await supabase.from('Supplied_By').delete().eq('ID', SuppliedByID);
      fetchSuppliedBy(); 
    }
  };

  return (
    <div className="page suppliedby">
      <div className="createSuppliedBy">
        <h1 className="tablesubj">
          Supplied By Info
          </h1>
        <button className="createButton" onClick={handleCreateSuppliedBy}>
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
      {filteredSuppliedBy && SuppliedBy && (
        <table className="table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Supplier ID</th>
            <th>Prosthetic ID</th>
            <th>Supplier Name</th>
            <th>Prosthetic Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {filteredSuppliedBy.map(row => (
            <tr key={row.ID}>
              {/* <td>{row.ID}</td> */}
              <td>{row.Supplier_ID}</td>
              <td>{row.Prosthetic_ID}</td>
              <td>{row.Supplier_Name}</td>
              <td>{row.Prosthetic_Name}</td>
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

export default SuppliedBy;