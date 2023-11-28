import { Pagination } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, setCurrentPage } from '../store/postSlice';


const MyPagination = () => {
    const totalCount = useSelector(selectPosts).totalPosts;
    const currentPage = useSelector(selectPosts).currentPage;
    const dispatch = useDispatch();

    const handleChange = (event, value) => {
        dispatch(setCurrentPage(value))
        window.scrollTo(0, 0);
    }

    console.log(currentPage)

    return (
        <Pagination count={Math.ceil(totalCount / 5)} variant="outlined" color="primary" value={currentPage} onChange={handleChange}/>
    );
};

export default MyPagination;