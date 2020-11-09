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
    csvData = csvData.slice(1,csvData.lenght) //Se le quitan los headers
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
    putChiSquaredAtributeOptions(attNominales);
    updateTable(attNominales);
}

function searchNominalAttributes(){
    let i=0;
    let nominalAtts=[]
    ingresedAtributes.forEach(element =>{
        let exampleData =  parseFloat(csvData[1][i])
        if(isNaN(exampleData)){
            nominalAtts.push(element);
        }
        i++;
    })
    return nominalAtts;
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

function atributeSelected(option){
    let containterSelected = document.querySelector("#containterSelectedAtributesChi")
    let countHijos = containterSelected.childElementCount
    if(countHijos < 2){
        containterSelected.innerHTML += "<span>"+ option.text + "</span>";
        option.parentNode.removeChild(option);
    }
    if(countHijos==2){
        document.getElementById("containterSelectedAtributesChi").style.borderColor="red"
    }
}

function updateTable(headers){

}
