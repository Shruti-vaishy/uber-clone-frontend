import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import {CaptainDataContext} from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('') 
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [userData, setUserData] = useState({})


  const [vehicleColor,setVehicleColor] = useState('')
  const [vehiclePlate,setVehiclePlate] = useState('')
  const [vehicleCapacity,setVehicleCapacity] = useState('')
  const [vehicleType,setVehicleType] = useState('')


  const {captain , setCaptain} = React.useContext(CaptainDataContext)


  const submitHandler = async(e) => {
      e.preventDefault();
      const captainData = {
        fullname:{
          firstname: firstname,
          lastname: lastname
      }, 
      password: password,
      email: email,
      vehicle : {
        color : vehicleColor,
        plate : vehiclePlate,
        capacity : vehicleCapacity,
        vehicleType : vehicleType
      }}
      console.log(captainData);
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
      
      if(response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
      }
      
      
      setEmail('')
      setFirstname('')
      setLastname('')
      setPassword('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')

  }
     
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10' src= "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
      <form onSubmit={(e) => {
        submitHandler(e);
      }}>
        <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
        <div className='flex gap-4 mb-6'>
        <input 
  className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
  value={firstname}
  onChange={(e) => {
    setFirstname(e.target.value);
  }}
  required 
  type='text' 
  placeholder='First name'/>

<input 
  className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
  value={lastname}
  onChange={(e) => {
    setLastname(e.target.value);
  }}
  required 
  type='text' 
  placeholder='Last name'/>
  </div>

      <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
      <input 
      required 
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
      }}
      className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      type='email' 
      placeholder='email@example.com'/>

      <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
      <input 
      required type="password"
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
      }}
      className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      placeholder='password'/>
      <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
      <div>
        <input
        required
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type='text'
        placeholder='Vehicle Color'
        value={vehicleColor}
        onChange={(e) => {
          setVehicleColor(e.target.value)
        }}
        />
        <input
        required
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type='text'
        placeholder='Vehicle Plate'
        value={vehiclePlate}
        onChange={(e) => {
          setVehiclePlate(e.target.value)
        }}
        />
        <input
        required
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type='number'
        placeholder='Vehicle capacity'
        value={vehicleCapacity}
        onChange={(e) => {
          setVehicleCapacity(e.target.value)
        }}
        />
        <select 
        required
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'        placeholder='Vehicle capacity'
        value={vehicleType}
        onChange={(e) => {
          setVehicleType(e.target.value)
        }}
        >
          <option value ="" disabled> Select Vehicle Type</option>
          <option value= "car">Car</option>
          <option value= "auto">Auto</option>
          <option value= "moto">Moto</option>
        </select>
      </div>

      <button
        className='bg-[#111] text-white mb-3 font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      >Create Captain Account</button>

      </form>

      <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link> </p>
  </div>
  <div>


  <p className='text-[10px] mt-6 leading-tight'>
             This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span>
             and <span className='underline'>Terms of Service apply</span>
        </p>

      </div>
    </div>
  )
}

export default CaptainSignup
