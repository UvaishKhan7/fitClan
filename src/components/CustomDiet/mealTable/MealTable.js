import React from 'react'

export default function MealTable({ Icon, title, id, addMealOption }) {
    

    return (
        <>
            <div className='meal_option' >
                {Icon && <Icon className="add_meal_icon" />}
                {Icon ? (
                    <h3>{title}</h3>
                ) : (
                    <h3 className='mealOption_meal'>
                        <span className='mealOption_hash'># &nbsp;{title}</span>
                    </h3>
                )}
            </div>
        </>
    )
}
