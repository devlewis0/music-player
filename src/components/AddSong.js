import React, { useState } from 'react';
import axios from 'axios';

const AddSong = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    url: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { title, artist, url } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const res = await axios.post('http://localhost:5000/api/songs', formData, config);
      console.log('Response data:', res.data);
      setSuccess(true);
      setError('');
    } catch (err) {
      console.error('Error response:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.msg : 'Something went wrong');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Artist"
          name="artist"
          value={artist}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="URL"
          name="url"
          value={url}
          onChange={onChange}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Song added successfully!</p>}
      <button type="submit">Add Song</button>
    </form>
  );
};

export default AddSong;
