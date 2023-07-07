import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"


const CreatePatient = () => {
    const navigate = useNavigate()

    const[FirstName, setFirstName] = useState('')
    const[LastName, setLastName] = useState('')
    const[PhoneNumber, setPhoneNumber] = useState('')
    const[Email, setEmail] = useState('')
    const[Address, setAddress] = useState('')
    const[Gender, setGender] = useState('')
    const[BirthDate, setBirthDate] = useState('')
    const[formError, setFormError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

    if(!FirstName || !LastName || !Gender ||!Address || !Email || !PhoneNumber || !BirthDate){
      setFormError('Please enter all the fields correctly')
      return
    }

    const {data, error} = await supabase
    .from('Patient')
    .insert([{FirstName, LastName, PhoneNumber, Email, Address, Gender, BirthDate}])

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

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="FirstName">First Name:</label>
        <input 
          type="text" 
          id="name"
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="LastName">Last Name:</label>
        <input 
          type="text" 
          id="name"
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="Phone Number">Phone Number:</label>
        <input 
          type="text"
          id="phone"
          value={PhoneNumber}
          maxLength={11}
          pattern="\d{11}"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label htmlFor="Email">Email:</label>
        <input 
          type="email"
          id="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="BirthDate">Birth Date:</label>
        <input
          type="date"
          id="birthDate"
          value={BirthDate}
          onChange={(e) => setBirthDate(e.target.value)}
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

        <label htmlFor="Address">Address:</label>
        <input
          type="text"
          id="address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button className="add">Add a Patient</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePatient