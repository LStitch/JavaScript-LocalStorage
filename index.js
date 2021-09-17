function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
    document.getElementById("Input5").value='';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombrejuego = document.getElementById("Input2").value;
    var costo = document.getElementById("Input3").value;
    var genero = document.getElementById("Input4").value;
    var plataforma = document.getElementById("Input5").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var videojuego = {
            id, //numerojuego:id    id:id
            nombrejuego,//nombre:nombre
            costo,
            genero,
            plataforma,
        }

        var lista_videojuegos=JSON.parse(localStorage.getItem("Videojuegos"));

        if(lista_videojuegos==null)
        { 
            var lista_videojuegos = [];
        }
        
        const existe = lista_videojuegos.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_videojuegos=lista_videojuegos.filter(videojuego=>videojuego.id!=id);

            }
                
            lista_videojuegos.push(videojuego);
            var temporal = lista_videojuegos.sort((a,b) => a.id-b.id);
            localStorage.setItem("Videojuegos", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "Success");

        }
        else
        {
            swal("Error", "Ya existe ese id de videojuego","Warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","Warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_videojuegos = JSON.parse(localStorage.getItem("Videojuegos"));
    
     
    if(lista_videojuegos)
    {
        lista_videojuegos.forEach((videojuego)=>printRow(videojuego));
    }
}


function printRow(videojuego){
    
    if(videojuego!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);

        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = videojuego.id;
        cell2.innerHTML = videojuego.nombrejuego; 
        cell3.innerHTML = videojuego.costo;
        cell4.innerHTML = videojuego.genero; 
        cell5.innerHTML = videojuego.plataforma
        cell6.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${videojuego.id})">Eliminar</button>`;
        cell7.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+videojuego.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_videojuegos = JSON.parse(localStorage.getItem("Videojuego"));
    var temporal=lista_videojuegos.filter(videojuego=>videojuego.id!=id);
    localStorage.setItem("Videojuego", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Videojuego");
    }
  
    read();
    
}

function seekR(id){

    const lista_videojuegos = JSON.parse(localStorage.getItem("Videojuegos"));
    var videojuego=lista_videojuegos.filter(videojuego=>videojuego.id==id);
    //console.log(videojuego[0]);
    updateR(videojuego[0]);
}

function updateR(videojuego){
    if(videojuego!=null)
    {
        document.getElementById("Input1").value=videojuego.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=videojuego.nombrejuego;
        document.getElementById("Input3").value=videojuego.costo;
        document.getElementById("Input4").value=videojuego.genero;
        document.getElementById("Input5").value=videojuego.plataforma;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input6").value;
  
    const lista_videojuegos = JSON.parse(localStorage.getItem("Videojuegos"));
    var videojuegosC=lista_videojuegos.filter(videojuego=>videojuego.genero==c);
    if(videojuegosC)
    {
        videojuegosC.forEach((videojuego)=>printRowQ(videojuego));
    }
    //console.log(videojuegosC)

}


function printRowQ(videojuego){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = videojuego.id;
    cell2.innerHTML = videojuego.nombrejuego; 
    cell3.innerHTML = videojuego.costo;
    cell4.innerHTML = videojuego.genero;
    cell5.innerHTML = videojuego.plataforma; 
   
}