
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

async function generateAtributes(div, headers) {
    //atributes / Columnas
    headers.forEach(element => {
        let att = document.createElement("div");
        let text = document.createTextNode(element);
        let idNoSpace = element.replaceAll(" ","_")
        att.setAttribute("id","att-"+idNoSpace)
        att.classList.add("attribute-red")
        att.appendChild(text);
        div.appendChild(att);
    });
}

function getPosHeader(headers){
    let posHeaders = [];
    let attsIngresed = ingresedAtributes.map(att => att.trim())
    headers.forEach(header => {
        posHeaders.push( attsIngresed.indexOf(header) )
    });
    posHeaders.sort()
    return posHeaders;
}

async function atributeSelected(option, loading){
    loading(true); let flag = true
    let countHijos = DIVATRIBUTES.querySelectorAll(".attribute-green").length
    if(countHijos < 2){
        let id = "att-"+ option.text.replaceAll(" ","_")
        DIVATRIBUTES.querySelector("#"+id).classList.replace("attribute-red", "attribute-green")
        option.parentNode.removeChild(option);
    }
    if(countHijos==2){
        DIVATRIBUTES.style.borderColor="red"
        alert("Sólo se pueden seleccionar 2 atributos")
        flag = false
        loading(false)
    }
    
    let attSel = DIVATRIBUTES.querySelectorAll("div.attribute-green")
    let attNominales = []
    attSel.forEach(att =>{
        attNominales.push(att.textContent)
    })

    if(flag)
        setTimeout(() => {
            updateTable(attNominales);
            loading(false)
        }, 500);
}