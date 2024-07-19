import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const useSearch = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);

    useEffect(() => {
        // para la validacion de primer instancia, que no salte el error.
        if (isFirstInput.current) {
            isFirstInput.current = search === '';
            return
        }
        if (search === "") {
            setError("No se puede buscar una pelicula vacia");
            return;
        }
        if (search.length < 3) {
            setError("La busqueda debe tener al menos 3 caracteres");
            return;
        }
        setError(null)
    }, [search])

    return {
        search,
        setSearch,
        error
    }
}

export default useSearch; 