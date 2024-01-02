import {
    Typography,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 600px)");

    const handleLogout = async () => {
        try {
          const response = await axios.post("http://localhost:3000/auth/logout");
          toast.success("Logged Out successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              borderRadius: "10px",
              margin: isMobile ? "20px" : "0px",
            },
          });
          Cookies.remove("jwt");
          navigate("/");
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              borderRadius: "10px",
              margin: isMobile ? "20px" : "0px",
              textTransform: "capitalize",
            },
          });
        }
      };


    return(
        <>
            <Typography color="primary.light" style={{ cursor: "pointer", fontSize:"16px" }} >
              Logout
            </Typography>

            <IconButton color="primary.light" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
        </>
    )
}

export default Logout;