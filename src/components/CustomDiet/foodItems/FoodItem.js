import React from 'react';
import { Button } from '@mui/material';
import { HiOutlineTrash } from 'react-icons/hi'
import { UserAuth } from '../../../UserAuthContext';
import { deleteDoc, doc } from 'firebase/firestore';
import db from '../../../firebase';

export default function FoodItem(foodId, id, title, name, carbs, protein, fat, calory) {

    const { user } = UserAuth();

    // for deleting food item
    const deleteFoodItem = async (foodId) => {
        await deleteDoc(doc(db, "user", user.uid, 'meals', id, `${title}`, foodId))
    }

    return (
        <div key={foodId} className="food_list_item">
            <div className='food_title'>{name}
              <Button type="submit" onClick={() => deleteFoodItem(foodId)} variant="outlined" color="error">
                <HiOutlineTrash className='trash' />
              </Button>
            </div>
            <div className="macros">
              <span>Carbs: {carbs}g, </span>
              <span>Prot: {protein}g, </span>
              <span>Fat: {fat}g, </span>
              <span>Cal: {calory}kCal</span>
            </div>
          </div>
    )
}
