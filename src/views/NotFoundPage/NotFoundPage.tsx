import { Box, CardMedia, Container } from "@mui/material";
import notFoundImage from '../../images/notFound.png';

const NotFoundPage = () => {
    return(
        <Container component="main" maxWidth="lg">
            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
                    >
        <CardMedia
        component="img"
        image={notFoundImage}/>
        </Box>
        </Container>
    )
}

export default NotFoundPage;