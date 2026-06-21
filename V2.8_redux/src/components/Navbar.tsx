import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {styled} from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuList from '@mui/material/MenuList';
import React from 'react';
import {Link} from 'react-router-dom';

const StyledToolBar = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '8px 12px',
}));

interface ComponentProps {
  active: string;
};

function Navbar({active}: ComponentProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


    return (
        <AppBar
          position = "static"
          sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            mt: '28px',
          }}
        >
          <Container maxWidth = "xl">
              <StyledToolBar>
                <Typography variant = "h6" sx = {{color : '#5d8aa8'}}>
                    Самык высокие здания в мире
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <Link to="/">
                    <Button variant={active === "1"? "contained": "text"} color="info" size="medium">
                      Главная
                    </Button>
                  </Link>
                  <Link to="/list">
                    <Button variant={active === "2"? "contained": "text"} color="info" size="medium">
                      Список зданий
                    </Button>
                  </Link>
                  <Link to="/chart">
                    <Button variant={active === "3"? "contained": "text"} color="info" size="medium">
                      Диаграммы
                    </Button>
                  </Link>
                  <Link to="/test">
                    <Button variant={active === "4"? "contained": "text"} color="info" size="medium">
                      Проверь себя
                    </Button>
                  </Link>
                </Box>
                <Box sx = {{display: {xs: 'flex', md: 'none'}}}>
                  <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                  </IconButton>
                </Box>
                <Drawer anchor = "top" open = {open} onClose={toggleDrawer(false)}>
                  <Box>
                    <Box sx = {{display: "flex", justifyContent: "flex-end"}}>
                      <IconButton onClick={toggleDrawer(false)}>
                        <CloseRoundedIcon />
                      </IconButton>
                    </Box>
                    <MenuList>
                      <Link to="/">
                        <MenuItem
                        onClick={toggleDrawer(false)}
                        sx={{
                          backgroundColor: active === "1" ? '#0288d1' : 'transparent',
                          color: active === "1" ? 'white' : 'inherit',
                          '&:hover': {
                            backgroundColor:
                              active === "1" ? '#0288d1' : '#cfe8f3',
                          },
                        }}
                        >Главная</MenuItem>
                      </Link>
                      <Link to="/list">
                        <MenuItem
                        component = {Link}
                        to = "/list"
                        onClick={toggleDrawer(false)}
                        sx={{
                          backgroundColor: active === "2" ? '#0288d1' : 'transparent',
                          color: active === "2" ? 'white' : 'inherit',
                          '&:hover': {
                            backgroundColor:
                              active === "2" ? '#0288d1' : '#cfe8f3',
                          },
                        }}
                        >Список всех зданий</MenuItem>
                      </Link>
                      <Link to="/chart">
                        <MenuItem
                        sx={{
                          backgroundColor: active === "3" ? '#0288d1' : 'transparent',
                          color: active === "3" ? 'white' : 'inherit',
                          '&:hover': {
                            backgroundColor:
                              active === "3" ? '#0288d1' : '#cfe8f3',
                          },
                        }}
                        >Диаграммы</MenuItem>
                      </Link>
                      <Link to="/test">
                        <MenuItem
                        sx={{
                          backgroundColor: active === "3" ? '#0288d1' : 'transparent',
                          color: active === "3" ? 'white' : 'inherit',
                          '&:hover': {
                            backgroundColor:
                              active === "3" ? '#0288d1' : '#cfe8f3',
                          },
                        }}
                        >Проверь себя</MenuItem>
                      </Link>
                    </MenuList>
                  </Box>
                </Drawer>
              </StyledToolBar>
          </Container>
        </AppBar>
    );
}
export default Navbar;