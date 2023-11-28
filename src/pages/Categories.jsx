import React, { useEffect, useState } from 'react';
import CategoriesService from '../API/CategoriesService';
import { Container, Typography } from '@mui/material';
import AllCategories from '../components/Categories/AllCategories';

const Categories = () => {
    const [categories, setCategories] = useState();

    useEffect(() => {
        CategoriesService.getAllCategories().then((response) => {
            setCategories(response.data);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: "20px" }}>All Categories</Typography>
            {categories && <AllCategories categories={categories}/>}
        </Container>
    );
};

export default Categories;