import { Link, useParams } from 'react-router-dom';
import image2 from '/profile.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Card2 = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        const user = userData.find(user => user.id === id);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const user = userData.find(user => user.id === id);

  if (loading) {
    return (<div className="d-flex align-items-center justify-content-center vh-100">
    <p className="text-center text-bold">Loading...</p>
  </div>) // Display a loading indicator while data is being fetched
  }

  return (
    <div className="card border rounded max-width-md">
      <div className="usercard mx-md-5 d-flex flex-column my-4 flex-md-row align-items-center justify-content-start">
        <div className="mx-md-5 my-4 my-md-0">
          <img src={user.avatar ? user.avatar : image2} className="rounded-circle" height={80} width={80} alt="Profile" />
        </div>
        <div className="additional-info mx-md-3 mb-4 mb-md-0">
          <p className="mb-1"><strong>Bio:</strong> {user.Bio}</p>
          <p className="mb-1"><strong>Job Title:</strong> {user.jobTitle}</p>
          <p className="mb-1"><strong>Email:</strong> {user.profile.email}</p>
          <p className="mb-1"><strong>Username:</strong> {user.profile.username}</p>
          <p className="mb-1"><strong>Name:</strong> {user.firstName} {user.profile.lastName}</p>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center my-3">
        <Link to={"/"} className="btn btn-primary">Go To Home</Link>
      </div>
    </div>
  );
};

export default Card2;
