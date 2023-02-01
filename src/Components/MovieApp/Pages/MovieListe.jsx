import React from 'react'
import { Link } from 'react-router-dom'
import './MovieListe.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchGenre, loadMore } from '../Service/UrlBase'
import { AiFillHeart } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { AiTwotoneHeart } from 'react-icons/ai';
import { AiOutlineCloudDownload } from 'react-icons/ai';


import imgNoFoto from '../../../Img/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'


function MovieListe({ imgUrl }) {

    const imgUrl200 = 'https://image.tmdb.org/t/p/w200/'


    //for Genre,Load More
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(2);

    //toogle Genre list
    const [tog, setTog] = useState(false)
    const getOpenGenreList = () => {
        setTog(!tog)
    }

    //fovori funk
    const [favori, setFavori] = useState(false)
    const openFovari = () => {
        setFavori(!favori)
    }

    // selected Favori
    const [remove, setRemove] = useState(false)
    const [favoriData, setFavoriData] = useState([])


    console.log(favoriData);

    //search input
    const [input, setInput] = useState('')

    //useEffect
    useEffect(() => {
        const fetchAPI = async () => {
            setGenres(await fetchGenre());
            setMovies(await loadMore())
        };
        fetchAPI();
    }, []);

    //Genre click
    const handleGenreClick = async (item_id) => {
        setMovies(await loadMore(item_id))

        setTog(!tog)

    };

    // Search
    const getSearch = () => {
        return movies.filter((e) => e.title.toLowerCase().includes(input))
    }


    //load more Funk
    const getLoadMore = () => {
        const fetchingApi = async () => {
            const result = await loadMore('', page)
            setMovies([...movies, ...result])
            console.log(result);
        }
        fetchingApi()
        setPage(prev => prev + 1)
    }


    const clickFavori = (favoriId) => {
        setRemove(!remove)

        if (remove === true) {
            const test1 = [...favoriData?.filter((e) => e.id !== favoriId)]
            setFavoriData(test1)

        } else {
            const test = [...favoriData, ...movies?.filter((e) => e.id === favoriId)]
            setFavoriData(test)
        }

    }



    // =====================================================================================================================================================
    // =====================================================================================================================================================
    return (
        <section className='sectionMovieListe'>

            <article className='first_MovieListArticle'>
                <form >
                    <input type="text" placeholder='Search...' onChange={(e) => setInput(e.target.value)} />
                </form>

                <div className={tog ? 'openGenreList' : 'genreDiv'}>
                    {genres.map((item, index) => {
                        return (
                            <span key={index} onClick={() => handleGenreClick(item.id)} >{item.name}</span>
                        )
                    })}
                </div>

                <b style={{ display: tog ? 'none' : 'block' }}>GENRES</b>
                <span className='arrowOpen' onClick={getOpenGenreList} style={{ transform: tog ? 'rotate(180deg)' : 'rotate(0deg)', color: tog ? 'black' : 'white' }}> < MdKeyboardArrowDown /></span>

            </article>

            <article className='second_MovieListArticle'>
                <div className='loadMoreBox'>
                    {getSearch(movies).map((e, i) => {
                        return (
                            <div className='filmsBox' key={i}>
                                {e.poster_path ? <img src={`${imgUrl}${e.poster_path}`} alt={e.title} /> : <img src={imgNoFoto} alt={e.title} />}

                                <div className='infoBox'>
                                    <h3>{e.title}</h3>
                                    <span >{e.release_date}</span> <br />
                                    <span>⭐️ {e.vote_average} / 10</span>
                                    <b onClick={() => clickFavori(e.id)} > <AiFillHeart /> </b> <br />
                                    <Link to={`/movieDetail/${e.id}`}>See Details</Link>
                                </div>

                            </div>
                        )
                    })}
                </div>

                <button onClick={getLoadMore}>Load More</button>

            </article>

            <div className={favori ? 'favoriListeOpen' : 'favoriListe'}>
                {favoriData.map((item, index) => (
                    <div key={index}>
                        <img src={`${imgUrl200}${item.poster_path}`} alt="" />

                        <h2>{item.title}</h2>
                    </div>
                ))}
            </div>

            <nav className='navMovieListe'>
                <span><Link to='/'>  <FaHome /> </Link></span>
                <span style={{ color: favori ? 'red' : 'white' }} >< AiTwotoneHeart onClick={openFovari} /></span>
                <span><AiOutlineCloudDownload /></span>
            </nav>

        </section>
    )
}

export default MovieListe
