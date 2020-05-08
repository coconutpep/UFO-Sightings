//Read in data as a different variable for changing
let ufos = data;

//Add shape input menu
//Select shape input
const shape = d3.select("#shape");
//Array to list of unique shapes
const shapes = []
//Iterate through data to push unique shapes to above array
ufos.forEach(ufo => {
    //Check if shape is already in array push to it if not
    if (shapes.includes(ufo.shape) === false) {
        shapes.push(ufo.shape);
    }
});
//Iterate through shapes and append options to shape input
shapes.forEach(shapeOption => {
    shape.append("option").text(shapeOption);
});
//Select inputs for later filtering
const dateInput = d3.select("#datetime");
const cityInput = d3.select("#city");
const stateInput = d3.select("#state");
const countryInput = d3.select("#country");
const shapeInput = d3.select("#shape");
const form = d3.select("form");

//Create table from data
//select table
const table = d3.select("table");
//Select table body
const tbody = d3.select("tbody");
//Create Function to title case cities
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

//Function to filter data
function runFilter() {
    //Prevent page refresh
    d3.event.preventDefault();
    //Create iterable array of table rows
    const rows = table.selectAll("tr")["_groups"][0];
    //Grab the inputs
    const inputDate = dateInput.property("value");
    //Lower case words to standardize for filter matching
    const inputCity = cityInput.property("value").toLowerCase();
    const inputState = stateInput.property("value").toLowerCase();
    const inputCountry = countryInput.property("value").toLowerCase();
    const inputShape = shapeInput.property("value");
    //Conditional Statement to filter table based on input
    //Date was inputted
    if (inputDate !== "") {
        //For loop iterates through rows and hides data based on input
        for (let i=1; i<rows.length; i++) {
            //Grabs date from row
            const dataDate = rows[i]["cells"][0]["textContent"];
            //Conditional statement to determine if row's date matches input
            if (dataDate === inputDate) {
                //Show data that matches
                rows[i].style.display="";
            }
            else {
                //Hide data that doesn't match
                rows[i].style.display="none";
            }
        }
    }
    //City was inputted
    else if (inputCity !== "") {
        //For loop iterates through table and hides unwanted data
        for (let i=1; i<rows.length; i++) {
            //Grabs city from row and lowercases it for standarization
            const dataCity = rows[i]["cells"][1]["textContent"].toLowerCase();
            //If city names match show data
            if(dataCity === inputCity) {
                rows[i].style.display="";
            }
            //If city names don't match hide data
            else {
                rows[i].style.display="none";
            }
        }
    }
    //State was inputted
    else if (inputState !== "") {
        //For loop iterates through table and hides unwanted data
        for (let i=1; i<rows.length; i++) {
            //Grabs state from row and lowercases it for standarization
            const dataState = rows[i]["cells"][2]["textContent"].toLowerCase();
            //If state names match show data
            if(dataState === inputState) {
                rows[i].style.display="";
            }
            //If state names don't match hide data
            else {
                rows[i].style.display="none";
            }
        }
    }
    else if (inputCountry !== "") {
        //For loop iterates through table and hides unwanted data
        for (let i=1; i<rows.length; i++) {
            //Grabs country from row and lowercases it for standarization
            const dataCountry = rows[i]["cells"][3]["textContent"].toLowerCase();
            //If country names match show data
            if(dataCountry === inputCountry) {
                rows[i].style.display="";
            }
            //If country names don't match hide data
            else {
                rows[i].style.display="none";
            }
        }
    }
    else if (inputShape !== "") {
        //For loop iterates through table and hides unwanted data
        for (let i=1; i<rows.length; i++) {
            //Grabs shape from row and lowercases it for standarization
            const dataShape = rows[i]["cells"][4]["textContent"];
            //If shape names match show data
            if(dataShape === inputShape) {
                rows[i].style.display="";
            }
            //If shape names don't match hide data
            else {
                rows[i].style.display="none";
            }
        }
    }
    //Resets table if all fields are blank
    else {
        for (let i=1; i<rows.length; i++) {
            rows[i].style.display="";
        }
    }
}

//Create table
function createTable (arr){
    arr.forEach(ufo => {
        let row = tbody.append("tr");
        row.append("td").text(ufo.datetime);
        //Append Title Cased cities
        row.append("td").text(toTitleCase(ufo.city));
        //Append Capatalized states
        row.append("td").text(ufo.state.toUpperCase());
        //Append Capatilized Country Codes
        row.append("td").text(ufo.country.toUpperCase());
        row.append("td").text(ufo.shape);
        row.append("td").text(ufo.durationMinutes);
        row.append("td").text(ufo.comments);
    });
}
createTable(ufos);

//Filter data based on form submission
dateInput.on("change", runFilter);
cityInput.on("change", runFilter);
stateInput.on("change", runFilter);
countryInput.on("change", runFilter);
shapeInput.on("change", runFilter);
form.on("submit", runFilter);