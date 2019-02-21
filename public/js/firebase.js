var config = {
  apiKey: "AIzaSyDa2EY94sljBfK92esbIJw9qgCzAo5qSNI",
  authDomain: "one-organized-elf.firebaseapp.com",
  databaseURL: "https://one-organized-elf.firebaseio.com",
  projectId: "one-organized-elf",
  storageBucket: "one-organized-elf.appspot.com",
  messagingSenderId: "278150148427"
};
firebase.initializeApp(config);
let nickname;
  
// Validate entries and create user in firebase
$('#submit-register').click(function (){
  event.preventDefault();
  nickname = $('#nickname-register').val();
  let email = $('#email-register').val();
  let password1 = $('#password-register').val();
  let password2 = $('#password1-register').val();
  let status = true;
  // checks if email is valid
  if ((email.includes('@')===false) || (email.includes('.')===false)) {
    $('#sign-up-email').css('color','red');
    $('#sign-up-email').text('Please enter a valid email address');
    status = false;
  } else {
      $('#sign-up-email').css('color', 'black');
      $('#sign-up-email').text('Email Address');
  };
  // checks if password is right length
  if (password1.length < 6) {
    $('#sign-up-password').css('color','red');
    $('#sign-up-password').text('Please enter a password with minimum of 6 characters');
    status = false;
  } else {
    $('#sign-up-password').css('color','black');
    $('#sign-up-password').text('Password');
  };
  // checks to see if passwords match
  if (password1 !== password2) {
    $('#sign-up-password2').css('color','red');
    $('#sign-up-password2').text("Passwords don't match");
    status = false;
  } else {
    $('#sign-up-password2').css('color','black');
    $('#sign-up-password2').text("Confirm Password");
  };
  // checks to see if name isn't blank
  if (nickname === '') {
    $('#sign-up-nickname').css('color','red');
    $('#sign-up-nickname').text("Please enter a name");
    status = false;
  } else {
    $('#sign-up-nickname').css('color','black');
    $('#sign-up-nickname').text("Nickname");
  };
  // if everything is valid, pushes info to firebase
  if (status === true) {
  firebase.auth().createUserWithEmailAndPassword(email, password1).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode.includes('auth/email-already-in-use')) {
      console.log(errorCode);
      console.log(errorMessage);
      errorCode = '';
      errorMessage = '';
      $('#sign-up-email').css('color','red');
      $('#sign-up-email').text('That email is already in use');
    } else if (errorCode !== '') {
      $('#sign-up-email').css('color','red');
      $('#sign-up-email').text('Error logging in');
    };
    }).then(function() { 
      userid = firebase.auth().currentUser.uid
      const newUser = {
        userEmail: email,
        userUID: userid,
        userNickname: nickname
      };
      $.post("/usersList", newUser);
    });
    $('#myModalSignUp').css('display', 'none');
  };
});

// log into firebase
$('#submit-login').click(function (){
  event.preventDefault();
  $('#login-password1').css('color','black');
  $('#login-password1').text('Password');
  $('#login-email').css('color','black');
  $('#login-email').text('Email');
  let email = $('#email-login').val();
  let password = $('#password1-login').val();
  const promise = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
    console.log(errorMessage);
    if (errorCode.includes('auth/wrong-password')) {
      $('#login-password1').css('color','red');
      $('#login-password1').text('Invalid Password');
    } else if (errorCode.includes('auth/invalid-email')) {
      $('#login-email').css('color','red');
      $('#login-email').text('Email Not Recognized');
    } else {
      $('#login-email').css('color','red');
      $('#login-email').text('Error logging in');
    };
  });
  $('#myModalLogIn').css('display', 'none');
});
  
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser)  { 
    user = firebase.auth().currentUser.uid;
    $('#myBtnSignUp').css('display', 'none');
    $('#myBtnLogIn').css('display', 'none');
    $('#log-out-btn').css('display', 'block');
    $('#if-logged-in').css('display', 'block');
    $('#if-not-logged-in').css('display', 'none');
    $('.greeting').css('display', 'block');
  } else {
    console.log('not logged in');
    $('#myBtnSignUp').css('display', 'block');
    $('#myBtnLogIn').css('display', 'block');
    $('#log-out-btn').css('display', 'none');
    $('.greeting').text('');
  };
});

//log-out onclick
$('#log-out-btn').on('click', function (){
  firebase.auth().signOut();
  $('#log-out-btn').css('display', 'none');
  $('#myBtnSignUp').css('display', 'block');
  $('#myBtnLogIn').css('display', 'block');
  $('#if-not-logged-in').css('display', 'block');
  $('#if-logged-in').css('display', 'none');
});

//shows passwords when signing up
function showPasswords() {
  let type= $('#password-register').attr('type');
  if (type === 'password') { 
    $('#password-register').attr('type','text');
    $('#password1-register').attr('type','text');
  } else {
    $('#password-register').attr('type','password');
    $('#password1-register').attr('type','password');
  };
};

//shows password when logging in
function showPassword() {
  let type= $('#password1-login').attr('type');
  if (type === 'password') { 
    $('#password1-login').attr('type','text');
  } else {
    $('#password1-login').attr('type','password');
  };
};

//Sign up onlcick
$('#myBtnSignUp').on('click', function() {
  $('#myModalSignUp').css('display', 'block');
  $('#if-not-logged-in').css('display', 'none');
});

//Log in onclick
$('#myBtnLogIn').on('click', function() {
  $('#myModalLogIn').css('display', 'block');
  $('#if-not-logged-in').css('display', 'none');
});

//close sign up modal
$('.close').on('click', function() {
  $('#myModalSignUp').css('display', 'none');
  $('#index-pg').css('display', 'block');
});

//close log in modal
$('.close2').on('click', function() {
  $('#myModalLogIn').css('display', 'none');
  $('#index-pg').css('display', 'block');
});