
function searchNominalAttributes(){
    let i=0;
    let nominalAtts=[]
    INGRESED_ATRIBUTES.forEach(element =>{
        let exampleData =  parseFloat(CSV_DATA[1][i])
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

async function atributeSelected(option, loading){
    loading(true); let flag = true
    let countHijos = DIV_ATRIBUTES.querySelectorAll(".attribute-green").length
    if(countHijos < 2){
        let id = "att-"+ option.text.replaceAll(" ","_")
        DIV_ATRIBUTES.querySelector("#"+id).classList.replace("attribute-red", "attribute-green")
        option.parentNode.removeChild(option);
    }
    if(countHijos==2){
        DIV_ATRIBUTES.style.borderColor="red"
        alert("Sólo se pueden seleccionar 2 atributos")
        flag = false
        loading(false)
    }
    
    let attSel = DIV_ATRIBUTES.querySelectorAll("div.attribute-green")
    let listAtt = []
    attSel.forEach(att => listAtt.push( att.textContent) )

    if(flag)
        setTimeout(() => {
            updateTable(listAtt);
            loading(false)
        }, 500);
}