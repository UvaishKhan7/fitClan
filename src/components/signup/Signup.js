import React, { useEffect, useState } from 'react';
import './signup.css';
import { serverTimestamp } from 'firebase/firestore';
import { UserAuth } from '../../UserAuthContext';
import { useNavigate } from 'react-router';


export default function Signup() {
    const { signUp, error, currentUser } = UserAuth();
    const [err, setErr] = useState('');
    const [backError, setBackError] = useState('')
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        weight: '',
        gender: '',
        height: '',
        activityLevel: '',
        meals: '',
        timestamp: serverTimestamp()
    })

    useEffect(() => {
        if (error) {
            setInterval(() => {
                setBackError('')
            }, 3000)
            setBackError(error)
        }
    }, [error, currentUser])

    const userHandler = (e) => {
        const { name, value } = e.target;
        setUser((pre) => ({ ...pre, [name]: value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword, username, gender, dob, weight, height, meals, activityLevel, timestamp } = user
        if (email === '' || password === '' || confirmPassword === '' || username === '' || gender === '' || weight === '' || height === '' || dob === '' || meals === '' || activityLevel === '' || timestamp === '') {
            setInterval(() => {
                setErr("")
            }, 5000)
            return setErr("Please fill all fields.")
        }
        else if (password !== confirmPassword) {
            setInterval(() => {
                setErr("")
            }, 5000)
            return setErr("Password does not match")
        }
        else if (!password.length >= 6 || !confirmPassword.length >= 6) {
            setInterval(() => {
                setErr("")
            }, 5000)
            return setErr("Password must be 6 characters or more!")
        }
        else {
            signUp(email, password, username, dob, weight, height, dob, meals, activityLevel, timestamp)
            currentUser && setUser({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                dob: '',
                weight: '',
                gender: '',
                height: '',
                activityLevel: '',
                meals: '',
                timestamp: serverTimestamp()
            })
        }
        alert(`Hey ${user.username}! Your Profile created successfully!`)
        navigate('/')
    }

    return (
        <div className='signup'>
            {
                err ? (
                    err && <p className="error">{err}</p>
                ) : (
                    backError && <p className="error">{backError}</p>
                )
            }
            <form onSubmit={submitHandler} className='signup_form'>
                <h3 className='signup_title'>SIGN UP</h3>
                <div className="input_field">
                    <input type="text" name="username" className="input" placeholder='Enter your full name' value={user.username} onChange={userHandler} id="username" />
                </div>
                <div className="input_field">
                    <input type="email" name="email" className="input" placeholder='Enter your email' value={user.email} onChange={userHandler} id="emailid" />
                </div>
                <div className="input_field_nested">
                    <input type="password" name="password" className="input" placeholder='Enter your password' value={user.password} onChange={userHandler} id="password" />
                    <input type="password" name="confirmPassword" className="input" placeholder='Confirm Password' value={user.confirmPassword} onChange={userHandler} id="confirmPassword" />
                </div>
                <div className="input_field_nested">
                    <input type="number" name="weight" className="input" placeholder='Your weight in kg' value={user.weight} onChange={userHandler} id="weight" />
                    <input type="number" name="height" className="input" placeholder='Your height in cms' value={user.height} onChange={userHandler} id="height" />
                </div>
                <div className="input_field_nested">
                    <input type="number" name="meals" className="input" placeholder='Meals Consume per day' value={user.meals} onChange={userHandler} id="meals" />
                    <select name="activityLevel" className="select-input input" value={user.activityLevel} onChange={userHandler} id="activityLevel">
                        <option className="option" value="0">Your daily activity level:</option>
                        <option className="option" value="se">Sedentary</option>
                        <option className="option" value="la">Light Active</option>
                        <option className="option" value="ma">Moderately Active</option>
                        <option className="option" value="va">Very Active</option>
                    </select>
                </div>
                <div className="input_field_nested">
                    <input type="date" className="input" name="dob" value={user.dob} onChange={userHandler} id="dob" />
                    <select name="gender" className="select-input input" value={user.gender} onChange={userHandler} id="gender">
                        <option className="option" value="0">Select Gender:</option>
                        <option className="option" value="male">Male</option>
                        <option className="option" value="female">Female</option>
                    </select>
                </div>
                <div className="input_field">
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}
