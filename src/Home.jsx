import axios from "axios";
import { useEffect, useState } from "react";
import LoadingIcon from "./assets/LoadingIcon.svg";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [showUserCard, setShowUserCard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
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
        if (error?.response.status === 500) {
          setError({ message: "Server Error.", status: 500 });
        } else {
          setError({ message: "Some error occured." });
        }
        setError({
          message: error.message,
          status: error?.response?.status || null,
        });
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div
        className="text-light fs-1 d-flex align-items-center "
        style={{
          height: "8vh",
          backgroundColor: "#0a1928",
        }}
      >
        <span className="mx-auto" style={{ width: "60%" }}>
          Users
        </span>
      </div>
      <div
        className="main-container d-flex bg-secondary"
        style={{ height: "92vh" }}
      >
        {loading ? (
          <div
            className="d-flex align-items-center mx-md-auto h-100"
            style={{ paddingBottom: "10rem" }}
          >
            <img src={LoadingIcon} alt="" width={70} height={70} />
          </div>
        ) : !error ? (
          <div
            className="d-flex col-11 col-md-6 col-xl-6 mx-auto my-4"
          >
            <div className="overflow-hidden" style={{ width: "95%" }}>
              <div
                className=" d-flex flex-column h-100 gap-4 "
                style={{ width: "105%", overflowY: "scroll" }}
              >
                {users.map((user, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setShowUserCard(true);
                      setSelectedUser(user);
                    }}
                    style={{ cursor: "pointer", backgroundColor: "#424e5b" }}
                    className="me-5 text-white mb-3 border d-flex align-items-center rounded"
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
                        <span>{user.Bio}</span>
                      </div>
                      <p className="card-text">
                        <small className="text-muted">{user.location}</small>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-100 d-flex align-items-center mx-auto fs-4 text-white pb-5">
            {error.message}
          </div>
        )}

        <div
          className=" flex-column col-8 col-md-4 col-xl-4 text-white selected-user-container"
          style={{
            display: showUserCard ? "flex" : "none",
            backgroundColor: "#424e5b",
          }}
        >
          <div
            onClick={() => setShowUserCard(false)}
            className="ms-3 mt-3"
            style={{ cursor: "pointer" }}
          >
            <img src="/back-arrow-light.png" alt="" width={30} height={30} />
          </div>
          <div className="d-flex w-100 flex-column align-items-center px-5 py-2 ">
            {selectedUser && (
              <>
                <div className="m-4 w-100 d-flex align-items-center justify-content-center">
                  <img
                    src={selectedUser.avatar}
                    className="rounded-circle"
                    width={200}
                    height={200}
                    alt="Profile"
                  />
                </div>
                <div className="d-flex flex-column py-3 gap-2 w-100">
                  <div className="d-flex flex-column mb-4">
                    <span className="fs-4 fw-bolder ">{`${selectedUser.profile.firstName} ${selectedUser.profile.lastName}`}</span>
                    <span className="fs-6">
                      @{selectedUser.profile.username}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span>Job: </span>
                    <span>{selectedUser.jobTitle}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span>Bio: {selectedUser.Bio}</span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span>Email: </span>
                    <span>{selectedUser.profile.email}</span>
                  </div>
                  <p className="card-text">
                    <small className="text-muted">
                      {selectedUser.location}
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
