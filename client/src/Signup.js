import React, { useState } from 'react'

function Signup() {
  const [data, setData] = useState({
    username: '',
    email: '',
  })
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(e){
    let name = e.target.name 
    let value = e.target.value 
    setData({...data, [name]: value})
  }

  // POST user data
  function handleSubmit(e){
    e.preventDefault()
    fetch('http://localhost:3000/users',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res=>{
        if(res.ok){
            res.json().then(user=>{
                setMessage(user.message)
                setSuccess(true)
            })
        }else{
            res.json().then(err=>setErrors(err.errors))
        }
    })
  }
  return (
    <div style={{width: "300px", marginLeft: "auto", marginRight: "auto"}}>
        <h2>User Signup</h2>
        {success? <h3 style={{color: "green"}}>{message}</h3>:
        <div>
            {errors.map(err=><p key={err} style={{color: "red"}}>{err}</p>)}
        </div>}
        <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label> 
            <input type={'text'} id= "username" name='username' onChange={handleChange} /><br/>
            <label htmlFor='email'>Email:</label> 
            <input type={'text'} id= "email" name='email' onChange={handleChange}/><br/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Signup