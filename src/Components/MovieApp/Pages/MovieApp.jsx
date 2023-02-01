import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './MovieApp.scss'

import { BsArrowRight } from 'react-icons/bs';

function MovieApp({ movie, imgUrl }) {

    // Carusel
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };



    return (
        <section className='movieAppContainer'>
            <article className='firstArticleMovieApp'>
                <h1>The Movies <br /> of the World!</h1>

            </article>

            <article className='secondArticleMovieApp'>
                <Carousel activeIndex={index} onSelect={handleSelect}>

                    {movie.map((e, i) => (

                        <Carousel.Item key={i}>

                            <Link to={`/movieDetail/${e.id}`}>
                                <img className="d-block w-100" src={`${imgUrl}${e.poster_path}`} alt={movie.title} />
                            </Link>

                            <Carousel.Caption>
                                <h3>{e.original_title}</h3>
                                <p>{e.title}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>


            </article>

            <article className='allMovieArticle'>
                <span className='arrowSpan'> <BsArrowRight /> </span> <Link to='/movieList'>All Movie List</Link>
            </article>
        </section>
    )
}

export default MovieApp
