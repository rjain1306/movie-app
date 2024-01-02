
import { Box, Typography, Card, CardContent, CardMedia, Button, CardActions, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import Layout from "../../components/layout";
import InputTextField from "../../components/inputTextField";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import { toast } from "react-toastify";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import Cookies from "js-cookie";

const CreateMovie = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 600px)");
    const [newMovie, setNewMovie] = useState({
        publishYear: "",
        title: "",
    });
    const [fileData, setFileData] = useState("");
    const [error, setError] = useState();
  
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setNewMovie({
            ...newMovie,
            [name]: value,
        });
        setError({});
    }

    const handleFileChange = (event) => {
        console.log("file event: ", event.target.files[0], newMovie)
        const file = event.target.files[0];
        setFileData(file)
    }


    const saveMovie = async () => {
        const isvalidate = validations();

        if (isvalidate) {
            const formData = new FormData();
            formData.append("title", newMovie.title)
            formData.append("publishYear", newMovie.publishYear);
            formData.append("file", fileData);
            
            const token = Cookies.get("jwt");
            try {
                const response = await axios.post(
                    "http://localhost:3000/movies/movie",
                    formData,
                    {
                        headers: { 
                            'authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                        
                    },
                );
                
                if (response.status === 201 && response.statusText === "Created") {
                    goToMovieList();
                    toast.success("Movie created successfully", {
                        position: "top-right",
                        autoClose: 3000, // 3 seconds
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
                }
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    const validations = () => {
        let errors = {};
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
        if (newMovie?.publishYear !== "") {
          errors = { ...errors };
        } else {
          errors = { ...errors, publishYear: "Please enter publish year." };
        }
        if (newMovie?.title !== "") {
          errors = { ...errors };
        } else {
          errors = { ...errors, title: "Please enter title." };
        }
        if (fileData === undefined || !allowedTypes.includes(fileData?.type) ) {
            errors = { ...errors, fileData: "Please select a valid image file (JPEG, PNG)." };
        } 

        setError((error) => ({ ...error, ...errors }));
        if (Object.keys(errors).length === 0) {
          return true;
        } else {
          return false;
        }
    };
     
    const goToMovieList = () => {
        navigate("/movie/list")
    }

    return(
        <Layout>
            <Box sx={{ maxWidth: "100%",padding: "3% 10%" }}>
                <Grid
                    container
                    sx={{ display: "flex", justifyContent:"space-between" }}
                >
                    <Grid
                        item
                    >
                        <Typography sx={{ color: "primary.light", fontSize: "48px" }}>Create a new movie</Typography>
                    </Grid>

                    <Grid
                        item
                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                        <Logout/>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ maxWidth: "100%", padding: "3% 10%", paddingBottom: "20%" }}>
               
                    <Grid
                        container
                        sx={{ display: "flex", justifyContent:"space-between"}}
                    >
                        <Grid item sx={{ width: "43%" }}>
                            {error?.fileData && <p style={{ color: 'red' }}>{error?.fileData}</p>}
                            <input
                                id="file-upload"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />

                            <label
                                htmlFor="file-upload"
                            >
                                <Box
                                    sx={{ background: "linear-gradient(0deg, #224957, #224957)", display: "flex", justifyContent:"center", alignItems: "center", border: "2px solid #FFFFFF", borderRadius: "10px", borderStyle: "dashed", padding: "10%", height:"25vw" }}
                                > 
                                    <Box>
                                        { !fileData &&
                                            <Typography sx={{ color: "primary.light"}}>Drop an image here</Typography>
                                        }
                                    </Box>
                                    { fileData ? 
                                        <img src={URL.createObjectURL(fileData)}  style={{ maxWidth: '100%', height: '100%' }} alt="Selected Image" /> :
                                        <></>
                                    }
                                </Box>
                            </label>
                        </Grid>

                        <Grid 
                            item
                        >
                            <Box>
                                <InputTextField 
                                    placeholder="Title"
                                    name="publishYear"
                                    required
                                    error={error?.publishYear ? true : false}
                                    onChange={onHandleChange}
                                    helperText={error?.publishYear ? error?.publishYear : ""}
                                />
                                
                                <InputTextField 
                                    placeholder="Publishing year"
                                    name="title"
                                    required
                                    error={error?.title ? true : false}
                                    onChange={onHandleChange}
                                    helperText={error?.title ? error?.title : ""}
                                />
                            </Box>

                            <Box sx={{ display: "flex", justifyContent:"space-between", marginTop: "20px" }}>
                                <Button
                                    sx={{
                                        width: "179px",
                                        height: "56px",
                                        padding: "16px, 59px, 16px, 59px",
                                        borderRadius: "10px",
                                        border: "1px solid #FFFFFF",
                                        color: "#FFFFFF",
                                    }}
                                    onClick={goToMovieList}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        width: "179px",
                                        height: "56px",
                                        padding: "16px, 59px, 16px, 59px",
                                        borderRadius: "10px",
                                        background: "#2BD17E",
                                        "&:hover": {
                                            background: "#77d0a3",
                                        }
                                    }}
                                    onClick={saveMovie}
                                >
                                    Submit
                                </Button>

                            </Box>
                        </Grid>
                    </Grid>
                
            </Box>
        </Layout>
    )
}

export default CreateMovie;