import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Compnents/Navbar';
import { useQuery } from '@tanstack/react-query';

function BookDetails() {
    const { id } = useParams();
    const { data: book, isLoading, error } = useQuery({
        queryKey: ['Book', id],
        queryFn: async () => {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
            return res.json();
        }
    });

    if (isLoading)
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    if (error) return <p>Error loading book</p>;

    return (
        <div>
            <Navbar />
            <h2>
                {book.volumeInfo?.title}
            </h2>
            <div className='d-flex align-items-center justify-content-center my-5 '>
                <div className="card w-50" style={{ minHeight: '100%' }}>
                    <img src={book.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                        alt={book.volumeInfo?.title} className="card-img-top p-3" style={{ height: '400px', objectFit: 'contain' }} />
                    <div className="card-body text-start">
                        <div className="p-3 mb-2 bg-light text-dark">
                            <h5 className="card-title"><strong>Book Title: </strong>{book.volumeInfo?.title}</h5>
                            <small className="card-text"><strong>Book Subtitle: </strong>{book.volumeInfo?.subtitle || 'N/A'}</small>
                        </div>
                        <p className="card-text ps-5"><strong>Published Date: </strong>{book.volumeInfo?.publishedDate}</p>
                        <p className="card-text ps-5"><strong>Book Authors:</strong> {book.volumeInfo?.authors || 'Unknown author'} </p>
                        <small className="card-text ps-5"><strong>Categories: </strong>{book.volumeInfo?.categories?.[0] || 'N/A'}</small> <br />

                        <div className="d-flex mt-3">
                            <p className="ps-2 flex-grow-1"> <strong>💵 Price:</strong>{' '}
                                {book.saleInfo?.listPrice
                                    ? `${book.saleInfo.listPrice.amount} ${book.saleInfo.listPrice.currencyCode}`
                                    : 'Unavailable'}</p>
                            <Link to={book.volumeInfo?.previewLink} className='btn btn-primary ps-2'>Preview</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(BookDetails); 