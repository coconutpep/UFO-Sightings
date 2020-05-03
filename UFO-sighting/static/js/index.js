//Create the dropdown menu for shape filter
//Create list of unique shapes
const shapes = data.map(ufo => ufo.shape);
const uniqueShapes = Array.from(new Set(shapes));
//Create filter option for each shape
//Set select tag to append options too
const shapeFilter = d3.select("#shape");
//Loop through list of unique shapes to append each as an option
uniqueShapes.forEach(shape => shapeFilter.append("option").text(shape));

//Create table from data
//Select table body
const tbody = d3.select("tbody");
//Iterate through data to append to table
data.forEach(ufo => {
    let row = tbody.append("tr");
    row.append("td").text(ufo.datetime);
    row.append("td").text(ufo.city);
    row.append("td").text(ufo.state);
    row.append("td").text(ufo.country);
    row.append("td").text(ufo.shape);
    row.append("td").text(ufo.durationMinutes);
    row.append("td").text(ufo.comments);
});