import React, { useEffect, useState } from 'react';
import './signup.css';
import { UserAuth } from '../../UserAuthContext';
import { useNavigate } from 'react-router';
import FitClan from '../../assets/logo.png';

export default function Signup() {

    const { signUp, error, currentUser } = UserAuth();
    const navigate = useNavigate();

    const [err, setErr] = useState('');
    const [backError, setBackError] = useState('')
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        gender: '',
        age: '',
        weight: '',
        height: '',
        meals: '',
        activityLevel: ''
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
        const { email, password, confirmPassword, username, gender, age, weight, height, meals, activityLevel } = user
        if (email === '' || password === '' || confirmPassword === '' || username === '' || gender === '' || age === '' || weight === '' || height === '' || meals === '' || activityLevel === '') {
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
            signUp(email, password, username, gender, age, weight, height, meals, activityLevel)
            currentUser && setUser({
                email: '',
                password: '',
                confirmPassword: '',
                username: '',
                gender: '',
                age: '',
                weight: '',
                height: '',
                meals: '',
                activityLevel: ''
            })
        }
        navigate('/')
        window.location.reload();
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
            <div className="signupWrapp">
                <div className="imgWrap">
                    <img src={FitClan} alt="" />
                    <p>Your Personal Health Guide</p>
                </div>
                <hr />
                <form onSubmit={submitHandler} className='signup_form'>
                    <h3 className='signup_title'>Create New Account</h3>
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
                            <option className="option" value="1.2">Sedentary (little to no exersice)</option>
                            <option className="option" value="1.37">Light Active (1-3 days/week)</option>
                            <option className="option" value="1.55">Moderately Active (3-5 days/week)</option>
                            <option className="option" value="1.72">Very Active (6-7 days/week)</option>
                            <option className="option" value="1.94">Hyper Active (heavy lifting and physical jobs)</option>
                        </select>
                    </div>
                    <div className="input_field_nested">
                        <input type="number" placeholder='Enter Your Age in Years' maxLength={2} className="input" name="age" value={user.age} onChange={userHandler} id="age" />
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
        </div>
    )
}
