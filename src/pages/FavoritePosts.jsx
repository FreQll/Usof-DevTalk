import React, { useEffect, useState } from 'react';
import UserService from '../API/UserService';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';
import PostsList from '../components/Posts/PostsList';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FavoritePosts = () => {
    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate("/");
            return;
        };
        UserService.getFavoritePosts(user.id).then((response) => {
            setPosts(response.data);
        });
    }, [user?.id]);

    return (
        <Container>
            <Typography sx={{mb: 4}} variant="h4">My Favorite Posts</Typography>
            <PostsList posts={posts} />
        </Container>
    );
};

export default FavoritePosts;