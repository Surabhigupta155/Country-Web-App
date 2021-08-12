import CountryListItem from './countryitem.js'
import { Container} from 'react-bootstrap';
import { useState } from 'react';

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
            <CountryListItem model={country}/>
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