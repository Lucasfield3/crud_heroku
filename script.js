
const URLAPP = 'https://dev-web-tio-compras.herokuapp.com/compras';

var selectedRow = null

function onFormSubmit() {
    if (validacao()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateItem(formData);
        resetForm();
    }
}


function readAxios(){

    axios.get('http://localhost:8801/compras')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
}

function listaCompras(lista) {
    var table = document.querySelector('table')
    table.innerHTML = initTable()

    
    }


function getComprasID(){
    let id = document.getElementById("id").value;
    axios.get(URLAPP + '/compras/' + id)
        .then(function(response){
            console.log(response);
            if(response.status == 200)
            compra = response.data;
        })
}



function readFormData() {
    var formData = {};
    formData["id"] = document.getElementById("id").value;
    formData["produto"] = document.getElementById("produto").value;
    formData["uniMedida"] = document.getElementById("uniMedida").value;
    formData["qtd"] = document.getElementById("qtd").value;
    formData["categoria"] = document.getElementById("categoria").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("listaDados").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.produto;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.uniMedida;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.qtd;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.categoria;
    cell6 = newRow.insertCell(5);

    cell6.innerHTML = `<a class="btn btn-warning" onClick="editarItem(this)">Editar</a>
                       <a class="btn btn-danger" onClick="deleteItem(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("produto").value = "";
    document.getElementById("uniMedida").value = "";
    document.getElementById("qtd").value = "";
    document.getElementById("categoria").value = "";
    selectedRow = null;
}

function editarItem(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("produto").value = selectedRow.cells[1].innerHTML;
    document.getElementById("uniMedida").value = selectedRow.cells[2].innerHTML;
    document.getElementById("qtd").value = selectedRow.cells[3].innerHTML;
    document.getElementById("categoria").value = selectedRow.cells[4].innerHTML;
}
function updateItem(formData) {
    selectedRow.cells[0].innerHTML = formData.id;
    selectedRow.cells[1].innerHTML = formData.produto;
    selectedRow.cells[2].innerHTML = formData.uniMedida;
    selectedRow.cells[3].innerHTML = formData.qtd;
    selectedRow.cells[4].innerHTML = formData.categoria;
}

function deleteItem(td) {
    if (confirm('Você tem certeza que deseja deletar este item ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("listaDados").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validacao() {
    isValid = true;
    if (document.getElementById("id").value == "") {
        isValid = false;
        document.getElementById("validacaoID").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("validacaoID").classList.contains("hide"))
            document.getElementById("validacaoID").classList.add("hide");
    }
    return isValid;
}

function buscar(){
    var campo = parseInt(document.getElementById('busca-id').value);
    var id = document.getElementById("id").value;
    if(campo == id) tr.innerHTML = id;

}
 