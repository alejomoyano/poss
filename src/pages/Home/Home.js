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
                data-testid="create-button"
                onClick={() => navigate('/create')}
            >
                Create Room
            </Button>
            <Button
                data-testid="join-button"
                onClick={() => navigate('/join')}
            >
                Join Room
            </Button>
        </Container>
    )
    }
export default Home;
