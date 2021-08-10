import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link'

function CountryDetails({ countryData }) {

    function Languages() {
        if(countryData.languages.length===1) {
            return countryData.languages[0].name
        }
        else if(countryData.languages.length===2) {
            return (countryData.languages[0].name + " and " + countryData.languages[1].name)
        }
        else if(countryData.languages.length===3) {
            return (countryData.languages[0].name + ", " + countryData.languages[1].name + " and " + countryData.languages[2].name)
        }
    }

    function NeighbourCountries() {
        for(var i=0; i<countryData.borders.length; i++) {
            return(
                <Col lg={4}>
                    <img style={{width: "100%", height: "auto"}} src={`https://restcountries.eu/data/${countryData.borders[i].toLowerCase()}.svg`}></img>
                </Col>
            )
        }
    }

    return (
        <>
            <Link href="/">
                <Button style={{height:"auto", borderRadius:"0", fontSize: "calc(60% + 0.5vw + 0.5vh)", border: "2px solid", marginTop: "5%", marginLeft: "5%"}} variant="outline-success">Back to Home</Button>
            </Link>
           
            <Container style={{paddingLeft: "5%", paddingRight: "5%"}}>
                <h1 style={{fontSize: "calc(100% + 1.5vw + 1.5vh)", fontWeight: "bold", paddingBottom: "2%", paddingTop: "3%"}}>{countryData.name}</h1>
                <Row style={{justifyContent: "center", alignItems: "center"}}>
                    <Col lg={6} md={6} style={{paddingRight: "5%", paddingBottom: "4%"}}>
                        <img src={countryData.flag} width={"100%"} height={"auto"}/>
                    </Col>
                    <Col lg={6} md={6}>
                        <h5 style={{fontSize: "calc(60% + 0.5vw + 0.5vh)", paddingBottom: "1%"}}>Native Name: {countryData.nativeName}</h5>
                        <h5 style={{fontSize: "calc(60% + 0.5vw + 0.5vh)", paddingBottom: "1%"}}>Capital: {countryData.capital}</h5>
                        <h5 style={{fontSize: "calc(60% + 0.5vw + 0.5vh)", paddingBottom: "1%"}}>Population: {countryData.population}</h5>
                        <h5 style={{fontSize: "calc(60% + 0.5vw + 0.5vh)", paddingBottom: "1%"}}>Region: {countryData.region}</h5>
                        <h5 style={{fontSize: "calc(60% + 0.5vw + 0.5vh)", paddingBottom: "1%"}}>Sub-region: {countryData.subregion}</h5>
                        <h5 style={{fontSize: "calc(60% + 0.5vw + 0.5vh)", paddingBottom: "1%"}}>Area: {countryData.area}.0 Km<sup>2</sup></h5>
                        <h5 style={{fontSize: "calc(60% + 0.5vw + 0.5vh)", paddingBottom: "1%"}}>Country Code: +{countryData.callingCodes[0]}</h5>
                        <h5 style={{fontSize: "calc(60% + 0.5vw + 0.5vh)", paddingBottom: "1%"}}>Languages: {Languages()}</h5>
                        <h5 style={{fontSize: "calc(60% + 0.5vw + 0.5vh)", paddingBottom: "1%"}}>Currencies: {countryData.currencies[0].name}</h5>
                        <h5 style={{fontSize: "calc(60% + 0.5vw + 0.5vh)", paddingBottom: "1%"}}>Timezones: {countryData.timezones[0]}</h5>
                    </Col>
                </Row>
            </Container>

            <Container style={{paddingLeft: "6%", paddingRight: "1%", paddingTop: "1%", marginBottom: "5%", marginTop: "5%", border: "2px solid lightgray"}}>
                <h2 style={{fontWeight: "bold", paddingBottom: "5%", fontSize: "calc(80% + 1vw + 1vh)"}}>Neighbour Countries</h2>
                <Row style={{justifyContent: "center", alignItems: "center"}}>
                    {
                        countryData.borders.map((countryFlag)=>{
                            return (
                                <Col lg={4} md={4} sm={6} style={{paddingBottom: "5%"}}>
                                    <img style={{width: "80%", height: "auto"}} src={`https://restcountries.eu/data/${countryFlag.toLowerCase()}.svg`}></img>
                                </Col>
                            )
                        })
                    }
                    {/* {
                        for(var i=0; i<countryData.borders.length; i++) {
                                <Col lg={4}>
                                    <img style={{width: "100%", height: "auto"}} src={`https://restcountries.eu/data/${countryData.borders[i].toLowerCase()}.svg`}></img>
                                </Col>
                        }
                    } */}
                    {/* {NeighbourCountries()} */}
                </Row>
            </Container>
        </>
    )
}

export default CountryDetails

export const getServerSideProps = async (context) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${context.params.alpha3Code}`);
    const countryData = await res.json();

    return {
        props: {
            countryData,
        },
    };
};