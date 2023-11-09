import {React, useState, useEffect} from "react"
import axios from "axios"



function Card({url, remaining}) {

    

    // useEffect(function getCardUrl() {
    //     async function getURL(){
    //         const res = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
    //         console.log(res)
    //         setCardURL(res.data.cards[0].image)
           
    //     }
    //     getURL()
    //     return setCardURL("") 
    // }, []);

    return (
      <div className="Card">
        <img src={url}/>
        </div>
    );
  }
  
  export default Card;