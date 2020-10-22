import React from 'react';
import Container from "@material-ui/core/Container";
import Button from "./Button";

export default function() {
    return(
        <Container maxWidth="sm" style={{height: '300px'}}>
            <img  alt="complex" src={require('../static/logo192.png')} />
            <Button />
        </Container>
        );

}