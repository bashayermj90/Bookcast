import React, { useMemo, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../Compnents/Navbar';
import { removeFromFavorites } from '../redux/favoritesSlice';
import BookCard from './BookCard';

function Favorite() {
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const handleRemoveFromFavorites = useCallback((book) => {
        dispatch(removeFromFavorites(book.id));
        setSearchedWord('');
    }, [dispatch]);

    const [searchedWord, setSearchedWord] = useState('');

    const filteredBook = useMemo(() => {
        return favorites.filter(book =>
            book.volumeInfo?.title.toLowerCase().startsWith(searchedWord.toLowerCase()) ||
            book.volumeInfo?.authors?.[0].toLowerCase().startsWith(searchedWord.toLowerCase())
        )
    }, [searchedWord, favorites])

    if (favorites.length === 0) {
        return (
            <div>
                <Navbar />
                <h1 className='pt-3'>Favorite Books</h1>
                <p>No Favorites books</p>
            </div>
        );
    }
    return (
        <div>
            <Navbar />
            <h1 className='pt-3'>Favorite Books</h1>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <input className='form-control' placeholder="Type to search..."
                            value={searchedWord} onChange={(e) => setSearchedWord(e.target.value)}
                            type="search" name="" id="" />
                    </div>
                </div>
                <div className='row m-4'>
                    {filteredBook.length === 0 ? <p>No books match your search.</p> : filteredBook.map((book) => (
                        <div key={book.id} className="col-lg-3 d-flex align-items-stretch mb-4">
                            <BookCard key={book.id} book={book} removeFromFavorites={handleRemoveFromFavorites} isFavoritePage={true} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Favorite