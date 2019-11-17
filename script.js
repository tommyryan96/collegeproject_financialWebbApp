
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB-Gal0imqHoBODaHZKiKSL2YlFpIBiBCI",
    authDomain: "teambestever-85559.firebaseapp.com",
    databaseURL: "https://teambestever-85559.firebaseio.com",
    projectId: "teambestever-85559",
    storageBucket: "teambestever-85559.appspot.com",
    messagingSenderId: "214432533133"
  };
  firebase.initializeApp(config);
   var database = firebase.database();
   
firebase.auth().onAuthStateChanged(function(user) {
    // User is signed in.

    //document.getElementById("user_div").style.display = "block";
    //document.getElementById("login_div").style.display = "none";

    //var user = firebase.auth().currentUser;

	
		document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
	
});
function newPage()
{
      location.replace("home.html");	
}
async function login(){ //function to check if the user exist and if it does let them login

   userEmail = document.getElementById("email_field").value;
   userPass = document.getElementById("password_field").value;
try{
	let auth=await firebase.auth()
		let user=await auth.signInWithEmailAndPassword(userEmail, userPass)
		newPage();
		console.log(user);
		watchInbox(user)
}
  catch(error)
  {
	  // Handle Errors here.
		  let errorCode = error.code;
		  let errorMessage = error.message;
		  console.error(errorMessage)

			if(errorMessage == "The password is invalid or the user does not have a password."){
					alert("Password is invalid or Email does not exist. ")			
					}	
  }
		  
	

}

function watchInbox(user)
{
	console.log(user)
	alert("Watching inbox for uid:" + user.uid)
	
	consolelog("Working")
	
	try
	{
		let mymailboxlocation='/users/'+user.uid+'/inbox'

		let mydata = database.ref(mymailboxlocation);
		console.log("Working")
		
		mydata.on('value', 
		  function(snapshot) 
		  {
		  	console.log("got snapshot")
			var result=snapshot.val()
			result=JSON.stringify(result,null,4)
		    document.getElementById("placeholder").innerHTML="<pre>"+result+"</pre>"
		  }
		);
	}
	catch(err)
	{
		console.log(err)
		//alert("Email is already taken.");	
		alert(err);		
					
	}
}

function logout(){ //sign out user when they are done with app

  firebase.auth().signOut();
  //alert("NOT EPIC!");
  location.replace("app.html");
}


async function save_user(){ //let a user register if they dont have an account
   let user_name = document.getElementById('user_name').value;
   let user_pass = document.getElementById('psw').value;
   try{
	    let auth=await firebase.auth;
		let user = firebase.auth().createUserWithEmailAndPassword(user_name, user_pass)
		alert("Account created!")
   }
   catch(error){
	   // Handle Errors here.
			let errorCode = error.code;
			let errorMessage = error.message;
			alert(errorMessage);
   }
  
	//console.log("Working");
  }


function writeUserData() {
var userId = firebase.auth().currentUser.uid;
var x  = document.getElementById('n').value;
console.log("user id : " + userId);
  firebase.database().ref('users/' + userId).set({
    username: x,
    
    
  });
 }
 
 
 
var text = ["Welcome", "Hi", "Sup dude"];
var counter = 0;
var elem = document.getElementById("changeText");
var inst = setInterval(change, 1000);

function change() {
  elem.innerHTML = text[counter];
  counter++;
  if (counter >= text.length) {
    counter = 0;
    // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
  }
}


