import {
    Box,
    Card,
    Typography,
    Container,
    Button,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import Img404 from '../../styles/images/404.svg';
const MainContent = styled(Box)(
    ({ theme }) => `
      height: 100%;
      display: flex;
      flex: 1;
      overflow: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `
);


function Status404() {
    return (
        <>
            <MainContent>
                <Container maxWidth="md">
                    <Box textAlign="center">
                        <img alt="404" height={180} src={Img404} />
                        <Typography variant="h2" sx={{ my: 2 }}>
                            The page you were looking for doesn't exist.
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.secondary"
                            fontWeight="normal"
                            sx={{ mb: 4 }}
                        >
                            It's on us, we moved the content to a different page. The search
                            below should help!
                        </Typography>
                    </Box>
                    <Card sx={{ textAlign: 'center', mt: 2, p: 4 }}>
                        <Button href="/" variant="outlined">
                            Go to homepage
                        </Button>
                    </Card>
                </Container>
            </MainContent>
        </>
    );
}

export default Status404;
