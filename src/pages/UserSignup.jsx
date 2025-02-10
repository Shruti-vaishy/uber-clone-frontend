import React, { useContext, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios';
import {UserDataContext} from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('') 
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [userData, setUserData] = useState({})

  
  const navigate = useNavigate(); 
  const {user,setUser} = useContext(UserDataContext)

  const submitHandler = async (e) => {
      e.preventDefault()
      
      const newUser = {
        fullname:{
            firstname: firstname,
            lastname: lastname
        }, 
        email: email,
        password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    if(response.status === 201){
      const data = response.data;
      setUser(data.user)
      localStorage.setItem('token',data.token);
      navigate('/home')
    }

      setEmail('')
      setPassword('')
      setFirstname('')
      setLastname('')
  }
     
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10' src= "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
      <form onSubmit={(e) => {
        submitHandler(e);
      }}>
        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
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

      <h3 className='text-lg font-medium mb-2'>What's your email</h3>
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

      <button className='bg-[#111] text-white mb-3 font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      >Create Account</button>

      </form>

      <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link> </p>
  </div>
  <div>


      <p className='text-[10px] leading-tight'>
        By proceeding, you consent to get calls,
        WhatsApp or SMS messages, including by automated means, 
        from Uber and its affiliates to the number provided.
    </p>

      </div>
    </div>
  )
}

export default UserSignup
