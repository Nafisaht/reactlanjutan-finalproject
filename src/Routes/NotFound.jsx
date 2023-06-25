// TODO: answer here
import React from 'react';
// import 
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const NotFound = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            {/* TODO: answer here */}
            <h1>404 | Not Found</h1>
            <Button onClick={handleBack} data-testid="back">
                Take me Back
            </Button>
        </>
    );
};

export default NotFound;
