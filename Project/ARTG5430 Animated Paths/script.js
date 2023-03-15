let width = window.innerWidth
let height = 800

const svg = d3
  .select('#map')
  // .attr('width', width)
  // .attr('height', height)
  .attr('viewBox', [0, 0, width, height])

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

  // console.log('🚀 ~ file: script.js:19 ~ mapData:', mapData)
  // console.log('🚀 ~ file: script.js:21 ~ hurricaneData:', hurricaneData)

  // transform string in csv file into number
  hurricaneData.forEach(function (d) {
    d.Latitude = +d.Latitude
    d.Longtitude = +d.Longtitude
    d.MPH = +d.MPH
    // Year = d3.timeFormat("%Y");
    d.Year = +d.Year
  })
  console.log('🚀 ~ file: script.js:58 ~ urricaneData:', hurricaneData)

  const hurricaneGroupedByID = d3
    .groups(hurricaneData, (d) => d.ID)
    .filter((d) => d[1].length > 50)

  let landfallData = []

  hurricaneGroupedByID.forEach((d) => {
    let ifLandfall = d[1].findIndex((d) => d.Event === 'L') // if there is no match values, it will return -1
    // console.log(ifLandfall)
    if (ifLandfall > 0) {
      // console.log(d)
      // console.log(d[1].slice(ifLandfall, d[1].length))
      landfallData.push(...d[1].slice(ifLandfall, d[1].length))
    }
  })
  // console.log('🚀 ~ file: script.js:66 ~ landfallData:', landfallData)

  // --------------------------------------------------------------
  // Base map

  // set up projection
  const projection = d3
    .geoMercator()
    .fitSize([width, height], mapData)
    .translate([1500, 900])
    .scale(800)

  // generate path based on projection
  const path = d3.geoPath().projection(projection)

  // draw the map
  const map = svg
    .append('g')
    .attr('class', 'mapPath')
    .selectAll('path')
    .data(mapData)
    .join('path')
    .attr('d', path)
    .attr('fill', '#252525')
    .attr('vector-effect', 'non-scaling-stroke')
    .attr('stroke', '#999')
    .attr('stroke-width', '0.4px')
    .attr('class', 'map')

  // --------------------------------------------------------------
  // Draw dots

  const dots = svg
    .append('g')
    .attr('class', 'dataPoints')
    .selectAll('circle')
    .data(landfallData)
    .join('circle')
    // .attr('transform', function (d) {
    //   return 'translate(' + projection([+d.Longtitude, +d.Latitude]) + ')'
    // })
    .attr('cx', (d) => projection([+d.Longtitude, +d.Latitude])[0])
    .attr('cy', (d) => projection([+d.Longtitude, +d.Latitude])[1])
    // .attr('r', (d) => size(+d.n))
    .attr('r', 4)
    .attr('fill', '#5a6aa0')
  // .attr('fill-opacity', 0.4)
  // .attr('stroke', )
  // .attr('stroke-width', 1)

  // --------------------------------------------------------------
  // Path utility

  const lineProjection = d3
    .line()
    .x((d) => projection([d.Longtitude, d.Latitude])[0])
    .y((d) => projection([d.Longtitude, d.Latitude])[1])
    .curve(d3.curveBasis)
  // .curve(d3.curveLinear)

  const strokeWidthScale = d3
    .scaleOrdinal()
    .domain(['0', '1', '2', '3', '4', '5'])
    .range(['1px', '1.5px', '4px', '8px', '12px', '15px'])

  // --------------------------------------------------------------
  // Setup tooltip
  const tooltip = d3.select('#tooltip').attr('class', 'tooltip')

  let tw = svg.node().clientWidth
  let th = svg.node().clientHeight
  let sx = tw / width
  let sy = th / height

  // --------------------------------------------------------------
  // Hover effect
  dots
    .on('mouseover', function (e, d) {
      let id = d
      let thisPath = hurricaneGroupedByID.find((d) => d[0] === id.ID)
      // console.log(thisPath)
      // console.log(lineProjection(thisPath[1]))

      // Create path
      let singleTrack = svg
        .append('g')
        .attr('class', 'hurricanePath')
        .selectAll('path')
        .data(thisPath[1])
        .join('path')
        .attr('d', lineProjection(thisPath[1]))
        .attr('fill', 'none')
        .attr('vector-effect', 'non-scaling-stroke')
        .attr('stroke', '#FFD602')
        .attr('stroke-width', '4px')

      // Animate path
      let length = singleTrack.node().getTotalLength()
      singleTrack
        .attr('stroke-dasharray', length + ' ' + length)
        .attr('stroke-dashoffset', length)
        .transition()
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .duration(12000)

      let x = sx * +d3.select(this).attr('cx') + 20
      let y = sy * +d3.select(this).attr('cy') - 10

      // let displayValue = d3.format(',')(d.likes)

      tooltip
        .style('visibility', 'visible')
        .style('top', `${y}px`)
        .style('left', `${x}px`).html(`
               <b>ID:</b> ${d.ID}<br>
               <b>Category:</b> ${d.Category}<br>
               <b>Wind Speed:</b> ${d.MPH}`)

      dots.attr('opacity', 0.1)
      d3.select(this).attr('opacity', 1).raise()
    })
    .on('mouseout', function () {
      d3.selectAll('.hurricanePath')
        .transition()
        .ease(d3.easeSinOut)
        .duration(2000)
        .style('stroke-opacity', 0)
        .transition()
        .duration(500)
        .remove() // remove paths
      tooltip.style('visibility', 'hidden')
      dots.attr('opacity', 1)
    })

  // --------------------------------------------------------------
  // Zoom
  svg.call(
    d3
      .zoom()
      .extent([
        [0, 0],
        [width, height],
      ])
      .scaleExtent([1, 4])
      .on('zoom', zoomed)
  )

  function zoomed({ transform }) {
    map.attr('transform', transform)
    dots.attr('transform', transform)
    tracks.attr('transform', transform)
  }
  // --------------------------------------------------------------
})
