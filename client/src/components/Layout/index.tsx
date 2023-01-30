import React, {useContext, useEffect, useState} from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { Route, Routes, Navigate, Link, useNavigate } from "react-router-dom";
import BooksList from "../Books-list";
import Login from "../login";
import { UserContext } from "../../context/userContext";
import BookForm from "../BookForm";
import WithLoginProtector from "../accessControl/login-protector";
import {WithAdminProtector}from "../accessControl/admin-protector";
import Book from "../Book";

const Header = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, loginUser, logoutUser, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLoginSubmit = (username: string, password: string) => {
    loginUser(username, password);
    setOpenLoginDialog(false);
  };

  const handleLoginClose = () => {
    setOpenLoginDialog(false);
  };

  const handleLogout = () => {
    logoutUser();
    handleCloseUserMenu();
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (isAdmin) {
      navigate("/admin/books/add");
    }
  }, [user, isAdmin]);

  // @ts-ignore
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: "flex", mr: 1 }} />
            <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: "flex",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                }}
              >
                Library Management System
              </Typography>
            </Link>
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              {user ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar>
                        {" "}
                        {user?.username.charAt(0).toUpperCase()}{" "}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setOpenLoginDialog(true);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route path="/books" element={<BooksList />} />
        <Route
          path="/books/:bookIsbn"
          element={
            <WithLoginProtector>
              <Book />
            </WithLoginProtector>
          }
        />
        <Route
          path="/admin/books/add"
          element={
            <WithLoginProtector>
              <WithAdminProtector>
                <BookForm />
              </WithAdminProtector>
            </WithLoginProtector>
          }
        />
        <Route
          path="/admin/books/:bookIsbn/edit"
          element={
            <WithLoginProtector>
              <WithAdminProtector>
                <BookForm />
              </WithAdminProtector>
            </WithLoginProtector>
          }
        />
        <Route path="*" element={<Navigate to="/books" replace />} />
      </Routes>
      <Login
        open={openLoginDialog}
        handleSubmit={handleLoginSubmit}
        handleClose={handleLoginClose}
      />
    </>
  );
};

export default Header;
