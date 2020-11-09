const TABLE = document.querySelector("#table");
const DIVATRIBUTES = document.querySelector("#atributes");
let ingresedAtributes = []; //headers
let csvData=[];

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
        csvData.push(res.split(","));
    });
    ingresedAtributes = csvData[0];
    ingresedAtributes = ingresedAtributes.map(att => att.trim())

    generateAtributes(DIVATRIBUTES, ingresedAtributes);
    selectAtributes(ingresedAtributes);
    generateTable(TABLE, csvData);
    //csvData = csvData.slice(1,csvData.lenght) //Se le quitan los headers
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
    putChiSquaredAtributeOptions(attNominales);
    let attsSelected = DIVATRIBUTES.querySelectorAll("div")
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

