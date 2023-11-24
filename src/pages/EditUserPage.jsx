import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectUser } from "../store/userSlice";
import { Container, Typography } from "@mui/material";
import UserService from "../API/UserService";
import EditUserForm from "../components/EditUserForm/EditUserForm";
import CustomDialog from "../components/Dialog/CustomDialog";

const EditUserPage = () => {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const [userData, setUserData] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.id !== Number(id)) {
      navigate("/");
      return;
    }

    UserService.getUserById(id)
      .then((data) => {
        setUserData(data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  }, [id, navigate, user.id]);

  const handleDelete = async () => {
    await UserService.deleteUser(id).then((data) => {
        navigate("/");
      });
  }

  return (
    <div>
      <Container sx={{mb: 8}}>
        <Typography sx={{ textAlign: "center", mb: 2 }} variant="h4">
          Edit user
        </Typography>
        {userData && <EditUserForm login={userData.login} id={id} setDialogOpen={setDialogOpen}/>}
      </Container>
      <CustomDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        agreeAction={handleDelete}
        dialogTitle={"Delete Confirmation"}
        dialogContent={"Are you sure you want to delete account?"}
      />
    </div>
  );
};

export default EditUserPage;
