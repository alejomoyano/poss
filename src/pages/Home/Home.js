import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from '../../components';

import { Container, Title} from './styles';

const Home = () => {
  const navigate = useNavigate();

    return (
        <Container>
            <Title variant="h1" sx={{color: 'black'}}>Tomato</Title>
            <Button
                onClick={() => navigate('/create')}
                sx={{fontSize: '23px'}}
            >
                Create Room
            </Button>
            <Button
                onClick={() => navigate('/join')}
                sx={{fontSize: '20px'}}
            >
                Join Room
            </Button>
        </Container>
    )
    }
export default Home;
