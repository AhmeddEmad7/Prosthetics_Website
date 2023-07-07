import supabase from "../config/supabaseClient"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Prosthetic = () => {
  // console.log(supabase)
  const[fetchError, setFetchError] = useState(null)
  const[Prosthetics, setProsthetics] = useState(null)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProsthetic, setFilteredProsthetic] = useState(null);
  
  const fetchProsthetics = async() =>{
    const {data, error} = await supabase
    .from('Prosthetics')
    .select()

    if(error){
      setProsthetics(null)
      setFetchError("Couldn't fetch the Prosthetics data")
      console.log(error)
    }
    if(data){
      setProsthetics(data)
      setFetchError(null)
    }
  } 
  
  useEffect(() => {
    fetchProsthetics()
  }, [])

  useEffect(() => {
    if (Prosthetics) {
      const filteredData = Prosthetics.filter((op) =>
        op.ProstheticName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProsthetic(filteredData);
    }
  }, [searchTerm, Prosthetics]);

  const handleCreateProsthetics = () => {
    navigate("/createprosthetics");
  };

  const handleDelete = async (prostheticID) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      await supabase.from('Prosthetics').delete().eq('ID', prostheticID);
      fetchProsthetics(); // Fetch the updated supplier data after deletion
    }
  };

  return (
    <div className="page home">
      <div className="createProsthetic">
        <h1 className="tablesubj">Prosthetics Info</h1>
        <button className="createButton" onClick={handleCreateProsthetics}>
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
      </div>
      {fetchError && (<p>{fetchError}</p>)}
      {filteredProsthetic && Prosthetics && (
        <table className="table">
        <thead>
        <tr>
            <th>Prosthetic ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Material</th>
            <th>Weight</th>
            <th>Warranty</th>
            <th>Price</th>
            <th>Dimensions</th>
            <th>Order ID</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {filteredProsthetic.map(prosthetic => (
            <tr key={prosthetic.id}>
              <td>{prosthetic.ID}</td>
              <td>{prosthetic.ProstheticName}</td>
              <td>{prosthetic.ProstheticType}</td>
              <td style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}}>{prosthetic.ProstheticDescription}</td>
              <td>{prosthetic.ProstheticMaterial}</td>
              <td>{prosthetic.ProstheticWeight + ' KG'}</td>
              <td style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}}>{prosthetic.ProstheticWarranty}</td>
              <td style={{whiteSpace: "nowrap"}}>{prosthetic.ProstheticPrice + ' EGP'}</td>
              <td style={{textAlign: "center"}}>{prosthetic.ProstheticSize}</td>
              <td>{prosthetic.Order_ID}</td>
              <td className="buttons">
                <Link to={'/prosthetics' + prosthetic.ID}>
                  <i className="material-icons">edit</i>
                </Link>
              </td>
              <td className="buttons">
                  <i 
                    className="material-icons"style={{cursor: "pointer"}} onClick={() => handleDelete(prosthetic.ID)
                    }
                    >delete</i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      
    </div>
  )

  
}

export default Prosthetic