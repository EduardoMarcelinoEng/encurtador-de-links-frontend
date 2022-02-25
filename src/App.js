import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Col, Form, Button, Spinner, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import config from './config';
import moment from 'moment';

function App() {

  const [link, setLink] = useState('');

  const [shortenedLink, setShortenedLink] = useState('');

  const [loading, setLoading] = useState(false);

  const createOrCopiedShortenedLink = ()=>{

    if(shortenedLink){
      navigator.clipboard.writeText(shortenedLink);
      setShortenedLink('');
      return false;
    }

    setLoading(true);
    axios.post(`${config.url}`, {
      link
    })
      .then(result=>{
        setShortenedLink(result.data);
        setLink('');
      })
      .catch(error=>alert('Erro'))
      .finally(()=>setLoading(false));
  }

  return (
    <div className="App">
      <div className='centered-content'>
        <Container>
          <Row className='title'>
            <Col>
            <FontAwesomeIcon icon={ faLink } /><h1>Encurtador de Links</h1>
            </Col>
          </Row>
          {(shortenedLink && typeof shortenedLink == 'object') ?
          <Row>
            <Col xs={12}>
              <Table responsive>
                <tbody>
                  <tr>
                    <th>Link</th>
                    <td>{ shortenedLink.short }</td>
                  </tr>
                  <tr>
                    <th>Redirecionamento</th>
                    <td>{ shortenedLink.link }</td>
                  </tr>
                  <tr>
                    <th>Número de acessos</th>
                    <td>{ shortenedLink.numberAccess }</td>
                  </tr>
                  <tr>
                    <th>Último acesso</th>
                    <td>{ moment(shortenedLink.updatedAt).format('DD/MM/YYYY HH:mm') }</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs={12}>
              <Button onClick={()=>setShortenedLink('')}>Voltar</Button>
            </Col>
          </Row>
          : <Row>
            <Col xs={12} md={8}>
              <Form.Control value={shortenedLink || link} onChange={e=>shortenedLink ? setShortenedLink('') : setLink(e.target.value)} type="text" placeholder="Digite seu link aqui" />
            </Col>
            <Col xs={12} md={4}>
              {
                loading ?
                <Spinner animation="border" /> :
                <Button onClick={()=>createOrCopiedShortenedLink()} disabled={!(link || shortenedLink)}>{shortenedLink ? 'Copiar' : 'Encurtar / Informações'}</Button>
              }
            </Col>
          </Row>}
        </Container>
      </div>
    </div>
  );
}

export default App;
