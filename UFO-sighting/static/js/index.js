//Create the dropdown menu for shape filter

//Create list of unique shapes
const shapes = data.map(ufo => ufo.shape);
const uniqueShapes = Array.from(new Set(shapes));

//Create filter option for each shape
//Set select tag to append options too
const shapeFilter = d3.select("#shape");
//Loop through list of unique shapes to append each as an option
uniqueShapes.forEach(shape => {
    let option = shapeFilter.append("option");
    option.text(shape);
});