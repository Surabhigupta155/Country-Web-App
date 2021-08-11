import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; 

function calcTime(offset) {

  let d = new Date();
  let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  let nd = new Date(utc + (3600000 * offset));
  return nd.toLocaleString();

}

function CountryList({ countries }) {

  const [newcountries, setCountries] = useState(countries);

  function search(e){
    if (e.target.value ==""){
        setCountries(countries)
    }else{
      const x = countries.filter((item) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setCountries(x)
    }
  }

  return (
    <>
      <Container className="homecontainer">
        <h1>Countries</h1>
            <input type="text" className="input" placeholder="Search countries" onChange={search}/>
      </Container>
      {
        newcountries.map(country => {
          return (
            <>
              <Container className="countries">
                  <Card className="card">
                    <Row className="countriesrow">
                      <Col lg={5} md={5}>
                        <img src={country.flag} width={"100%"}
                        height={"auto"}/>
                      </Col>
                      <Col lg={7} md={7}>
                        <h2 className="homeh2">{country.name}</h2>
                        <h5 className="homeh5">Currency: {country.currencies[0].name}</h5>
                        <h5 className="homeh5">Current date and time: {calcTime(country.timezones[0].slice(3).replace(":", "."))}</h5>
                        <Row>
                          <Col lg={6} md={6}>
                            <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${country.name}`}><Button className="buttoncountries" variant="outline-primary">Show Map</Button></a>
                          </Col>
                          <Col lg={6} md={6}>
                            <Link href={`/details/${country.alpha3Code}`}>
                              <Button className="buttoncountries" variant="outline-primary">Detail</Button>
                            </Link>
                          </Col>
                        </Row>
                        
                      </Col>
                    </Row> 
                  </Card>
              </Container>
            </>
          )
        })
      }
    </>
  )
}

export default CountryList

export async function getStaticProps() {
  const response = await fetch('https://restcountries.eu/rest/v2/all')
  const data = await response.json()
  console.log(data)

  return {
    props: {
      countries: data,
    },
  }
}