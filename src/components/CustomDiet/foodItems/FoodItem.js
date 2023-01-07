import React from 'react';

export default function FoodItem({ title, id, calory, protein, carbs, fat }) {

    return (
        <div className='foodItem_container'>
            {
                id ? <p>
                    Cal:{calory}g, Pro:{protein}g, Carb:{carbs}g, Fat:{fat}
                </p> : <p>Please add food items to the list</p>
            }
        </div>
    )
}
