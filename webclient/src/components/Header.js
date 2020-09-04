import React from 'react';
import {AppBar, Button, Typography, Toolbar} from '@material-ui/core'

const Header = () => {
  return (<>
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        WeWhatsgram
      </Typography>
      <Button color="inherit">Login</Button>
      <Button color="inherit">Signup</Button>
      </Toolbar>
    </AppBar>
  </>);
}
 
export default Header