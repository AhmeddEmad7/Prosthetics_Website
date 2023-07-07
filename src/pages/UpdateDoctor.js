import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import supabase from '../config/supabaseClient';

    const UpdateDoctor = () => {
    const { ID } = useParams()
    const navigate = useNavigate()
    const[successMessage, setSuccessMessage] = useState(null);
    const[FirstName, setFirstName] = useState('')
    const[LastName, setLastName] = useState('')
    const[Gender,setGender] = useState('')
    const[Schedule,setSchedule] = useState('')
    const[BirthDate,setBirthDate] = useState('')
    const[Speciality,setSpeciality] = useState('')
    const[Email, setEmail] = useState('')
    const[PhoneNumber, setPhoneNumber] = useState('')
    const[formError, setFormError] = useState(null)

    const handleSubmit = async(e) =>{
        e.preventDefault()

        if(!FirstName ||! LastName ||!Gender||!BirthDate ||!Schedule|| !Email || !PhoneNumber){
            setFormError('Please enter all the fields correctly')
            return
        }

        const {data, error} = await supabase
        .from('Doctor')
        .update({FirstName,LastName, Gender,BirthDate,Speciality, Schedule,Email,PhoneNumber})
        .eq("ID", ID)

        if(error){
            console.log(error)
            setFormError('Please enter all the fields correctly')
            setSuccessMessage(null);
        }
        if(data){
            console.log(data)
            setSuccessMessage('Doctor Updated successfully!')
            setFormError(null)
        }

        navigate('/doctor')
    }

    useEffect(() =>{
        const fetchDoctor = async() =>{
        const {data, error} = await supabase
        .from('Doctor')
        .select()
        .eq("ID", ID)
        .single()

        if(error){
            // navigate('/doctor', {replace: true})
        }

        if(data){
            setFirstName(data.FirstName)
            setLastName(data.LastName)
            setEmail(data.Email)
            setSchedule(data.Schedule)
            setBirthDate(data.BirthDate)
            setSpeciality(data.Speciality)
            setGender(data.Gender)
            setPhoneNumber('0' + data.PhoneNumber)
            console.log(data)
        }
        }

        fetchDoctor()
    }, [ID, navigate])

    

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="FirstName">FirstName:</label>
        <input 
          type="text" 
          id="FirstName"
          value={FirstName}
          onChange={(e) => {
            const value = e.target.value;
            if (!/\d/.test(value) || value === '') {
              setFirstName(value);
              setFormError(null);
            } else {
              setFormError('First name cannot contain numbers');
            }
          }}
        />

        <label htmlFor="LastName">LastName:</label>
        <input
          type="text"
          id="LastName"
          value={LastName}
          onChange={(e) => {
            const value = e.target.value;
            if (!/\d/.test(value) || value === '') {
              setLastName(value);
              setFormError(null);
            } else {
              setFormError('Last name cannot contain numbers');
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

         <label htmlFor="BirthDate">BirthDate:</label>
         <input 
                type="date"
                id="BirthDate"
                value={BirthDate}
                onChange={(e) =>setBirthDate(e.target.value)}
              />
         <label htmlFor="Speciality">Speciality:</label>
        <input 
          type="text"
          id="Speciality"
          value={Speciality}
          onChange={(e) => setSpeciality (e.target.value)}
        />

        <label htmlFor="Schedule">Schedule:</label>
        <input 
          type="text"
          id="Schedule"
          value={Schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <label htmlFor="Email">Email:</label>
        <input 
          type="email"
          id="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="Phone Number">Phone Number:</label>
        <input 
          type="text"
          id="phone"
          maxLength={11}
          pattern="\d{11}"
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button className="add">Update Doctor Data</button>

        {formError && <p className="error">{formError}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

      </form>
    </div>
  )
}

export default UpdateDoctor;