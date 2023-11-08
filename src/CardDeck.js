import {React, useState, useEffect} from "react"
import Card from './Card'
import axios from "axios"



function CardDeck() {
    const [deckId, setDeckId] = useState(null)
    const [cardData, setCardData] = useState({url: null, remaining: 52})
    const drawCard = async(id)=>{
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
        setCardData({url: res.data.cards[0].image, remaining: res.data.remaining})
        console.log(cardData)
    }
   

    useEffect(function getDeckId() {
        async function requestId(){
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            setDeckId(res.data.deck_id)
        }
        requestId()
        setCardData({url: null, remaining: 52})
        return setDeckId(null)
      }, []);

   

    return (
      <div className="CardDeck">
        {cardData.url ? <Card url={cardData.url}/>: deckId ? <h1>Your Deck {`(ID:${deckId} )`} is ready</h1> : <h1>Loading Deck</h1>}
        {deckId ? <h1>Deck ID: {deckId}, Cards remaining:{cardData.remaining} </h1> : ""}
        
        <button onClick={()=>drawCard(deckId)}>Draw A Card!</button>
      </div>
    );
  }
  
  export default CardDeck;