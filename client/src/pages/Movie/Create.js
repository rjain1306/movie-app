import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import Grid from "@mui/material/Grid";
  import { useNavigate } from "react-router-dom";
  import Layout from "../../components/layout";
  import { useEffect, useState } from "react";
  import ControlPointIcon from "@mui/icons-material/ControlPoint";
  import axios from "axios";
  import Cookies from "js-cookie";
  import { Pagination, Stack } from '@mui/material';
  import Logout from "../Logout";
  import "../styles/home.css"
  
  const ListMovie = () => {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState([]);
    const isMobile = useMediaQuery("(max-width: 600px)");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 8;
  
    const handleChange = (event, value) => {
      setCurrentPage(value);
    };
  
  
    const goToCreate = () => {
      navigate("/movie/create");
    };
  
    const goToEdit = (movieId) => {
      navigate(`/movie/edit/${movieId}`);
    };
  
    const getMovieData = async() => {
      const token = Cookies.get("jwt");
      try {
        const response = await axios.get(
          `http://localhost:3000/movies?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
  
        if(response?.data?.items.length > 0) {
          setMovieData(response?.data?.items)
        } else {
          setMovieData([])
        }
        setTotalPages(response.data.totalPages);
      } catch (error) {
       console.log("error: ", error)
      }
    }
  
    useEffect(() => {
      //Call movie list api
      getMovieData();
    }, [currentPage]);
  
    return (
      <Layout>
        <Box sx={{ maxWidth: "100%", padding: "3% 10%" }}>
          <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography color="primary.light" sx={{ fontSize: "48px" }}>My Movies</Typography>
  
              <IconButton color="primary.light" onClick={goToCreate}>
                <ControlPointIcon style={{ color: "#FFFFFF" }}/>
              </IconButton>
            </Grid>
  
            <Grid 
              item
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <Logout/>
            </Grid>
          </Grid>
        </Box>
  
        <Box sx={{ maxWidth: "100%", display: "flex", justifyContent: "center", padding: "0% 10%", paddingBottom: "10%" }}>
          <Grid container spacing={2}>
            {movieData && movieData.length > 0 ? (movieData.map((movie) => {
              return (
                <Grid item lg={3}>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "0px",
                      textAlign: "left",
                      background: "#092C39",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => goToEdit(movie.id)}
                  >
                    <CardMedia
                      component="img"
                      alt="Movie img 1"
                      height={240}
                      width={50}
                      image={movie.imageUrl}
                      sx={{ borderRadius: "10px", padding: "2%", margin: "3%", width: "238px" }}
                    ></CardMedia>
  
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" color="primary.light">
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" color="primary.light">
                        {movie.publishYear}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })) : (
              <Box className="container">
                <Typography variant={isMobile ? "h3" : "h2"} className="message">
                  Your movie list is empty
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
  
        {movieData && movieData.length > 0 && 
          <Box 
            sx={{ maxWidth: "100%", display: "flex", justifyContent: "center", padding: "0% 10%", paddingBottom: "20%" }}
          >
            <Stack spacing={2} mt={2}>
              <Pagination 
                shape="rounded" 
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
              />
            </Stack>
          </Box>
        }
      </Layout>
    );
  };
  
  export default ListMovie;
  