import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Operation = () => {
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [Operation, setOperation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOperation, setFilteredOperation] = useState(null);

  const fetchOperations = async () => {
    const { data, error } = await supabase.from("Operation").select();

    if (error) {
      setOperation(null);
      setFetchError("Couldn't fetch the operations data");
      console.log(error);
    }
    if (data) {
      setOperation(data);
      setFetchError(null);
    }
  };
  useEffect(() => {
    fetchOperations();
  }, []);

  useEffect(() => {
    if (Operation) {
      const filteredData = Operation.filter((op) =>
        op.OperationName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOperation(filteredData);
    }
  }, [searchTerm, Operation]);

  const handleCreateOperation = () => {
    navigate("/createOperation");
  };

  const handleDelete = async (operationID) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      await supabase.from("Operation").delete().eq("ID", operationID);
      fetchOperations();
    }
  };

  return (
    <div className="page home">
      <div className="createOperation">
        <h1 className="tablesubj">Operations Info</h1>
        <button className="createButton" onClick={handleCreateOperation}>
          Create New
        </button>
        <label id="searchLabel">
          <input
            style={{ textAlign: "center" }}
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      {fetchError && <p>{fetchError}</p>}
      {filteredOperation && Operation && (
        <table className="table">
          <thead>
            <tr>
              <th>Operation ID</th>
              <th>Name</th>
              <th>Room</th>
              <th>Date</th>
              <th>Time</th>
              <th>Notes</th>
              <th>Prosthetic ID</th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredOperation.map((operation) => (
              <tr key={operation.id}>
                <td>{operation.ID}</td>
                <td>{operation.OperationName}</td>
                <td>{operation.Room}</td>
                <td style={{whiteSpace: 'nowrap'}}>{operation.Date}</td>
                <td style={{textAlign:"right"}}>{operation.Time}</td>
                <td style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}}>{operation.Notes}</td>
                <td>{operation.Prosthetic_ID}</td>
                <td>{operation.Patient_ID}</td>
                <td>{operation.Doctor_ID}</td>

                <td className="buttons">
                  <Link to={"/operation" + operation.ID}>
                    <i className="material-icons">edit</i>
                  </Link>
                </td>
                <td className="buttons">
                  <i
                    className="material-icons"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(operation.ID)}
                  >
                    delete
                  </i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Operation;
/*

*/