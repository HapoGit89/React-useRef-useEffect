import {React, useState, useEffect, useRef} from "react"
import Card from './Card'
import axios from "axios"



function CardDeck() {
    const deckId = useRef()
    const [cardData, setCardData] = useState({url: null, remaining: 52})
    const drawCard = async(id)=>{
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
        setCardData({url: res.data.cards[0].image, remaining: res.data.remaining})
        console.log(cardData)
    }
   

    useEffect(()=> {
        async function requestId(){
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            deckId.current=(res.data.deck_id)
            setCardData({url: null, remaining: 52})
        }
        requestId()
        console.log("effect")
        
      },[]);

   

    return (
   
      <div className="CardDeck">
            
        {cardData.url ? <Card url={cardData.url}/>: deckId.current ? <h1>Your Deck {`(ID:${deckId.current} )`} is ready</h1> : <h1>Loading Deck</h1>}
        {deckId.current ? <h1>Deck ID: {deckId.current}, Cards remaining:{cardData.remaining} </h1> : ""}
        
        <button onClick={()=>drawCard(deckId.current)}>Draw A Card!</button>
      </div>
    );
  }
  
  export default CardDeck;