let socket =io();//el io viene del script desde el html
let chatBox = document.getElementById('chatBox');
let log =document.getElementById('log');
let user;
/*ALERT DE IDENTIFICACION */
Swal.fire({
    title:"Identify",//para que se indentifique el usuario
    input:"text",
    allowOutsideClick:false,//para logearte si o si y no salir del input
    inputValidator:(value)=>{
        return !value && 'Necesitas escribir un nombre de usuario'//Para validar y que no quede vacio, si !value es null te pide que lo completes
    }

}).then(result=>{
    user=result.value;
    console.log(user);
})//lo importo de sweetAlert, como Swal es una promesa , pongo .then()para encadenar el result que va a salir de la validacion y usarlo como user

chatBox.addEventListener('keyup',evt=>{
    if(evt.key === "Enter"){
        
        if(chatBox.value.trim().length>0){//con trim()anulo los envios vacios 
            socket.emit('message',{user,message:chatBox.value.trim()})//mando el user y en message el mensage del chatBox
            chatBox.value='';
        }
    }
})

/*SOCKETS*/

socket.on('log',data =>{
    
    let messages='';//dejo la variable aca adentro para que se esta borrando cada vez que refresque 
    data.forEach(element => {
        messages=messages + `${element.user} Dice : ${element.message}</br>`
    });
    log.innerHTML =messages;
})





