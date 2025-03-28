import React,{ useEffect, useRef } from 'react'
import "./TitleCards.css"
import cards_data from '../../assets/cards/Cards_data'



const TitleCards = () => {
    
const cardsRef = useRef();

const handleWheel = (event)=>{
    event.preventDefault();// whenever the mouse wheel is on these cards the mouse can't scroll the website horizontally
    cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{
    cardsRef.current.addEventListener('wheel',handleWheel);
},[])
  return (
    <div  className='title-cards'>
        <h2>Popular on Netflix</h2>
        <div className="card-list" ref={cardsRef}>  {/* the movie cards need to scroll without using the shift key so we are using useRef to achieve that functionality*/}
            {cards_data.map((card,index)=>{
                return <div className="card" key={index} >
                    <img src={card.image} alt="" />
                    <p>{card.name}</p>
                </div>
            })}
        </div>
    </div>
  )
}

export default TitleCards