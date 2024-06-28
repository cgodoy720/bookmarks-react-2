import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'

const Show = () => {
    const [bookmark, setBookmark] = useState(null)
    const { index } = useParams()
    const API = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()


    const handleDelete = () => {
        fetch(`${API}/${index}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {
                navigate('/bookmarks')
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetch(`${API}/${index}`)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                setBookmark(res)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            { bookmark && 
                <div className="bookmark">
                    <h2>{bookmark.name}</h2>
                    <h4>Category: {bookmark.category}</h4>
                    <a className="external-link" href={bookmark.url} target="_blank">Take me there</a>
                    <Link to={`/bookmarks/${index}/edit`}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={handleDelete}>Delete</button>
                </div> 
            }
        </div>
    );
};

export default Show;