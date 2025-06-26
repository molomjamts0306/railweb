import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function NewsList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://newsfeed-backend-tfua.onrender.com/posts')
            .then(res => setPosts(res.data));
    }, []);
    return (
        <div>
            <h2>📃 Latest News</h2>
            {posts.map(post => (
                <div key={post._id} style={{ borderBottom: '1px solid #ccc', marginBottom: 10 }}>
                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover', marginBottom: 10 }}
                        />
                    )}
                    <h3>
                        <Link to={`/post/${post._id}`}>{post.title}</Link>
                    </h3>
                    <p>{post.content.slice(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
}
