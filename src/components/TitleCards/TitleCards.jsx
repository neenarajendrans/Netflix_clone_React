import React,{ useEffect, useRef, useState } from 'react'
import "./TitleCards.css"
import cards_data from '../../assets/cards/Cards_data'



const TitleCards = ({title, category}) => {
  const[apiData, setApiData]=useState([]);  
const cardsRef = useRef();
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTY0ZjRlYTdlYjQ0MzVlMDk0MWY1MzA5MzRkMGU2NiIsIm5iZiI6MTcxMDE2MDE3My41MjMsInN1YiI6IjY1ZWVmOTJkZWZlMzdjMDE4NmVlOGMwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ci33SfreLhVFjk1RFzGqvl53Ru_4zviI008s8AC_TO8'
    }
  };
  
 useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
 },[])

const handleWheel = (event)=>{
    event.preventDefault();// whenever the mouse wheel is on these cards the mouse can't scroll the website horizontally
    cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{
    cardsRef.current.addEventListener('wheel',handleWheel);
},[])
  return (
    <div  className='title-cards'>
        <h2>{title? title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>  {/* the movie cards need to scroll without using the shift key so we are using useRef to achieve that functionality*/}
            {apiData.map((card,index)=>{
                return <div className="card" key={index} >
                    <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </div>
            })}
        </div>
    </div>
  )
}

export default TitleCards