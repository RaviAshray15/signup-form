import { React, useState } from 'react'
import './Form.css'
import axios from 'axios'

function Form() {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (data.password !== data.confirmPassword) {
            alert("Passwords aren't matching")
            return
        }

        const { confirmPassword, ...payload } = data // remove confirmPassword before sending
        axios.post('https://signup-4a572-default-rtdb.firebaseio.com/form.json', payload)
            .then(() => alert("Form submitted successfully!!"))
            .catch(err => console.error(err))

        setData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }

    const getData = e => {
        e.preventDefault()
        axios.get('https://signup-4a572-default-rtdb.firebaseio.com/form.json')
            .then((response) => {
                console.log(response.data)
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <div className='body'>
                <div className='container'>
                    <h1 style={{ textAlign: 'center' }}>Sign Up Form</h1>
                    Enter your name: <br />
                    <input type="text" name='username' placeholder='Name' onChange={handleChange} /> <br /><br />
                    Enter your mail: <br />
                    <input type="email" name='email' placeholder='Mail' onChange={handleChange} /> <br /><br />
                    Enter your Password: <br />
                    <input type="password" name='password' placeholder='Password' onChange={handleChange} /> <br /><br />
                    Re-enter your Password: <br />
                    <input type="password" name='confirmPassword' placeholder='Password' onChange={handleChange} /> <br /><br />
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={handleSubmit}>Submit</button>
                        <button className='get-data' onClick={getData}>Get Data</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form
