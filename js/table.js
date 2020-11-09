
function generateTable(table, data) {
  table.innerHTML=""
  //headers
  let thead = table.createTHead();
  let row = thead.insertRow();
  
  data[0].forEach(element => {
      let th = document.createElement("th");
      let text = document.createTextNode(element);
      th.appendChild(text);
      row.appendChild(th);
  });

  //Contenido
  for (let element of data.slice(1,data.lenght)) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

async function updateTable(headers){
  let posHeaders = getPosHeader(headers)
  let tempData = [];
  csvData.forEach(line => {
      let newLine = []
      posHeaders.forEach(pos =>{
          newLine.push(line[pos])
      })
      tempData.push(newLine)
  });
  console.log(tempData)
  generateTable(TABLE,tempData)
}
  