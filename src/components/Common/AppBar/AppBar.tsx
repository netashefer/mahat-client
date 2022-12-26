import { useAuth0 } from '@auth0/auth0-react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "./AppBar.scss";

export default function ButtonAppBar() {
	const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
	return (
		<Box className='app-bar-container'>
			<AppBar position="static" className='app-bar' style={{ height: '100%' }}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<DashboardIcon />
						{//make this redirect back to homepage
						}
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Graph.it
					</Typography>
					{
						isAuthenticated ?
							<Button onClick={() => logout({ returnTo: window.location.origin })} color="inherit">Logout</Button> :
							<Button onClick={() => loginWithRedirect()} color="inherit">Login</Button>
					}
				</Toolbar>
			</AppBar>
		</Box>
	);
}