import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link'

function calcTime(offset) {

    let d = new Date();
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    let nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleString();
  
}

function CountryListItem ({model}) {
    return (
        <Container className="countries">
                  <Card className="card">
                    <Row className="countriesrow">
                      <Col lg={5} md={5}>
                        <img src={model.flag} width={"100%"}
                        height={"auto"}/>
                      </Col>
                      <Col lg={7} md={7}>
                        <h2 className="homeh2">{model.name}</h2>
                        <h5 className="homeh5">Currency: {model.currencies[0].name}</h5>
                        <h5 className="homeh5">Current date and time: {calcTime(model.timezones[0].slice(3).replace(":", "."))}</h5>
                        <Row>
                          <Col lg={6} md={6}>
                            <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${model.name}`}><Button className="buttoncountries" variant="outline-primary">Show Map</Button></a>
                          </Col>
                          <Col lg={6} md={6}>
                            <Link href={`/details/${model.alpha3Code}`}>
                              <Button className="buttoncountries" variant="outline-primary">Detail</Button>
                            </Link>
                          </Col>
                        </Row>
                        
                      </Col>
                    </Row> 
                  </Card>
        </Container>
    )
}

export default CountryListItem