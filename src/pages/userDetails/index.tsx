import { useEffect, useState } from "react";
import "./styles.css";
import { useParams, useNavigate } from "react-router-dom";
import { userServices } from "../../services/userServices";
import { UserDetails } from "../../models/User";

// Components
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

export const UserDetailsPage = () => {
  const [user, setUser] = useState<UserDetails>();

  const navigate = useNavigate();

  const { userId } = useParams();

  const getUserById = async () => {
    if (!userId) return;

    const response = await userServices.getById(userId);
    if (!response) return;

    setUser(response);
  };

  useEffect(() => {
    getUserById();
  }, []);

  const goBack = () => {
    navigate("/");
  };

  const dateOfBirth = new Date(user?.dateOfBirth || "").toLocaleDateString();

  return (
    <div>
      <Paper className="details__container">
        <h3>Detalle del usuario</h3>

        <div>
          <img src={user?.picture} alt="user image" className="picture" />
        </div>

        <div className="item__container">
          <label className="title">Id: </label>
          <label className="value">{user?.id}</label>
        </div>

        <div className="item__container">
          <label className="title">Titulo: </label>
          <label className="value">{user?.title}</label>
        </div>

        <div className="item__container">
          <label className="title">Nombres: </label>
          <label className="value">{user?.firstName}</label>
        </div>

        <div className="item__container">
          <label className="title">Apellidos: </label>
          <label className="value">{user?.lastName}</label>
        </div>

        <div className="item__container">
          <label className="title">Genero: </label>
          <label className="value">{user?.gender}</label>
        </div>

        <div className="item__container">
          <label className="title">Correo: </label>
          <label className="value">{user?.email}</label>
        </div>

        <div className="item__container">
          <label className="title">Fecha de nacimiento: </label>
          <label className="value">{dateOfBirth}</label>
        </div>

        <div className="item__container">
          <label className="title">Telefono: </label>
          <label className="value">{user?.phone}</label>
        </div>
      </Paper>

      <Button variant="contained" onClick={goBack} style={{ marginTop: 20 }}>
        Volver atras
      </Button>
    </div>
  );
};
