const TABLE = document.querySelector("#table");
const DIV_ATRIBUTES = document.querySelector("#atributes");
let INGRESED_ATRIBUTES = []; //headers
let CSV_DATA=[];

async function readFile(input, loading) {
    loading(true)
    let csvFile = {size:0,dataFile:[]}

    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.readAsBinaryString(input.files[0]);
        reader.onload = function (e) {
            csvFile.size = e.total;
            csvFile.dataFile = e.target.result
            //console.log(csvFile.dataFile)
            parseData(csvFile.dataFile)
            setTimeout(() => {
                loading(false)
            }, 500); 
        }
    }
}

async function parseData(data){
    let lbreak = data.split("\n");
    lbreak.forEach(res => {
        if(res.length > 0) //Si no es una linea vacía
            CSV_DATA.push(res.split(","));
    });
    INGRESED_ATRIBUTES = CSV_DATA[0].map(att => att.trim())

    generateAtributes(DIV_ATRIBUTES, INGRESED_ATRIBUTES);
    selectAtributes(INGRESED_ATRIBUTES);
    generateTable(TABLE, CSV_DATA);
    //CSV_DATA = CSV_DATA.slice(1,CSV_DATA.lenght) //Se le quitan los headers
    console.log(CSV_DATA.length)
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
        let idNoSpace = element.replaceAll(" ","_")
        let att = document.querySelector("#att-"+idNoSpace);

        if(INGRESED_ATRIBUTES.includes(element)){
            att.classList.replace("attribute-red", "attribute-green")
        }
        else{
            att.classList.replace("attribute-green", "attribute-red")
        }
    });
}

function chiSquared(){
    let attNominales = searchNominalAttributes();
    putChiSquaredAtributeOptions(attNominales);
    let attsSelected = DIV_ATRIBUTES.querySelectorAll("div")
    attsSelected.forEach(att => att.classList.replace("attribute-green","attribute-red") )
}

function putChiSquaredAtributeOptions(atributos){
    let containerSelect = document.querySelector("#selectAtributeOptions")
    containerSelect.innerHTML = "<option>Atributos</option>"
    atributos.forEach(nomAtt => {
        let option = document.createElement("option")
        option.text = nomAtt;
        option.setAttribute("value",nomAtt)
        containerSelect.add(option)
    })
}

