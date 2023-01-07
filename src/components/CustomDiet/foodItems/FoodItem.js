import React from 'react';
import { Button } from '@mui/material';
import { HiOutlineTrash } from 'react-icons/hi'
import { UserAuth } from '../../../UserAuthContext';
import { deleteDoc, doc } from 'firebase/firestore';
import db from '../../../firebase';

export default function FoodItem({ title, calory, protein, carbs, fat, id, foodId }) {

    const { user } = UserAuth();


    // for deleting food item
    const deleteFoodItem = async (foodId) => {
        await deleteDoc(doc(db, "user", user.uid, 'meals', id, `${title}`, foodId))
    }

    return (
        <div key={title} className="food_list_item">
            <div className='food_title'>{title}
                <Button type="submit" onClick={() => deleteFoodItem(foodId)} variant="outlined" color="error">
                    <HiOutlineTrash className='trash' />
                </Button>
            </div>
            <div className="macros">
                Carbs: {carbs}g, Prot: {protein}g, Fat: {fat}g, Cal: {calory}kCal
            </div>
        </div>
    )
}
