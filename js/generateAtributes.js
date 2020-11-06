
async function generateAtributes(div, headers) {
    //atributes / Columnas
    headers.forEach(element => {
        let att = document.createElement("div");
        let text = document.createTextNode(element);
        let idNoSpace = element.trim().replaceAll(" ","_")
        att.setAttribute("id","att-"+idNoSpace)
        att.classList.add("attribute-red")
        att.appendChild(text);
        div.appendChild(att);
    });
}
    