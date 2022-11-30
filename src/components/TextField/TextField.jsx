import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function MyTextField(props) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <TextField {...props} />
        </Box>
    )
}
