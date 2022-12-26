import React from 'react';
import { quotesData } from '../../assets/quotesdata';
import './quote.css'

export default function Quote() {
   

    return (
        <div className='quoteText'>
            <h5>{quotesData[Math.floor((Math.random() * 1643) + 1)].text}</h5>
        </div>
    )
}