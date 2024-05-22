import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
// Import your Store context
import { REST_API_BASE_URL } from '../../../App';
import { Store } from '../../../store';

const EditRoadmap = () => {
    const { id } = useParams();
    const { state } = useContext(Store); // Access the state from your Store context
    const { userInfo } = state; // Extract the userInfo from the state
    const [roadmap, setRoadmap] = useState({
        title: '',
        description: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch the roadmap details when component mounts
        const fetchRoadmap = async () => {
            try {
                const response = await axios.get(`${REST_API_BASE_URL}/admin/roadmap/${id}`);
                setRoadmap(response.data);
            } catch (error) {
                console.error('Error fetching the roadmap data:', error);
            }
        };

        fetchRoadmap();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoadmap({
            ...roadmap,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${REST_API_BASE_URL}/admin/roadmap/${id}`, roadmap, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}` // Include the token in the headers
                }
            });
            if (response.status === 200) {
                setMessage('Roadmap updated successfully!');
                setTimeout(() => {
                    setMessage('');
                }, 2000);
            } else {
                setMessage('Failed to update roadmap.');
            }
        } catch (error) {
            console.error('Error updating the roadmap:', error);
            setMessage('Error updating the roadmap.');
        }
    };

    return (
        <div className="main">
            <div className="detailss">
                <div className="recentOrderss">
                    <div className="cardHeader">
                        <h2>Create New Roadmap</h2>
                        <Link to={`/admin/roadmaps`} className="btn">
                            All Roadmaps
                        </Link>
                    </div>
                    {message && <div className="alert alert-info">{message}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={roadmap.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={roadmap.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn" style={{background:"#1eb2a6",color:"white"}} >Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditRoadmap;
