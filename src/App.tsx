import GeoSVG from './components/GeoSVG'

function App() {
  return (
    <>
      <div className="font-mono">Guess the country</div>
      <GeoSVG countryId='85632307'/>
    </>
  )
}

export default App

/*
api_method('../id') {
  database save json??
  local file
  1. get json data by country id
  (fs.readFile('..../{id}'))
  2. json2svg function
  3. return svg
}
* */