import "./styles.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Models
import { type User } from "../../models/User";

// Services
import { userServices } from "../../services/userServices";

// Components
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

const PAGE_SIZE = 10;

export const UserListPage = () => {
  const [page, setPage] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");

  const navigate = useNavigate();

  const getUserList = async () => {
    const response = await userServices.get(PAGE_SIZE, page);
    setUsers(response?.data || []);
    setTotalRows(response?.total || 0);
  };

  useEffect(() => {
    getUserList();
  }, [page]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const onClickDeleteUser = async (id: string) => {
    const response = await userServices.delete(id);
    if (response?.id) {
      setUsers((users) => users.filter((user) => user.id !== id));
      setTotalRows((total) => (total -= 1));
    }
  };

  const createUserHandleClick = () => {
    navigate("/create-user");
  };

  const handleChangeSearchInput = (e: any) => {
    setSearchText(e.target.value as string);
  };

  const handleClickViewUserDetails = (id: string) => {
    navigate("/user-details/" + id);
  };

  const handleClickEditUser = (id: string) => {
    navigate("/edit-user/" + id);
  };

  const userFiltered = useMemo(() => {
    return users.filter((user) =>
      user.fullName
        ?.toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
    );
  }, [users, searchText]);

  return (
    <div className="user-list__container">
      <section className="header__container">
        <TextField
          id="search-input"
          label="Buscar"
          variant="outlined"
          onChange={handleChangeSearchInput}
        />
        <Button variant="outlined" onClick={createUserHandleClick}>
          Crear usuario
        </Button>
      </section>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Foto</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userFiltered.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell style={{ width: 50 }} align="center">
                  <img
                    src={user.picture}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                </TableCell>
                <TableCell style={{ width: 150 }}>
                  <div className="actions__container">
                    <IconButton
                      onClick={() => onClickDeleteUser(user.id)}
                      className="button__action"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => handleClickEditUser(user.id)}
                      className="button__action"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => handleClickViewUserDetails(user.id)}
                      className="button__action"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={totalRows}
                rowsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
