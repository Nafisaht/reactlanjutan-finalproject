// TODO: answer here
import React from 'react';
import { Button, Text, Heading, Link, Box, Flex } from '@chakra-ui/react';
// import { Text } from '@chakra-ui/react';
// import { Link } from '@chakra-ui/react';
import { Link as RouterLink} from 'react-router-dom';

const NavBar = () => {
    return (
        <Box>
            <Heading data-testid="home-page">
                <Link as={RouterLink} to="/" data-testid="student-btn">
                    <Button>Student Portal</Button> 
                </Link>
            </Heading>
            <Flex>
                <Text>
                    <Link as={RouterLink} to="/student" data-testid="student-page">
                        <Button>All student</Button>
                    </Link>
                </Text>
                <Text>
                    <Link as={RouterLink} to="/add" data-testid="add-page">
                        <Button>Add student</Button>
                    </Link>
                </Text>
            </Flex>
        {/* <Text>
            <h1 data-testid="home-page">
                <Link as={RouteL} to="/" data-testid="student-btn">
                    <Button>Student Portal</Button>
                    
                </Link>
            </h1>
        <Link as={RouteL} to="/student" data-testid="student-page">
            <Button>All student</Button>
        </Link>
        
        <Link as={RouteL} to="/add" data-testid="add-page">
            <Button>Add student</Button>
        </Link>
        </Text> */}
        </Box>
        // TODO: answer here
    );
};

export default NavBar;
