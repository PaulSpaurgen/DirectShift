import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function CommonView({
    heading,
    isLoading,
    data,
}: any) {
    return (
        <Box sx={{

            width: "100%",
            height: "100%",

        }}>
            {
                isLoading ?
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height:"100%"
                    }} >
                        <CircularProgress size={25} thickness={6} />
                    </Box> :
                    <Box padding="50px">
                        <Typography variant="h6" fontWeight="bold" >
                            {heading} <Typography variant="caption">of (public-apis)</Typography>
                        </Typography>
                    </Box>

            }
        </Box>
    )
}
export default CommonView