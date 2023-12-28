
import { Box, Typography, Card, CardContent, CardMedia, Button, CardActions, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import Layout from "../../components/layout";
import InputTextField from "../../components/inputTextField";
import { useNavigate } from "react-router-dom";


const CreateMovie = () => {
    const navigate = useNavigate();

    const goToMovieList = () => {
        console.log("go to movie list...")
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
                        <Typography sx={{ color: "primary.light"}}>Create a new movie</Typography>
                    </Grid>

                    <Grid
                        item
                    >
                        <Typography>Logout</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ maxWidth: "100%", padding: "3% 10%" }}>
                <Grid
                    container
                    sx={{ display: "flex", justifyContent:"space-between"}}
                >
                    <Grid item sx={{ width: "43%" }}>
                        <input
                            id="file-upload"
                            type="file"
                            style={{display: "none"}}
                        />

                        <label
                            htmlFor="file-upload"
                        >
                            <Box
                                sx={{ background: "linear-gradient(0deg, #224957, #224957)", display: "flex", justifyContent:"center", alignItems: "center", border: "2px solid #FFFFFF", borderRadius: "10px", borderStyle: "dashed", padding: "10%", height:"25vw" }}
                            > 
                                <Box>
                                    <Typography sx={{ color: "primary.light"}}>Drop an image here</Typography>
                                </Box>
                            </Box>
                        </label>
                    </Grid>

                    <Grid 
                        item
                    >
                        <Box>
                            <InputTextField placeholder="Title"/>
                            <InputTextField placeholder="Publishing year"/>
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