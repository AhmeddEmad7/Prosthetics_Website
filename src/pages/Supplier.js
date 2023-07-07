import supabase from "../config/supabaseClient"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Supplier = () => {
  
  const[fetchError, setFetchError] = useState(null)
  const[Supplier, setSupplier] = useState(null)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSupplier, setFilteredSupplier] = useState(null);
  
  const fetchSuppliers = async() =>{
    const {data, error} = await supabase
    .from('Supplier')
    .select()

    if(error){
      setSupplier(null)
      setFetchError("Couldn't fetch the Suppliers data")
      console.log(error)
    }
    if(data){
      setSupplier(data)
      setFetchError(null)
    }
  } 
  
  useEffect(() => {
    fetchSuppliers()
  }, [])

  useEffect(() => {
    if (Supplier) {
      const filteredData = Supplier.filter((op) =>
        op.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSupplier(filteredData);
    }
  }, [searchTerm, Supplier]);

  const handleCreateSupplier = () => {
    navigate("/createsupplier");
  };

  const handleDelete = async (supplierID) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      await supabase.from('Supplier').delete().eq('ID', supplierID);
      fetchSuppliers(); // Fetch the updated supplier data after deletion
    }
  };

  return (
    <div className="page home">
      <div className="createSupplier">
        <h1 className="tablesubj">Suppliers Info</h1>
        <button className="createButton" onClick={handleCreateSupplier}>
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
      {filteredSupplier && Supplier && (
        <table className="table">
        <thead>
          <tr>
            <th>Supplier ID</th>
            <th>Supplier Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredSupplier.map(supplier => (
            <tr key={supplier.id}>
              <td>{supplier.ID}</td>
              <td>{supplier.Name}</td>
              <td>{supplier.Email}</td>
              <td>{supplier.Address}</td>
              <td>{'0' + supplier.PhoneNumber}</td>
              <td className="buttons">
                <Link to={'/supplier' + supplier.ID}>
                  <i className="material-icons">edit</i>
                </Link>
              </td>
              <td className="buttons">
                  <i 
                    className="material-icons"style={{cursor: "pointer"}} onClick={() => handleDelete(supplier.ID)
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

export default Supplier