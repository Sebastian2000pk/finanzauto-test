import "./styles.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

// Models
import { UserDetails } from "../../models/User";

// Components
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { userServices } from "../../services/userServices";

export const CreateUserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [mode, setMode] = useState<"create" | "edit">("create");

  const validationSchema = yup.object({
    title: yup.string().required("El titulo es requerido"),
    email: yup
      .string()
      .email("Ingresa un email valido")
      .required("El correo es requerido"),
    lastName: yup.string().required("El apellido es requerido"),
    firstName: yup.string().required("El nombres es requerido"),
    picture: yup.string().required("La foto es requerida"),
    gender: yup.string().required("El genero es requerido"),
    dateOfBirth: yup.date().required("La fecha de nacimiento es requerida"),
    phone: yup.number().required("El numero de telefono es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      email: "",
      lastName: "",
      firstName: "",
      picture: "",
      gender: "",
      dateOfBirth: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data: UserDetails = {
        email: values.email,
        title: values.title,
        lastName: values.lastName,
        firstName: values.firstName,
        picture: values.picture,
        gender: values.gender,
        dateOfBirth: new Date(values.dateOfBirth).toISOString(),
        phone: values.phone,
      };
      if (mode == "create") {
        handleClickSave(data);
      } else {
        updateUser(data);
      }
    },
  });

  const handleClickCancel = () => {
    navigate("/");
  };

  const handleClickSave = async (data: UserDetails) => {
    const response = await userServices.createUser(data);
    if (!response) return;

    navigate("/");
  };

  const getUserById = async () => {
    if (userId) {
      const response = await userServices.getById(userId);
      if (!response) return;

      // Set values
      formik.setFieldValue("title", response.title);
      formik.setFieldValue("email", response.email);
      formik.setFieldValue("lastName", response.lastName);
      formik.setFieldValue("firstName", response.firstName);
      formik.setFieldValue("picture", response.picture);
      formik.setFieldValue("gender", response.gender);
      formik.setFieldValue("phone", response.phone);
      formik.setFieldValue(
        "dateOfBirth",
        new Date(response?.dateOfBirth).toISOString().split("T")[0]
      );

      setMode("edit");
    }
  };

  const updateUser = async (data: UserDetails) => {
    if (!userId) return;
    
    const response = await userServices.update(userId, data);
    if (!response) return;

    navigate("/");
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <Paper className="form__container">
      <h3>{mode == "create" ? "Crear" : "Editar"} usuario</h3>

      {mode == "edit" && (
        <div>
          <TextField
            required
            id="firstName-input"
            label="ID"
            variant="outlined"
            disabled
            value={userId}
          />
        </div>
      )}

      <FormControl fullWidth>
        <InputLabel id="title-select-label" required>
          Titulo
        </InputLabel>
        <Select
          labelId="title-select-label"
          id="title-select"
          value={formik.values.title}
          label="Titulo"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
        >
          <MenuItem value="mr">Mr</MenuItem>
          <MenuItem value="ms">Ms</MenuItem>
          <MenuItem value="mrs">Mrs</MenuItem>
          <MenuItem value="miss">Miss</MenuItem>
          <MenuItem value="dr">Dr</MenuItem>
        </Select>
      </FormControl>

      <TextField
        required
        id="firstName-input"
        label="Nombres"
        variant="outlined"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
      />

      <TextField
        required
        id="lastName-input"
        label="Apellidos"
        variant="outlined"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
      />

      <TextField
        required
        id="picture-input"
        label="Foto"
        variant="outlined"
        name="picture"
        value={formik.values.picture}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.picture && Boolean(formik.errors.picture)}
      />

      <FormControl fullWidth>
        <InputLabel id="gender-select-label">Genero</InputLabel>
        <Select
          required
          labelId="gender-select-label"
          id="gender-select"
          value={formik.values.gender}
          label="Genero"
          name="gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        required
        id="email-input"
        label="Correo"
        value={formik.values.email}
        variant="outlined"
        type="email"
        name="email"
        error={formik.touched.email && Boolean(formik.errors.email)}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <TextField
        id="date-input"
        label="Fecha nacimiento"
        variant="outlined"
        type="date"
        name="dateOfBirth"
        value={formik.values.dateOfBirth}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
      />

      <TextField
        id="phone-input"
        label="Telefono"
        variant="outlined"
        type="phone-number"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
      />

      <div className="buttons__container">
        <Button variant="outlined" onClick={handleClickCancel}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={() => formik.handleSubmit()}>
          Guardar
        </Button>
      </div>
    </Paper>
  );
};
