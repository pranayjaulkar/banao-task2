import axios from "axios";
import { useEffect, useState } from "react";
import LoadingIcon from "./assets/LoadingIcon.svg";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://602e7c2c4410730017c50b9d.mockapi.io/users"
        );
        if (!res.data || !res.data.length) {
          setError({ message: "No users found" });
        }
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 500)
          setError({ message: "Server Error: 500" });
        else if (
          error.response.status === 400 ||
          error.response.status === 403 ||
          error.response.status === 404
        )
          setError({ message: "Something went wrong" });

        setError({ message: error.message });
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <header className="bg-dark text-light py-4" style={{ height: "10vh" }}>
        <div className="container">
          <h1 className="h3">UserApp</h1>
        </div>
      </header>
      <div className="d-flex bg-secondary" style={{ height: "90vh" }}>
        {loading ? (
          <div
            className="d-flex align-items-center mx-auto h-100"
            style={{ paddingBottom: "10rem" }}
          >
            <img src={LoadingIcon} alt="" width={70} height={70} />
          </div>
        ) : !error ? (
          <div className="col-8 col-xl-6 mx-auto my-4 d-flex flex-column  gap-4  overflow-y-scroll">
            {users.map((user, i) => (
              <div
                key={i}
                onClick={() => {
                  setShowUserDetails(true);
                  setCurrentUserDetails(user);
                }}
                style={{ cursor: "pointer", backgroundColor: "#424e5b" }}
                className="me-3 text-white mb-3 border d-flex align-items-center rounded"
              >
                <div
                  className="m-4 d-flex align-items-center justify-content-center"
                  style={{ width: "152px" }}
                >
                  <img
                    src={user.avatar}
                    className="rounded-circle"
                    alt="Profile"
                  />
                </div>
                <div className="w-100 d-flex flex-column py-3 ">
                  <div className="d-flex flex-column mb-3">
                    <span className="fs-4 fw-bolder ">{`${user.profile.firstName} ${user.profile.lastName}`}</span>
                    <span>{user.jobTitle}</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <span>Bio: {user.Bio}</span>
                  </div>
                  <p className="card-text">
                    <small className="text-muted">{user.location}</small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-100 d-flex align-items-center mx-auto fs-4 text-white pb-5">
            {error.message}
          </div>
        )}

        <div
          className="col-4 col-xl-4 flex-column text-white"
          style={{
            display: showUserDetails ? "flex" : "none",
            backgroundColor: "#424e5b",
          }}
        >
          <div
            onClick={() => setShowUserDetails(false)}
            className="ms-3 mt-3"
            style={{ cursor: "pointer" }}
          >
            <img src="/back-arrow-light.png" alt="" width={30} height={30} />
          </div>
          <div className="d-flex w-100 flex-column align-items-center px-5 py-2 ">
            {currentUserDetails && (
              <>
                <div className="m-4 w-100 d-flex align-items-center justify-content-center">
                  <img
                    src={currentUserDetails.avatar}
                    className="rounded-circle"
                    width={200}
                    height={200}
                    alt="Profile"
                  />
                </div>
                <div className="d-flex flex-column py-3 gap-2 w-100">
                  <div className="d-flex flex-column mb-4">
                    <span className="fs-4 fw-bolder ">{`${currentUserDetails.profile.firstName} ${currentUserDetails.profile.lastName}`}</span>
                    <span className="fs-6">
                      @{currentUserDetails.profile.username}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span>Bio: {currentUserDetails.Bio}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span>Job: </span>
                    <span>{currentUserDetails.jobTitle}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span>Email: </span>
                    <span>{currentUserDetails.profile.email}</span>
                  </div>
                  <p className="card-text">
                    <small className="text-muted">
                      {currentUserDetails.location}
                    </small>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
