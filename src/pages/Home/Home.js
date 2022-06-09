import React from "react";
import { useNavigate } from "react-router-dom";

import Button from '../../components/Button';
import { Container } from './styles';

const Home = () => {
    const navigate = useNavigate(); 

    return (
        <Container>
            <Button
                onClick={() => navigate('/create')}
            >
                Create Room
            </Button>
            <Button
                onClick={() => navigate('/join')}
            >
                Join Room
            </Button>
        </Container>
    )

}

export default Home;