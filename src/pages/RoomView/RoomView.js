import React from "react";
import { observer } from 'mobx-react';

import { Container } from './styles';

const RoomView = () => {
  return (
    <Container></Container>
  );
};

// Envolver el componente en observer nos permite mostrar cambios en tiempo real
// para los documentos/colecciones instanciados con firestorter
export default observer(RoomView);
