import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import supabase from "../config/supabaseClient"

const UpdatePatient = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const[FirstName, setFirstName] = useState('')
  const[LastName, setLastName] = useState('')
  const[PhoneNumber, setPhoneNumber] = useState('')
  const[Email, setEmail] = useState('')
  const[Address, setAddress] = useState('')
  const[Gender, setGender] = useState('')
  const[BirthDate, setBirthDate] = useState('')
  const[formError, setFormError] = useState(null)

  const handleSubmit = async(e) =>{
      e.preventDefault()

      if(!FirstName || !LastName || !Gender ||!Address || !Email || !PhoneNumber || !BirthDate){
        setFormError('Please enter all the fields correctly')
        return
      }

      const {data, error} = await supabase
      .from('Patient')
      .update({FirstName, LastName, Address, Email, PhoneNumber, Gender, BirthDate})
      .eq("ID", id)

      if(error){
        console.log(error)
        setFormError('Please enter all the fields correctly')
      }

      if(data){
        console.log(data)
        setFormError(null)
      }

      navigate('/patient')
  }

  useEffect(() =>{
    const fetchPatient = async() =>{
      const {data, error} = await supabase
      .from('Patient')
      .select()
      .eq("ID", id)
      .single()

      if(error){
        navigate('/patient', {replace: true})
      }

      if(data){
        setFirstName(data.FirstName)
        setLastName(data.LastName)
        setPhoneNumber('0'+ data.PhoneNumber)
        setEmail(data.Email)
        setAddress(data.Address)
        setGender(data.Gender)
        setBirthDate(data.BirthDate)
        console.log(data)
      }
    }

    fetchPatient()
  }, [id, navigate])

  

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="FirstName"> First Name:</label>
        <input 
          type="text" 
          id="FirstName"
          value={FirstName}
          onChange={(e) => {
            const value = e.target.value;
              if (!/\d/.test(value) || value === "") {
                setFirstName(value);
                setFormError(null);
              } else {
                setFormError("First Name cannot contain numbers");
              }
          }}
        />
        <label htmlFor="LName">Last Name:</label>
        <input 
          type="text" 
          id="lname"
          value={LastName}
          onChange={(e) => {
            const value = e.target.value;
              if (!/\d/.test(value) || value === "") {
                setLastName(value);
                setFormError(null);
              } else {
                setFormError("Last Name cannot contain numbers");
              }
          }}
        />

        <label htmlFor="Gender">Gender:</label>
            <div className="droplist">
            <select
              id="Gender"
              value={Gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            </div>
            
        <label htmlFor="Phone Number">Phone Number:</label>
        <input 
          type="text"
          id="phone"
          maxLength={11}
          pattern="\d{11}"
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        
        <label htmlFor="Email">Email:</label>
        <input 
          type="text"
          id="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="birthdate">Patient Birth Date:</label>
        <input
          type="date"
          id="p.birthdate"
          value={BirthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        

        <label htmlFor="Address">Address:</label>
        <input
          type="text"
          id="address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />




        <button className="add">Update Patient Data</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default UpdatePatient