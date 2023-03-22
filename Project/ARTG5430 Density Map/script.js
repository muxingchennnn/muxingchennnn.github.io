let width = window.innerWidth
let height = 800

const svg = d3
  .select('#map')
  // .attr('width', width)
  // .attr('height', height)
  .attr('viewBox', [0, 0, width, height])

Promise.all([
  d3.json('dataset/world-alpha3.json'),
  d3.json('dataset/states.json'),
  d3.csv('dataset/atlantic hurricane.csv'),
]).then(function (dataCollection) {
  // store the data in a variable
  const mapData = topojson.feature(
    dataCollection[0],
    dataCollection[0].objects.countries
  ).features
  const states = dataCollection[1]
  const statesInnerData = topojson.mesh(
    states,
    states.objects.states,
    (a, b) => a !== b
  )
  const statesOuterData = topojson.mesh(
    states,
    states.objects.states,
    (a, b) => a === b
  )
  const hurricaneData = dataCollection[2]

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

  const hurricaneGroupedByID = d3.groups(hurricaneData, (d) => d.ID)
  // .filter((d) => d[1].length > 50)

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
  const landfallMajorData = landfallData.filter(
    (d) => d.Category === '3' || d.Category === '4' || d.Category === '5'
  )
  console.log('🚀 ~ file: script.js:66 ~ landfallData:', landfallData)
  console.log('🚀 ~ file: script.js:63 ~ landfallMajorData:', landfallMajorData)

  // --------------------------------------------------------------
  // Base map

  // set up projection
  const projection = d3
    .geoMercator()
    .fitSize([width, height], mapData)
    .translate([3200, 1400])
    .scale(1400)

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

  //US outer borders
  const statesOuter = svg
    .append('path')
    .datum(statesOuterData)
    .attr('class', 'outer')
    .attr('d', path)
    .attr('id', 'usOuter')
    .attr('stroke', '#eeeeee')
    .attr('stroke-width', 1)
  // .style('fill', 'white')

  // US inner borders
  const statesInner = svg
    .append('path')
    .datum(statesInnerData)
    .attr('class', 'inner')
    .attr('d', path)
    .attr('stroke', '#eeeeee')
    .attr('stroke-width', 0.5)
    .attr('stroke-opacity', 0.4)

  // US outer clip path
  svg
    .append('clipPath')
    .attr('id', 'usClipPath')
    .append('use')
    .attr('xlink:href', '#usOuter')

  // --------------------------------------------------------------
  // Draw dots
  const drawDots = function ({ data, dotSize, fill = '#5a6aa0', opacity = 1 }) {
    const dots = svg
      .append('g')
      .attr('class', 'dataPoints')
      .attr('clip-path', 'url(#usClipPath)')
      .attr('fill', 'none')
      // .attr('stroke', '#eeeeee')
      .selectAll('circle')
      .data(data)
      .join('circle')
      // .attr('transform', function (d) {
      //   return 'translate(' + projection([+d.Longtitude, +d.Latitude]) + ')'
      // })
      .attr('cx', (d) => projection([+d.Longtitude, +d.Latitude])[0])
      .attr('cy', (d) => projection([+d.Longtitude, +d.Latitude])[1])
      // .attr('r', (d) => size(+d.n))
      .attr('r', dotSize)
      .attr('fill', fill)
      .attr('opacity', opacity)
    // .attr('fill-opacity', 0.4)
    // .attr('stroke', )
    // .attr('stroke-width', 1)
    return dots
  }
  const dots = drawDots({ data: landfallData, dotSize: 4, opacity: 0.8 })
  // --------------------------------------------------------------
  // Draw contours
  const drawContours = function ({
    data,
    width,
    height,
    bandwidth = 20,
    threshold = 20,
    projection,
  }) {
    const contoursData = d3
      .contourDensity()
      .x((d) => projection([+d.Longtitude, +d.Latitude])[0])
      .y((d) => projection([+d.Longtitude, +d.Latitude])[1])
      // .weight((d) => pop_new(+d.POPULATION))
      .size([width, height])
      .bandwidth(bandwidth)
      .thresholds(threshold)(data)

    console.log('🚀 ~ file: script.js:120 ~ contoursData:', contoursData)

    const colorScale = d3
      .scaleOrdinal()
      .domain(contoursData.map((d) => d.value))
      .range(
        d3.quantize(
          d3.interpolatePurples,
          contoursData.map((d) => d.value).length
        )
      )

    const contours = svg
      .append('g')
      .attr('class', 'dataPoints')
      .attr('clip-path', 'url(#usClipPath)')
      .attr('fill', 'none')
      .selectAll('path')
      .data(contoursData)
      .join('path')
      .attr('d', d3.geoPath())
      .attr('stroke', 'white')
      .attr('opacity', 1)
      .attr('fill', (d) => colorScale(d.value))
      .attr('opacity', 0.4)

    return contours
  }
  const contours = drawContours({
    data: landfallMajorData,
    width: width,
    height: height,
    bandwidth: 10,
    threshold: 10,
    projection: projection,
  })
  // --------------------------------------------------------------
  // Line Animation

  const lineProjection = d3
    .line()
    .x((d) => projection([d.Longtitude, d.Latitude])[0])
    .y((d) => projection([d.Longtitude, d.Latitude])[1])
    .curve(d3.curveBasis)

  dots
    .on('click', function (e, d) {
      let id = d
      let thisPath = hurricaneGroupedByID.find((d) => d[0] === id.ID)
      // console.log(thisPath)
      // console.log(lineProjection(thisPath[1]))

      // Create path
      let singleTrack = svg
        .append('g')
        .attr('class', 'hurricanePathAnimation')
        .selectAll('path')
        .data(thisPath[1])
        .join('path')
        .attr('d', lineProjection(thisPath[1]))
        .attr('fill', 'none')
        .attr('vector-effect', 'non-scaling-stroke')
        .attr('stroke', '#FFD602')
        .attr('stroke-width', '2px')

      // Animate path
      let length = singleTrack.node().getTotalLength()
      singleTrack
        .attr('stroke-dasharray', length + ' ' + length)
        .attr('stroke-dashoffset', length)
        .transition()
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .duration(3000)
    })
    .on('mouseover', function (e, d) {
      let id = d
      let thisPath = hurricaneGroupedByID.find((d) => d[0] === id.ID)
      let singleTrack = svg
        .append('g')
        .attr('class', 'hurricanePath')
        .selectAll('path')
        .data(thisPath[1])
        .join('path')
        .attr('d', lineProjection(thisPath[1]))
        .attr('fill', 'none')
        .attr('vector-effect', 'non-scaling-stroke')
        .attr('stroke', '#5a6aa0')
        .attr('stroke-width', '1px')
        .attr('stroke-opacity', 0.05)

      dots.attr('opacity', 0.1)
      d3.select(this).attr('opacity', 1).raise()
    })
    .on('mouseout', function () {
      d3.selectAll('.hurricanePath').attr('stroke-opacity', 0).remove() // remove paths

      dots.attr('opacity', 1)
    })

  contours.on('click', function (e, d) {
    d3.selectAll('.hurricanePathAnimation')
      .transition()
      .ease(d3.easeSinOut)
      .duration(500)
      .style('stroke-opacity', 0)
      .transition()
      .duration(500)
      .remove() // remove paths
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
    statesOuter.attr('transform', transform)
    statesInner.attr('transform', transform)
    dots.attr('transform', transform)
    contours.attr('transform', transform)
  }
  // --------------------------------------------------------------
})
