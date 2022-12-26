<<<<<<< HEAD
import React from 'react';
import { quotesData } from '../../assets/quotesdata';
import './quote.css'

export default function Quote() {
   

    return (
        <div className='quoteText'>
            <h5>{quotesData[Math.floor((Math.random() * 1643) + 1)].text}</h5>
        </div>
    )
=======
import React from 'react';
import { quotesData } from '../../assets/quotesdata';
import './quote.css'

export default function Quote() {
   

    return (
        <div className='quoteText'>
            <h5>{quotesData[Math.floor((Math.random() * 1643) + 1)].text}</h5>
        </div>
    )
>>>>>>> 324f9c6239fa93f465ebc53dcb30c8df07c0c9cb
}