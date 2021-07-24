
/*

//PARA GUARDAR DATOS EN BASE DE DATOS...

const txt1 = document.getElementById('Text1');
const txt2 = document.getElementById('Text2');
const database = firebase.database();
			
			
			btsEviar.addEventListener('click', (e) => {
			e.preventDefault();
			database.ref('/Usuario').set({
			Nombre: txt1.value,
			Apellido: txt2.value
			})})
 
 */










// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDc1HnH_BZoP6kDdzRfuZ_xJFZtZnByiNE",
  authDomain: "prueba-64160.firebaseapp.com",
  projectId: "prueba-64160"
});
var db = firebase.firestore();
// AGREGAR DATOS.
	btsEviar.addEventListener('click', (e) => {
const txt1 = document.getElementById('Text1').value;
const txt2 = document.getElementById('Text2').value;
	e.preventDefault();
	db.collection("users").add({
    first: txt1,
    last:  txt2
   })
.then((docRef) => {
console.log("Document written with ID: ", docRef.id);
document.getElementById('Text1').value = "";
document.getElementById('Text2').value = "";})
.catch((error) => {console.error("Error adding document: ", error);})})


//Leer datos.
db.collection("users").onSnapshot((querySnapshot) => {
		let DATA = document.getElementById('DATA'); 
		DATA.innerHTML = "";
    querySnapshot.forEach((doc) => {
//  console.log(`${doc.id} => ${doc.data().last}`);
    DATA.innerHTML += `
    <div id="DATA">
		<span>Nombre: ${doc.data().first}</span><br>
		<span>Apellido: ${doc.data().last}</span><br>
		<span>ID: ${doc.id}</span><br>
		<button id="BORRAR" onclick="Elimi('${doc.id}')">BORRAR</button>
		<button id="EDICTAR"onclick="Actua('${doc.id}','${doc.data().first}','${doc.data().last}')">EDICTAR</button>
		</div>`
    		
    });});
 
//BORRAR
function Elimi(id) {
db.collection("users").doc(id).delete().then(() => {
console.log("Document successfully deleted!");})
.catch((error) => {
console.error("Error removing document: ", error);});}




//Actualizado Datos.
function Actua(id, Nombre, Apellido) {
			document.getElementById('Text1').value = Nombre;
			document.getElementById('Text2').value = Apellido;
			let BOTON = document.getElementById('btsEviar');
			BOTON.innerHTML = "EDICTAR"

BOTON.onclick = function() {
var washingtonRef = db.collection("users").doc(id);

// Set the "capital" field of the city 'DC'
const NOMBRE = document.getElementById('Text1').value;
const APELLIDO = document.getElementById('Text2').value;
return washingtonRef.update({
    first: NOMBRE,
    last:  APELLIDO
})
.then(() => {
    console.log("Document successfully updated!");
    BOTON.innerHTML = "GUARDAR"})


.catch((error) => {
    // The document probably doesn't exist.
    console.error("ERROR DE ACTUALIZACIÓN: ", error);
    alert("ERROR DE ACTUALIZACIÓN, ACTUALICÉ LA PÁG.")
    BOTON.innerHTML = "error"
});}





}
















