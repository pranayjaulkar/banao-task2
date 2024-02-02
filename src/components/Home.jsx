import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";


const Home = () => {
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
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    {loading ? (
        <div className="d-flex align-items-center justify-content-center vh-100">
        <p className="text-center text-bold">Loading...</p>
      </div>
      ) : (
        userData.map((user) => (
          <Card
            key={user.id}
            id={user.id}
            image={user.avatar}
            name={`${user.profile.firstName} ${user.profile.lastName}`}
            profile={user.jobTitle}
            location={user.profile.email}
          />
        ))
      )}
      </>
  )
}

export default Home
