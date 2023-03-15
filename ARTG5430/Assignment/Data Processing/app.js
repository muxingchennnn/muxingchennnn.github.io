// // parse multiple dataset
// Promise.all([
//   d3.csv('dataset/cities-sm.csv'),
//   d3.json('dataset/countrycode-sm.json'),
// ]).then(function ([city, country]) {
//   console.log(city)
//   console.log(country)
// })

// Promise.all([
//   d3.csv('dataset/cities-sm.csv'),
//   d3.json('dataset/countrycode-sm.json'),
// ]).then(function (dataCollection) {
//   let city2 = dataCollection[0]
//   let country2 = dataCollection[1]
//   console.log(dataCollection)
//   console.log(city2)
//   console.log(country2)
// })

// const loadData = async () => {
//   let city3 = await d3.csv('dataset/cities-sm.csv')
//   let country3 = await d3.json('dataset/countrycode-sm.json')
//   console.log(city3)
//   console.log(country3)
// }
// loadData()

// function parseLog(d) {
//   console.log(d)
// }

// function parseCSVIntoNum(d) {
//   return {
//     city: d.city,
//     state: d.state,
//     population: +d.population,
//     'land area': +d['land area'],
//   }
// }

// d3.text('dataset/file.text').then(parseLog)
// d3.csv('dataset/cities-sm.csv').then(parseLog)
// d3.json('dataset/countrycode-sm.json').then(parseLog)

// d3.csv('dataset/cities-sm.csv', parseCSVIntoNum).then(parseLog)

// d3.csv('dataset/cities-sm.csv').then(function (data) {
//   data.forEach(function (d) {
//     // (d.city = d.city),
//     //   (d.state = d.state),
//     ;(d.population = +d.population), (d['land area'] = +d['land area'])
//   })
//   console.log(data)

//   let filtered_data = data.filter(function (d) {
//     return d.state === 'WA'
//   })
//   console.log(filtered_data)

//   let grouped_data = d3.group(data, function (d) {
//     return d.city
//   })
//   console.log(grouped_data)
//   console.log(grouped_data.get('new york'))
// })

function parseData(d) {
  if (d.likes > 1000000) {
    return {
      channelTitle: d.channelTitle,
      category: d.category,
      title: d.title,
      // modify the name of the column and convert string into numbers
      comments: +d.comment_count,
      dislikes: +d.dislikes,
      likes: +d.likes,
      views: +d.view_count,
    }
  }
}

// d3.csv('dataset/YoutubeTrendingVideos-ARTG5430.csv', parseData).then(function (
//   data
// ) {
//   console.log(data)
// })

d3.csv('dataset/YoutubeTrendingVideos-ARTG5430.csv').then(function (data) {
  console.log(data)
})
