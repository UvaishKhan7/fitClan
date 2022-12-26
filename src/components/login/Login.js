import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../UserAuthContext';
import './login.css';
import FitClan from '../../assets/logo.png';

export default function Login() {

    const { signIn, error, currentUser } = UserAuth();
    const navigate = useNavigate();

    const [errors, setError] = useState('');
    const [backError, setBackError] = useState('');
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (error) {
            setInterval(() => {
                setBackError('')
            }, 3000)
            setBackError(error)
        }
    }, [error, currentUser])

    const userHandler = async (e) => {
        const { name, value } = e.target;
        setUser((pre) => ({ ...pre, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = user
        if (email === '' || password === '') {
            setInterval(() => {
                setError('')
            }, 5000)
            return setError('Please fill all the fields!')
        }
        try {
            await signIn(email, password)
            navigate('/')
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                setInterval(() => { 
                    setError('')
                }, 5000)
                return setError('User not found!')
            } else if (err.code === 'auth/wrong-password') {
                setInterval(() => {
                    setError('')
                }, 5000)
                return setError(`${err.message}`)
            }
        }
    }

    return (
        <div className='login'>
            {
                errors ? (
                    errors && <p className='error'>{errors}</p>
                ) : (
                    backError && <p className='error'>{backError}</p>
                )
            }
            <div className="login_container">
                <img src={FitClan} alt="" />
                <hr />
                <div className="wrapper">
                    <h3>Sign in to Fit-Clan</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='d-flex flex-column my-3'>
                            <label className='text-left'>Email Address</label>
                            <input name='email' value={user.email} onChange={userHandler} type='email' placeholder='johndoe@abc.com' id='emailid' />
                        </div>
                        <div className='d-flex flex-column my-3'>
                            <label className='text-left'>Password</label>
                            <input name='password' value={user.password} onChange={userHandler} type='password' placeholder='******' id='password' />
                        </div>
                        <button type='button submit' className='btn btn-primary w-100 my-3'>
                            Sign In
                        </button>
                    </form>
                    <p className='text-center'>Don't have an account? <Link to="/signup"><u>Sign up</u></Link></p>
                </div>
            </div>
        </div>
    )
};