import { Link } from 'react-router-dom';
import image2 from '../../public/profile.jpg';

const Card = ({ id,image, name, profile, location }) => {
  return (
    <div className="card border rounded max-width-md ">
      <div className="d-flex align-items-center justify-content-start">
        <div className="mx-md-5">
          <img src={image?image:image2} className="rounded-circle" height={50} width={50} alt="Profile" />
        </div>
        <div className="">
          <div className="card-body">
            <Link to={`/${id}`} className="card-title font-weight-bold name">{name}</Link>
            <p className="card-text">
              <span className="profile-text small">{profile}</span>
            </p>
            <p className="card-text">
              <small className="text-muted">{location}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
