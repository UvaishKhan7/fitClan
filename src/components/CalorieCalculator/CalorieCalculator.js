<<<<<<< HEAD
import React, { useState } from 'react';
import './CalorieCalculator.css'
const CalorieCalculator = ({ setnumberofMeals }) => {

    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(0);
    const [active, setActive] = useState('');
    const [bmi, setBmi] = useState(0);
    const [calorie, setCalorie] = useState(0);

    const CalculateCalories = (e) => {
        e.preventDefault()

        if (gender === 1) {
            setCalorie((66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age)) * active)
        } else {
            setCalorie((655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)) * active)
        }

        setBmi(weight / (height * height) * 10000)

        console.log('gender', gender, 'weight', weight, 'height', height, 'age', age, 'activity', active)


    }
    return (
        <div className='calorieCalculatorWrapper'>
            <form className='userInput' onSubmit={CalculateCalories}>
                <select onChange={(e) => setGender(e.target.value)}>
                    <option>--gender--</option>
                    <option value={1}>male</option>
                    <option value={2}>female</option>
                </select>
                <input placeholder='weight in kg' onChange={(e) => setWeight(e.target.value)}></input>
                <input placeholder='height in cm' onChange={(e) => setHeight(e.target.value)}></input>
                <input placeholder='age' onChange={(e) => setAge(e.target.value)}></input>
                <select onChange={(e) => setActive(e.target.value)}>
                    <option>--select activity</option>
                    <option value={1.2}>Not active (little to no exersice)</option>
                    <option value={1.375}>Lightly active (1-3 days/week)</option>
                    <option value={1.55}>Moderately active (3-5 days/week)</option>
                    <option value={1.725}>Very active (6-7 days/week)</option>
                    <option value={1.9}>Heavily active (heavy lifting and physical jobs)</option>
                </select>
                <select onChange={(e) => setnumberofMeals(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                </select>
                <button type='submit'>Calculate</button>
            </form>

            <div className='calories'>
                {!bmi ? null :
                    <>
                        <h3>Your BMI is {bmi.toFixed(1)}</h3>
                        <h3>Your daily calorie intake should be {calorie.toFixed(0)} kcal</h3>
                    </>
                }
            </div>
        </div>
    );
}

=======
import React, { useState } from 'react';
import './CalorieCalculator.css'
const CalorieCalculator = ({ setnumberofMeals }) => {

    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(0);
    const [active, setActive] = useState('');
    const [bmi, setBmi] = useState(0);
    const [calorie, setCalorie] = useState(0);

    const CalculateCalories = (e) => {
        e.preventDefault()

        if (gender === 1) {
            setCalorie((66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age)) * active)
        } else {
            setCalorie((655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)) * active)
        }

        setBmi(weight / (height * height) * 10000)

        console.log('gender', gender, 'weight', weight, 'height', height, 'age', age, 'activity', active)


    }
    return (
        <div className='calorieCalculatorWrapper'>
            <form className='userInput' onSubmit={CalculateCalories}>
                <select onChange={(e) => setGender(e.target.value)}>
                    <option>--gender--</option>
                    <option value={1}>male</option>
                    <option value={2}>female</option>
                </select>
                <input placeholder='weight in kg' onChange={(e) => setWeight(e.target.value)}></input>
                <input placeholder='height in cm' onChange={(e) => setHeight(e.target.value)}></input>
                <input placeholder='age' onChange={(e) => setAge(e.target.value)}></input>
                <select onChange={(e) => setActive(e.target.value)}>
                    <option>--select activity</option>
                    <option value={1.2}>Not active (little to no exersice)</option>
                    <option value={1.375}>Lightly active (1-3 days/week)</option>
                    <option value={1.55}>Moderately active (3-5 days/week)</option>
                    <option value={1.725}>Very active (6-7 days/week)</option>
                    <option value={1.9}>Heavily active (heavy lifting and physical jobs)</option>
                </select>
                <select onChange={(e) => setnumberofMeals(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                </select>
                <button type='submit'>Calculate</button>
            </form>

            <div className='calories'>
                {!bmi ? null :
                    <>
                        <h3>Your BMI is {bmi.toFixed(1)}</h3>
                        <h3>Your daily calorie intake should be {calorie.toFixed(0)} kcal</h3>
                    </>
                }
            </div>
        </div>
    );
}

>>>>>>> 324f9c6239fa93f465ebc53dcb30c8df07c0c9cb
export default CalorieCalculator;