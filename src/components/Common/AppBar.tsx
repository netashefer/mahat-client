import DashboardIcon from '@mui/icons-material/Dashboard';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
  return ( 
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background: 'linear-gradient(to right, #5462E1, #00FFE0)'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <DashboardIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Graph.it
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}