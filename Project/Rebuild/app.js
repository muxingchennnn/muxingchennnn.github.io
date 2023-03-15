let width = window.innerWidth - 70
let height = window.innerHeight

const svg = d3.select('#mapbase').attr('width', width).attr('height', height)

Promise.all([
  d3.json('dataset/world-alpha3.json'),
  d3.csv('dataset/atlantic hurricane.csv'),
]).then(function (dataCollection) {
  // store the data in a variable
  const mapData = topojson.feature(
    dataCollection[0],
    dataCollection[0].objects.countries
  ).features

  const hurricaneData = dataCollection[1]
  console.log(dataCollection)
  console.log(mapData)
  console.log(hurricaneData)

  // select a projection
  const projection = d3
    .geoMercator()
    .fitSize([width, height], mapData)
    .translate([1650, 950])
    .scale(900)

  // generate path based on projection
  const path = d3.geoPath().projection(projection)

  // draw the map
  const map = svg
    .append('g')
    .selectAll('path')
    .data(mapData)
    .join('path')
    // d attribute in <path>
    .attr('d', path)
    .attr('fill', '#252525')
    .attr('vector-effect', 'non-scaling-stroke')
    .attr('stroke', '#999')
    .attr('stroke-width', '0.4px')
    .attr('class', 'map')

  // transform string in csv file into number
  hurricaneData.forEach(function (d) {
    d.Latitude = +d.Latitude
    d.Longtitude = +d.Longtitude
    d.MPH = +d.MPH
    // Year = d3.timeFormat("%Y");
    d.Year = +d.Year
  })
  console.log(hurricaneData)

  const groupedByID = d3.groups(hurricaneData, function (d) {
    return d.ID
  })
  console.log(groupedByID)

  let retrive = groupedByID.forEach(function (d) {
    return {
      type: 'LineString',
      // coordinates:
    }
  })
  console.log(retrive)

  //   let groupedByLandfall = d3.group(hurricaneData, function (d) {
  //     return d.
  //   })
  //   console.log(groupedByLandfall)

  // draw the hurricanes
  const hurricane = svg
    .selectAll('circle')
    .data(hurricaneData)
    .join('circle')
    // .attr('transform', function (d) {
    //   return 'translate(' + projection([+d.Longtitude, +d.Latitude]) + ')'
    // })
    .attr('cx', (d) => projection([+d.Longtitude, +d.Latitude])[0])
    .attr('cy', (d) => projection([+d.Longtitude, +d.Latitude])[1])
    // .attr('r', (d) => size(+d.n))
    .attr('r', 2)
    // .attr('stroke', )
    // .attr('stroke-width', 1)
    .attr('fill', '#5a6aa0')
  // .attr('fill-opacity', 0.4)

  svg
    .append('g')
    .selectAll('myPath')
    .data(link)
    .join('path')
    .attr('d', function (d) {
      return path(d)
    })
    .style('fill', 'none')
    .style('stroke', 'orange')
    .style('stroke-width', 7)
    .attr('')
})
