type GeoSVGProps = {
  geoURL: string
}

function GeoSVG({ geoURL }: GeoSVGProps) {
  return (
    <>
      <div className="flex p-8 justify-center items-center">
        <img className="h-[30vh]" src={geoURL}></img>
      </div>
    </>
  )
}

export default GeoSVG
