//Read in data as a different variable for changing
let ufos = data;
//Select inputs for later filtering
const dateInput = d3.select("#datetime");
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
    //Conditional Statement to filter table based on input
    //Date was inputted
    if (typeof inputDate === "string") {
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
form.on("submit", runFilter);