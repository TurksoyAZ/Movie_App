import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import './MovieTrailer.scss'


function MovieTrailer() {

    const youtubeUrl = "https://www.youtube.com/embed/";

    const { id } = useParams()

    const [trailer, setTrailer] = useState({})

    const getMovieTrailer = (id) => {
        return axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=f49f131ae603b33413f9aec982a14ae6&language=en`);
    }

    useEffect(() => {
        const fetchApi = async () => {
            const respons = (await getMovieTrailer(id))
            setTrailer(respons?.data.results[0]);
        }
        fetchApi(id)
    }, [id])

    console.log(trailer);

    return (
        <section className='containerTrailer'>

            <article className='articleTrailer'>


                <iframe className="iframe"
                    src={`${youtubeUrl}${trailer.key}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>

            </article>

            {/* <Link to='/movieList'>To MovielListe</Link> */}
        </section>
    )
}

export default MovieTrailer
