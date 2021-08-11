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

    return (
        <>
            <Link href="/">
                <Button className="buttontohome" variant="outline-success">Back to Home</Button>
            </Link>
           
            <Container className="detailcontainer">
                <h1>{countryData.name}</h1>
                <Row className="detailrow">
                    <Col className="colimg" lg={6} md={6}>
                        <img src={countryData.flag} width={"100%"} height={"auto"}/>
                    </Col>
                    <Col lg={6} md={6}>
                        <h5 className="h5detail">Native Name: {countryData.nativeName}</h5>
                        <h5 className="h5detail">Capital: {countryData.capital}</h5>
                        <h5 className="h5detail">Population: {countryData.population}</h5>
                        <h5 className="h5detail">Region: {countryData.region}</h5>
                        <h5 className="h5detail">Sub-region: {countryData.subregion}</h5>
                        <h5 className="h5detail">Area: {countryData.area}.0 Km<sup>2</sup></h5>
                        <h5 className="h5detail">Country Code: +{countryData.callingCodes[0]}</h5>
                        <h5 className="h5detail">Languages: {Languages()}</h5>
                        <h5 className="h5detail">Currencies: {countryData.currencies[0].name}</h5>
                        <h5 className="h5detail">Timezones: {countryData.timezones[0]}</h5>
                    </Col>
                </Row>
            </Container>

            <Container className="neighbourcontainer">
                <h2 className="detailh2">Neighbour Countries</h2>
                <Row className="detailrow">
                    {
                        countryData.borders.map((countryFlag)=>{
                                return (
                                    <Col lg={4} md={4} sm={6} className="colneighours">
                                        <img className="neighbourflag" src={`https://restcountries.eu/data/${countryFlag.toLowerCase()}.svg`}></img>
                                    </Col>
                                )
                        })
                    }
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