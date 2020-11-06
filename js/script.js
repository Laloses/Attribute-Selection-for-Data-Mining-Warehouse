let csvFile = {
    size:0,
    dataFile:[]
};

async function readFile(input, callback) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.readAsBinaryString(input.files[0]);
        reader.onload = function (e) {
            console.log(e);
            csvFile.size = e.total;
            csvFile.dataFile = e.target.result
            //console.log(csvFile.dataFile)
            parseData(csvFile.dataFile)
            setTimeout(() => {
                callback(false)
            }, 500); 
        }
    }
}

async function parseData(data){
    let csvData = [];
    let lbreak = data.split("\n");
    lbreak.forEach(res => {
        csvData.push(res.split(","));
    });
    console.table(csvData);
    
    let table = document.querySelector("table");
    generateTable(table, csvData);
}


function Loading(bool){
    console.log("entre")
    var div = document.getElementById("loader");
    if( bool )
        div.classList.add("is-active")
    else
        div.classList.remove("is-active")
}

