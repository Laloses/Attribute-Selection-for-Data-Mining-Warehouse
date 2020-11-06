let csvFile = {
    size:0,
    dataFile:[]
};
let csvData=[];

async function readFile(input, callback) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.readAsBinaryString(input.files[0]);
        reader.onload = function (e) {
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

const table = document.querySelector("#table");
const divAtributes = document.querySelector("#atributes");
let ingresedAtributes = [];

async function parseData(data){
    let lbreak = data.split("\n");
    lbreak.forEach(res => {
        csvData.push(res.split(","));
    });
    ingresedAtributes = csvData[0];

    generateAtributes(divAtributes, ingresedAtributes);
    selectAtributes(ingresedAtributes);
    generateTable(table, csvData);
}

function Loading(bool){
    var div = document.getElementById("loader");
    if( bool )
        div.classList.add("is-active")
    else
        div.classList.remove("is-active")
}

function selectAtributes(atributes){
    atributes.forEach(element => {
        let idNoSpace = element.trim().replaceAll(" ","_")
        let att = document.querySelector("#att-"+idNoSpace);

        if(ingresedAtributes.includes(element)){
            att.classList.replace("attribute-red", "attribute-green")
        }
        else{
            att.classList.replace("attribute-green", "attribute-red")
        }
    });
}

function chiSquared(){
    let attNominales = searchNominalAttributes();
}

function searchNominalAttributes(){

}

