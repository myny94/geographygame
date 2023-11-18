type GeoSVGProps = {
  countryId: string
}

function GeoSVG({ countryId }: GeoSVGProps) {
  return (
    <>
      <div className='card'>
        <img src={`http://localhost:8080/geosvg/${countryId}`}></img>
      </div>
    </>
  )
}

export default GeoSVG
