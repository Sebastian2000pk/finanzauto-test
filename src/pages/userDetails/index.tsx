import { useEffect, useState } from "react";
import "./styles.css";
import { useParams, useNavigate } from "react-router-dom";
import { userServices } from "../../services/userServices";
import { UserDetails } from "../../models/User";

// Components
import { Button } from "@mui/material";

export const UserDetailsPage = () => {

  const [user, setUser] = useState<UserDetails>()

  const navigate = useNavigate();

  const { userId } = useParams();

  const getUserById = async () => {
    if (!userId) return;

    const response = await userServices.getById(userId);
    console.log(response)
    setUser(response);
  }

  useEffect(() => {
    getUserById();
  }, [])

  const goBack = () => {
    navigate("/")
  }

  return (
    <div>

      <h3>Detalle del usuario</h3>
      <div>
        <label>Id: </label>
        <label>{user?.id}</label>
      </div>

      <div>
        <label>Titulo: </label>
        <label>{user?.title}</label>
      </div>

      <div>
        <label>Nombres: </label>
        <label>{user?.firstName}</label>
      </div>

      <div>
        <label>Apellidos: </label>
        <label>{user?.lastName}</label>
      </div>

      <div>
        <label>Foto: </label>
        <label>{user?.picture}</label>
      </div>

      <div>
        <label>Genero: </label>
        <label>{user?.gender}</label>
      </div>

      <div>
        <label>Correo: </label>
        <label>{user?.email}</label>
      </div>

      <div>
        <label>Fecha de nacimiento: </label>
        <label>{user?.dateOfBirth}</label>
      </div>

      <div>
        <label>Telefono: </label>
        <label>{user?.phone}</label>
      </div>

      <Button variant="outlined" onClick={goBack} style={{ marginTop: 20 }}>Volver atras</Button>
    </div>
  )
};