// ProfilePage.tsx
import { useEffect, useState } from "react";
import FooterLayout from "../layouts/Footer/FooterLayout";
import HeaderLayout from "../layouts/Header/HeaderLayout";
import { User } from "../models/User";
import "../styles/styleProfile.css";
import Title from "../components/Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/login");
  };
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData) as User);
    }
  }, []);

  if (!user) {
    return <div>Cargando datos del usuario...</div>;
  }

  return (
    <div className="profileContainer">
      <HeaderLayout cartCount={0} cartPrice={0} />
      <div className="profileContent">
        <Title title={"PERFIL"} />
        <div className="profileData">
          <div className="profileUser">
            <img src={user.image} alt="User profile" />
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>({user.gender})</p>
          </div>
          <div className="profileDetails">
            <p>User: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
          <div className="logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <p>Cerrar Sesión</p>
          </div>
        </div>
      </div>
      <FooterLayout />
    </div>
  );
};

export default ProfilePage;
