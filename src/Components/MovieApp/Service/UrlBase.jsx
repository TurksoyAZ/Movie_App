// Popularfilms= https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
// Genre Url https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

import axios from "axios";
const apiKey = "f49f131ae603b33413f9aec982a14ae6";
const url = "https://api.themoviedb.org/3";
const genreUrl = `${url}/genre/movie/list`;

//=========Fetch Genre============
export const fetchGenre = async () => {
    try {
        const { data } = await axios.get(`${genreUrl}?api_key=${apiKey}`);
        return data.genres;
    } catch (error) { }
};

//===============fetch for Genre and Load More================
export const loadMore = async (genre_id, count) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${count}`, {
            params: {
                with_genres: genre_id,
            },
        });

        return data.results
    } catch (error) { }
}
