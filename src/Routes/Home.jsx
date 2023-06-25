// TODO: answer here
import React from 'react';
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react';

const Home = () => {
    return (
        <Link to="/student">
            <Button data-testid="student-btn" backgroundColor="skyblue">All Student</Button>
        </Link>
    )   
     // TODO: replace this
};

export default Home;
