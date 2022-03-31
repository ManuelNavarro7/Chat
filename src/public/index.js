let socket =io();//el io viene del script desde el html
let chatBox = document.getElementById('chatBox');
let log =document.getElementById('log');
let user;


/*MAP*/

let myMap = L.map('myMap').setView([5-38.416097, -63.616672], 5)// L hace alucion a leaflet [lat,long],zoom

L.tileLayer(`https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png`, {
	maxZoom: 18,
}).addTo(myMap);

//let marker = L.marker([51.5, -0.09]).addTo(myMap) // asiganamos el marcador a las cordenadas y lo agregamos a mi mapa

let iconMarker = L.icon({
    iconUrl: 'marker.png',
    iconSize: [60, 60],
    iconAnchor: [30, 60]
})//creamos nuestro marker

//let marker2 = L.marker([51.51, -0.09], { icon: iconMarker }).addTo(myMap) // mismo que el otro

//myMap.doubleClickZoom.disable()//para que no se acerque cada vez que toco el mapa
//myMap.on('dblclick', e => {
  //let latLng = myMap.mouseEventToLatLng(e.originalEvent);

  //L.marker([latLng.lat, latLng.lng], { icon: iconMarker }).addTo(myMap)
//})

navigator.geolocation.getCurrentPosition(
  (pos) => {//de succes
    const { coords } = pos //asignamos las cords que recivimos del navegador
    const { latitude, longitude } = coords //descontructing de las cords del navegador las asignamos a variables
    L.marker([latitude, longitude], { icon: iconMarker }).addTo(myMap)
   
    setTimeout(() => {
      myMap.panTo(new L.LatLng(latitude, longitude))
    }, 5000)
  },
  (error) => {
    console.log(error)//si no dan permiso para geolocalizacion borramos el map
    let MP= document.getElementById('myMap');
    MP.remove();
  },
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })//obtenemos nuestra geolocalizacion


/*ALERT DE IDENTIFICACION */
Swal.fire({
    title:"Identify",//para que se indentifique el usuario
    input:"text",
    allowOutsideClick:false,//para logearte si o si y no salir del input
    inputValidator:(value)=>{
        return !value && 'Necesitas escribir un nombre de usuario'//Para validar y que no quede vacio, si !value es null te pide que lo completes
    }

}).then(result=>{//lo importo de sweetAlert, como Swal es una promesa , pongo .then()para encadenar el result que va a salir de la validacion y usarlo como user

    user=result.value;
    console.log(user);
    Swal.fire({
      title:"Recuerda , presionar enter para enviar tus mensajes",//para que se indentifique el usuario
      allowOutsideClick:false,//para logearte si o si y no salir del input
      
    
    })
})



chatBox.addEventListener('keyup',evt=>{
    if(evt.key === "Enter"){
        
        if(chatBox.value.trim().length>0){//con trim()anulo los envios vacios 
            let date = new Date().toLocaleTimeString()
            console.log(date)
            socket.emit('message',{user,message:chatBox.value.trim(),date})//mando el user y en message el mensage del chatBox
            chatBox.value='';
            //socket.emit('message',{message:date})
            
        }
    }
})

/*SOCKETS*/

socket.on('log',data =>{
    
    let messages='';//dejo la variable aca adentro para que se esta borrando cada vez que refresque 
    data.forEach(element => {
        messages=messages + `${element.user} Dice : ${element.message} Hora: ${element.date}</br>`
    });
    log.innerHTML =messages;
})






