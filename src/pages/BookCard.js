import React from 'react'
import { Link } from 'react-router-dom';

function BookCard({ book, handleFavorite, removeFromFavorites, isFavoritePage }) {

    return (
        <div className="col-lg-3 d-flex align-items-stretch mb-4">
            <div className="card w-100" style={{ minHeight: '100%' }}>
                <img src={book.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                    alt={book.volumeInfo?.title} className="card-img-top p-3" style={{ height: '200px ', objectFit: 'contain' }} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{book.volumeInfo?.title}</h5>
                    <p className="card-text">Published Date: {book.volumeInfo?.publishedDate}</p>
                    <p className="card-text">{book.volumeInfo?.authors?.[0] || 'Unknown author'}</p>
                    <small>{book.volumeInfo?.categories?.[0] || 'Unknown category'}</small>
                    <div className='d-grid gap-2  mx-auto'>
                        <Link to={`/books/${book.id}`} className="btn btn-primary">View Details</Link>
                        {isFavoritePage ? (
                            <button className='btn btn-danger' onClick={() => removeFromFavorites(book)}>
                                Remove from Favorites
                            </button>
                        ) : (
                            <button className='btn btn-primary' onClick={() => handleFavorite(book)}>
                                Add to Favorites
                            </button>
                        )}                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(BookCard)