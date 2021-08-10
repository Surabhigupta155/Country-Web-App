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
      <Container style={{paddingLeft: "12%", paddingRight: "12%", paddingBottom: "3%"}}>
        <h1 style={{fontSize: "calc(100% + 1.5vw + 1.5vh)", fontWeight: "bold", paddingBottom: "2%", paddingTop: "3%"}}>Countries</h1>
            <input style={{width: "100%", padding: "2%", border: "2px solid lightgray", fontSize: "calc(70% + 0.6vw + 0.6vh)"}} type="text" className="input" placeholder="Search countries" onChange={search}/>
      </Container>
      {
        newcountries.map(country => {
          return (
            <>
              <Container style={{paddingLeft: "12%", paddingRight: "12%", paddingBottom: "3%"}}>
                  <Card style={{border: "2px solid lightgray"}}>
                    <Row style={{padding: "2%", justifyContent: "center", alignItems: "center"}}>
                      <Col lg={5} md={5}>
                        <img src={country.flag} width={"100%"}
                        height={"auto"}/>
                      </Col>
                      <Col lg={7} md={7}>
                        <h2 style={{fontWeight: "bold", paddingBottom: "2%", fontSize: "calc(100% + 1.1vw + 1.1vh)"}}>{country.name}</h2>
                        <h5 style={{paddingBottom: "2%", fontSize: "calc(60% + 0.4vw + 0.4vh)"}}>Currency: {country.currencies[0].name}</h5>
                        <h5 style={{paddingBottom: "2%", fontSize: "calc(60% + 0.4vw + 0.4vh)"}}>Current date and time: {calcTime(country.timezones[0].slice(3).replace(":", "."))}</h5>
                        <Row>
                          <Col lg={6} md={6}>
                            <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${country.name}`}><Button style={{width:"100%", height:"auto", borderRadius:"0", fontSize: "calc(60% + 0.5vw + 0.5vh)", border: "2px solid", marginBottom: "2%"}} variant="outline-primary">Show Map</Button></a>
                          </Col>
                          <Col lg={6} md={6}>
                            <Link href={`/details/${country.alpha3Code}`}>
                              <Button style={{width:"100%", height:"auto", borderRadius:"0", fontSize: "calc(60% + 0.5vw + 0.5vh)", border: "2px solid"}} variant="outline-primary">Detail</Button>
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