import React, { useState } from 'react';
import axios from 'axios';

export default function PostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUploading(true);

        try {
            // Prepare form data with text fields and image file (if any)
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Send form data to backend (which uploads image to ImgBB)
            await axios.post('https://newsfeed-backend-tfua.onrender.com/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert('✅ Post created successfully!');
            setTitle('');
            setContent('');
            setImageFile(null);
        } catch (err) {
            console.error(err);
            alert('❌ Failed to create post.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
            <h2>➕ Add News</h2>

            <input
                type="text"
                placeholder="News title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ display: 'block', marginBottom: 10 }}
                disabled={uploading}
            />

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                style={{ display: 'block', marginBottom: 10 }}
                disabled={uploading}
            />

            <textarea
                placeholder="News content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ display: 'block', width: '100%', height: 100, marginBottom: 10 }}
                disabled={uploading}
            />

            {uploading && <p>Uploading image and creating post...</p>}

            <button type="submit" disabled={uploading}>
                Post
            </button>
        </form>
    );
}
