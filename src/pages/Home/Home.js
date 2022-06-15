import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from '../../components';

import { Container, Title } from './styles';

const Home = () => {
  const navigate = useNavigate();

    return (
        <Container>
            <Title variant="h2">Tomato</Title>
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
