import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar/Navbar";
import UserPage from "./pages/UserPage";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import AdminPanel from "./pages/AdminPanel";
import PostPage from "./pages/PostPage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import EditUserPage from "./pages/EditUserPage";
import FavoritePosts from "./pages/FavoritePosts";
import CreateUser from "./pages/CreateUser";
import PageNotFound from "./pages/PageNotFound";
import CreateCategory from "./pages/CreateCategory";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectThemeMode } from "./store/themeSlice";
import Categories from "./pages/Categories";
import Users from "./pages/Users";

function App() {
  const themeReducer = useSelector(selectThemeMode);

  const theme = createTheme({
    palette: {
      mode: themeReducer,
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/:login" element={<UserPage />} />
            <Route path="user/:id/edit-profile" element={<EditUserPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/post/:id/edit-post" element={<EditPost />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ChangePassword />}
            />
            <Route path="/posts/create-new-post" element={<CreatePost />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route
              path="/admin-panel/create-new-user"
              element={<CreateUser />}
            />
            <Route
              path="/admin-panel/create-new-category"
              element={<CreateCategory />}
            />
            <Route path="/posts/favorite" element={<FavoritePosts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
