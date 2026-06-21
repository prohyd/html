import structures from "../../data";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

const imgData=structures;

function Gallery() {
    return (
        <Container maxWidth = "xl" sx={{mb:5}}>
            <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 2,
            mt: 2,
            height: {
              xs: "auto",
              md: 400,
            },
          }}
        >
            <Box sx={{ flex: 1, minHeight: {xs: 250, md: "auto"} }}>
              <Link to={`/building/${0}`}>
                <Box
                component="img"
                src={structures[0].img}
                alt={structures[0].title}
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
                />
              </Link>
            </Box>
  
          <Box sx={{ flex: 1 }}>
            <Link to={`/building/${1}`}>
                <Box
                component="img"
                src={structures[1].img}
                alt={structures[1].title}
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
                />
            </Link>
          </Box>
  
          <Box
            sx={{
                flex: 1,
                minHeight: { xs: 250, md: "auto" },
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
          >
            <Link 
            to={`/building/${2}`}
            style={{ flex: 1, minHeight: 0, display: "block", overflow: "hidden" }}
            >
                <Box
                component="img"
                src={structures[2].img}
                alt={structures[2].title}
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
            </Link>

            <Link 
            to={`/building/${3}`}
            style={{ flex: 1, minHeight: 0, display: "block", overflow: "hidden" }}
            >
                <Box
                component="img"
                src={structures[3].img}
                alt={structures[3].title}
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
            </Link>
          </Box>
        </Box>
        </Container>
        )
}

export default Gallery;