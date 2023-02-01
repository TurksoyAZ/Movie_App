import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MovieDetail from '../Pages/MovieDetail'
import MovieTrailer from '../Pages/MovieTrailer'
import MovieApp from '../Pages/MovieApp'
import MovieListe from '../Pages/MovieListe'
import { useState } from 'react'
import { useEffect } from 'react'

import { loadMore } from '../Service/UrlBase'

function HomeMovie() {

    const [movie, setMovie] = useState([])

    const imgUrl = 'https://image.tmdb.org/t/p/w780/'

    useEffect(() => {
        const getMovie = async () => {
            setMovie(await loadMore())
        }
        getMovie()
    }, [])


    return (
        <section>
            <BrowserRouter>
                <Routes>

                    <Route path='/' element={<MovieApp movie={movie} imgUrl={imgUrl} />} />
                    <Route path='/movieList' element={<MovieListe imgUrl={imgUrl} />} />
                    <Route path='/trailer/:id' element={<MovieTrailer />} />

                    <Route path='/movieDetail/:id' element={<MovieDetail />} />
                </Routes>
            </BrowserRouter>
        </section>
    )
}

export default HomeMovie
