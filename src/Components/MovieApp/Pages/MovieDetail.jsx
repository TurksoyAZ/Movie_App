import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './MovieDetail.scss'
import { BsArrowLeft } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { AiTwotoneHeart } from 'react-icons/ai';
import { AiOutlineCloudDownload } from 'react-icons/ai';




const apiKey = "f49f131ae603b33413f9aec982a14ae6";

function MovieDetail() {

    const { id } = useParams()
    const [detals, setDetals] = useState([])

    console.log(id)

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
                setDetals(response?.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchApi()
    }, [id])

    console.log(detals.id);

    console.log(detals);
    return (
        <>
            <section className='containerMovieDetail'>

                <article className='imgArticle' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${detals.backdrop_path})` }}>
                    <Link to='/movieList'> <b><BsArrowLeft /></b></Link>
                </article>


                <article className='infoArticle'>
                    <h1>{detals.title}</h1>

                    <h2>{detals.budget}$</h2>
                    <span>{(detals.runtime / 60).toFixed(1).slice(0, 1)}h </span>
                    <span>{(detals.runtime % 60)}m</span> <br />
                    <span>⭐️ {Number(detals.vote_average).toFixed(1)} / 10</span><br /><br />
                    <h2>Overview</h2>
                    <p>{detals.overview}</p>
                    <br />
                    <Link to={`/trailer/${detals.id}`}>Trailer</Link>
                </article>


                <nav className='navDetail'>
                    <span><Link to='/'> <FaHome /> </Link></span>
                    <span >< AiTwotoneHeart /></span>
                    <span><AiOutlineCloudDownload /></span>
                </nav>


            </section>
        </>
    )
}

export default MovieDetail
