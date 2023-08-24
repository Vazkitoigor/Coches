//Declaro las principales variables y arrays que usare en el código después hay alguna mas declarada dentro de funciones.

let participantes=0;

let podioIndice=0;

let myTimeout=0;

let primero=0;
let segundo=0;
let tercero=0;

var coches = new Array();
var velocidad = new Array();
var velocidad1 = new Array();
var velocidad2= new Array();

//Creo la función timmer() que la voy ha ejecutar desde el botón "Iniciar". una vez ejecutada llama a la función podio
// que es la que generara el podio con un retraso de 10s. Esta función esta unida a myTimeout el cual se usa para cortar
//la función y que no se ejecute el podio, se cortara al  pulsar el botón "Reiniciar" que ejecuta myStopFunction(). He usado
//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_cleartimeout
//La funcion podio() crea una lista ordenada de <li></li> que genera la lista de ganadores


function timmer(){
     myTimeout = setTimeout(podio, 10000);

    function podio(){
        let ol = document.createElement("ol");
    
        let li4 = document.createElement("li");
        let li4Texto = document.createTextNode("Coche "+(primero+1));
        li4.appendChild(li4Texto);
         
        let li5 = document.createElement("li");
        let li5Texto = document.createTextNode("Coche "+(segundo+1));
        li5.appendChild(li5Texto);
         
        let li6 = document.createElement("li");
        let li6Texto = document.createTextNode("Coche "+(tercero+1));
        li6.appendChild(li6Texto);
       
        // Esto hace que salga el podio para 1 “if(participantes==1)”, 
        //2 if(participantes==2), 3 o mas participantes insertando 
        //el el documento los li pertinentes.

        
        if(participantes==1){
            ol.appendChild(li4); 
        }else if (participantes==2){
            ol.appendChild(li4);
            ol.appendChild(li5);
        }else{
        ol.appendChild(li4);
        ol.appendChild(li5);
        ol.appendChild(li6);
        }
        document.body.appendChild(ol);
    }

}
//Aqui es donde corta la funcion "podio" copmo he dicho antes.
function myStopFunction() {
    clearTimeout(myTimeout);
  }

//Esconde los coches que aparecen al principio.
function esconder(){
$("#boton2").hide();
for(i=1;i<=9;i++){
    $("#coche"+i).hide();
}
}

//Creo una función desde la que va actualizar el select para que lea los datos cada vez que el select cambie.
function actualizar(){
    //Cojo el valor a través del id del select para ver cuantos participantes se eligen.
    participantes=$("#desp1").val(); 
    //Reseteo a invisible por si se habian elegido primero x coches y luego x-1 para que no se quede los coches que hagan la diferencia entre esos dos sin movimiento
    for(i=1;i<=9;i++){
        $("#coche"+i).hide(); 
        }  



    //Con el for meto la velocidad o los ms que usare en el método animate. Después meto las fotos de los coches en un array.
    for(i=0;i<participantes;i++){
        velocidad[i]=((Math.random() * 10+1)*500);
        coches[i]="img/car"+(i+1)+".png";  
    }
    //Clono el array de velocidades como velocidad1 y velocidad2 los cuales usare al final del código para sacar el primer segundo y tercero en el podio.
    for(i=0;i<participantes;i++){
        velocidad1[i]=velocidad[i];
    }

    for(i=0;i<participantes;i++){
        velocidad2[i]=velocidad[i];
    }


//Muestro los coches según en numero de participantes.
    for(i=1;i<=participantes;i++){
    $("#coche"+i).show(); 
    }   

    //Empezamos con el animate para dar velocidad y movimiento a los coches con un for que moverá en función
    // de los participantes que haya, cada coche.

    $(document).ready(function(){
    $("#boton1").click(function(){
        for(i=1;i<=participantes;i++){  
    $("#coche"+i).animate({left: '1270px'}, velocidad[(i-1)], 'linear', function(){
    //La función hace que se esconda el botón"Reiniciar" al llegar el primer coche a meta, ojo el botón2 “reiniciar” 
    //esta activo durante la carrera por lo que el siguiente punto del código que dice que se muestra el botón 2 y 
    //se oculta el primero se hace efectivo durante la carrera.
        
        $("#boton2").hide();
    });
    }
//Se esconde el primer botón "Iniciar"y sale el segundo "Reiniciar" el cual estará activo mientras se realiza la carrera.
    $("#boton1").hide();
    $("#boton2").show();
    });
    });

//Al pulsar el segundo botón "Reiniciar".
    $(document).ready(function(){
    $("#boton2").click(function(){
        //Primero se paran los coches
    for(i=1;i<=participantes;i++){  
    $("#coche"+i).stop();
    }
    //Y después vuelven a la posición inicial usando la misma velocidad.  
    for(i=1;i<=participantes;i++){  
        $("#coche"+i).animate({left: '0px'}, velocidad[(i-1)], 'linear');
              }
    //Escondo el botón "Reiniciar" y muestro el botón "Iniciar"
    $("#boton2").hide();
    $("#boton1").show();
});
});



//uso esta función para ordenar el array https://es.stackoverflow.com/questions/50024/c%C3%B3mo-ordenar-un-arreglo-de-n%C3%BAmeros-en-javascript
Array.prototype.sortNumbers = function(){
    return this.sort(
        function(a,b){
            return a - b;
        }
    );
}




//como hemos clonado  los arrays tenemos 3 arrays iguales.
//Primero ordenamos el array 1 para ver los números de menor a mayor el menor sera el ganador.
velocidad1.sortNumbers();
//Una vez que tengamos el array ordenado vamos a comparar la primera posición con todas las velocidades del array velocidad 2.
//Cuando coincidan velocidad1[0]==velocidad2[primero] romperemos el bucle y ya tendremos el indice que nos va a decir que coche es el ganador.
for(primero=0;primero<participantes;primero++){
    if(velocidad1[0]==velocidad2[primero]){
    break;
    }
}

//Lo mismo para el segundo la diferencia es que cogemos el valor 2 del array velocidad1[1] y entonces lo comparamos para obtener la posición 2.
for(segundo=0;segundo<participantes;segundo++){
    if(velocidad1[1]==velocidad2[segundo]){
    break;
    }
}
//Lo mismo para la posición 3 cogemos el valor 3 velocidad1[2] y entonces lo comparamos para obtener la posición 3.
for(tercero=0;tercero<participantes;tercero++){
    if(velocidad1[2]==velocidad2[tercero]){
    break;
    }
}


}



