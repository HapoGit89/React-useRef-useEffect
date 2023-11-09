import { React, useState, useEffect, useRef } from "react"
import Card from './Card'
import axios from "axios"



function CardDeck() {
    const deckId = useRef()
    const timerId = useRef()
    const buttonToggle = useRef()
    const deckEmpty = useRef()
    const [cardData, setCardData] = useState({ url: null, remaining: 52 })


    const drawCard = async (id) => {
        if(cardData.remaining == 0){
            alert("game over")
        }
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
        setCardData({ url: res.data.cards[0].image, remaining: res.data.remaining })
    
    }
    useEffect(()=>{
        if (cardData.remaining == 0) {
            endGame()
        }
    },[cardData.remaining])

    
     const drawButton = ()=> {
        console.log(buttonToggle.current)
        buttonToggle.current = (!buttonToggle.current)
        console.log(buttonToggle.current)
        timerId.current = setInterval(()=>{
            drawCard(deckId.current)
        },300)
     }

     const endGame = () => {
        clearInterval(timerId.current)
        deckEmpty.current = true
        setCardData({url: cardData.url, remaining: cardData.remaining})
     }

     const stopDrawing = () => {
        clearInterval(timerId.current)
        buttonToggle.current = (!buttonToggle.current)
        setCardData({url: cardData.url, remaining: cardData.remaining})
     }

    useEffect(() => {
        async function requestId() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            deckId.current = (res.data.deck_id)
            setCardData({ url: null, remaining: 52 })
        }
        buttonToggle.current = false
        requestId()
    }, []);



    return (

        <div className="CardDeck">
            {cardData.url ? <Card remaining = {cardData.remaining}url={cardData.url} /> : deckId.current ? <h1>Your Deck is ready</h1> : <h1>Loading Deck</h1>}
            {deckId.current ? <h1>Cards remaining:{cardData.remaining} </h1> : ""}
            {(cardData.remaining >0 && buttonToggle.current == false)? <button onClick={drawButton}>Draw Cards!</button> : ""}
            {(buttonToggle.current == true )? <button onClick={stopDrawing}>Stop Drawing!</button> : ""}
            {deckEmpty.current == true ? alert("Deck Empty") : ""}
        </div>
    );
}

export default CardDeck;