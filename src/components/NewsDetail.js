import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function NewsDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${id}`)
            .then(res => setPost(res.data));
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <Link to="/">← Back</Link>
            {post.imageUrl && (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    style={{ width: '100%', maxHeight: 400, objectFit: 'cover', marginBottom: 20 }}
                />
            )}
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p style={{ fontSize: 12, color: '#888' }}>
                Posted on: {new Date(post.createdAt).toLocaleString()}
            </p>
        </div>
    );
}
