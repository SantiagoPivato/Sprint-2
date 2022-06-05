let chargesArray = [];

document.getElementById('add-button').onclick = ()=>{
    Swal.fire({
        title: 'Agegar Gasto',
        html:
            '<p>Nombre de quién realizó el gasto</p> \
             <input type="text" id="name" class="swal2-input" placeholder="Nombre"> \
             <p>Cuánto Gastó</p> \
             <input type="number" id="charge" class="swal2-input" placeholder="Gasto">',
        confirmButtonText: 'Agregar',
        confirmButtonColor: '#3F0071'

    }).then(function(swalReturn) {
        if(swalReturn.isConfirmed){
            let name = document.getElementById('name').value;
            let charge = document.getElementById('charge').value;

            if(name && charge){
                let table = document.getElementById('cost-table');
                let tableBody = document.getElementById('cost-table-body');
                let row = document.createElement('tr');
                let content = document.createElement('td');
                let contentBold = document.createElement('b');
                let remove = document.createElement('td');

                content.innerText = name + ': ';
                contentBold.innerText = '$' + convertToTowDecimalNumber(charge);
                content.appendChild(contentBold);

                remove.innerHTML = '<a onclick="remove(this)"><i class="bi bi-x-circle"></i></a>';

                row.appendChild(content);
                row.appendChild(remove);

                tableBody.appendChild(row);

                table.setAttribute('style','display:grid;');

                chargesArray.push(Number(charge));
                updateResults();
            }
        }
    })
}

function remove(anchorElement){
    let tdAnchor = anchorElement.parentNode;
    let row = tdAnchor.parentNode;
    let tbody = row.parentNode;
    
    let rowArray = Array.from(tbody.childNodes);
    let index = rowArray.indexOf(row);
    chargesArray.splice(index,1);
    updateResults();

    row.remove();

    if(rowArray.length == 1){
        let table = document.getElementById('cost-table');
        table.setAttribute('style','display:none;');
    }
}

function updateResults(){
    let totalResult = document.getElementById('total-result');
    let eachResult = document.getElementById('each-result');

    let total = 0;
    let each = 0;
    if(chargesArray.length !== 0){
        total = chargesArray.reduce((prev, curr) => {
            return prev + curr;
        })
        each = total / chargesArray.length;
    }

    totalResult.innerText = '$' + convertToTowDecimalNumber(total);
    eachResult.innerText = '$' + convertToTowDecimalNumber(each);
}

function convertToTowDecimalNumber(num){
    num = num.toString();
    if(num % 1 !== 0){
        let dotIndex = num.indexOf('.');
        return num.slice(0, dotIndex+3);
    }
    else{
        return num + '.00'
    }
}

