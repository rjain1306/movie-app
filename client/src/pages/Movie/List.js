
import { Box, Typography, Card, CardContent, CardMedia, Button, CardActions, IconButton } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import MovieImg1 from "../../assets/images/movie_img_1.png";
import MovieImg2 from "../../assets/images/movie_img_2.png";
import MovieImg3 from "../../assets/images/movie_img_3.png";
import { useEffect, useState } from "react";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const buttonStyle = {
    color: "white",
    textTransform: "none",
    marginTop: "10px",
    fontWeight: 700,
    borderRadius: "10px",
};

const ListMovie = () => {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState();

    const goToCreate = () => {
        navigate("/movie/create");
    }

    const goToEdit = () => {
        navigate("/movie/edit");
    }

    const dummyData = [
        {
            movieName: "Movie 1",
            movieVersion: "2021"
        },
        {
            movieName: "Movie 1",
            movieVersion: "2021"
        },
        {
            movieName: "Movie 1",
            movieVersion: "2021"
        },
        {
            movieName: "Movie 1",
            movieVersion: "2021"
        },
        {
            movieName: "Movie 1",
            movieVersion: "2021"
        },
        {
            movieName: "Movie 1",
            movieVersion: "2021"
        },
        {
            movieName: "Movie 1",
            movieVersion: "2021"
        },
        {
            movieName: "Movie 1",
            movieVersion: "2021"
        },

    ]

    useEffect(() => {
        //Call movie list api
    }, []);

    

    return(
        <Layout>
            <Box sx={{ maxWidth: "100%", padding: "3% 10%" }}>
                <Grid
                    container
                    sx={{ display: "flex", justifyContent:"space-between" }}
                >
                    <Grid
                        item
                        sx={{ display: "flex", justifyContent:"space-between", alignItems: "center" }}
                    >
                        <Typography color="primary.light">My Movies</Typography>

                        <IconButton 
                            color="primary.light"
                            onClick={goToCreate}
                        >
                            <ControlPointIcon/>
                        </IconButton>
                    </Grid>

                    <Grid
                        item
                    >
                        <Typography color="primary.light">Logout</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ maxWidth: "100%", display: "flex", justifyContent:"center", padding: "0% 10%" }}>
                <Grid container spacing={2}>
                    {
                        dummyData.map((movie) => {
                            return (
                                <Grid item lg={3}>
                                    <Card 
                                        sx={{ boxShadow: "none", borderRadius: "0px", textAlign: "left", background: "#092C39", borderRadius: "10px", cursor: "pointer"  }}
                                        onClick={goToEdit}
                                    >
                                        <CardMedia
                                            component="img"
                                            alt="Movie img 1"
                                            height={240}
                                            width={50}
                                            image={MovieImg1}
                                            sx={{ borderRadius: "10px", padding: "2%", margin:"3%", width: "238px" }}
                                        >
                                        </CardMedia>

                                        <CardContent > 
                                            <Typography gutterBottom variant="h5" component="div" color="primary.light">
                                                {movie.movieName}
                                            </Typography>
                                            <Typography variant="body2" color="primary.light">
                                                {movie.movieName}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                    
                </Grid>
            </Box>
        </Layout>
    )
}

export default ListMovie;