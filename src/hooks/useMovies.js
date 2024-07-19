import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

export const useMovies = (search, sort) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const previousSearch = useRef(search);


    const getMovies = useCallback(async () => {
        if (search === previousSearch.current) return
        try {
            setLoading(true);
            setError(null);
            previousSearch.current = search
            const newMovies = await searchMovies(search);
            setMovies(newMovies);
        } catch (e) {
            console.log(e);
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [search]);

    //useMemo to avoid render anytime when the input is changed. Improves performance
    const sortedMovies = useMemo(() => {
        return sort ?
            [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies
    }, [sort, movies])

    return {
        movies: sortedMovies,
        getMovies,
        loading,
        error
    }
}