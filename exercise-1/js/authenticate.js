// JavaScript authentication file
$(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCJb6FKtaxQ7TECoFvU4nkq1N9k-lnyROk",
        authDomain: "slick-328a5.firebaseapp.com",
        databaseURL: "https://slick-328a5.firebaseio.com",
        storageBucket: "slick-328a5.appspot.com",
        messagingSenderId: "72335202957"
    };
    firebase.initializeApp(config);
    
    // Sign Up: Function to create account on firebase, then redirect to index.html
    var signUp = function() {
        // Get email, password, and display name
        var email = $('#email').val();
        var password = $('#password').val();
        var displayName = $('#display-name').val();
        
        console.log('email: ' + email + ', password: ' + password + ', display name: ' + displayName);

        // Create user, then set the user's display name
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
           user.updateProfile({
               displayName: displayName,
           }).then(function(){
               window.location = '/';
           });
        }).catch(function(error){
               alert(error.message);
        });
    };

    // SignIn: Function to authenticate on Firebase, then redirect to index.html
    var signIn = function() {
        // Get email and password
        var email = $('#email').val();
        var password = $('#password').val();
        console.log('email: ' + email + ', password: ' + password);
        
        
        // Authenticate using email and password, then redirect
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
            window.location = '/';
        }).catch(function(error) {
            alert(error);
        });
    };

    // Sign out: Function to log a user out of firebase
    var signOut = function() {
        // Sign out, then redirect
        firebase.auth().signOut().then(function() {
            console.log('tried to log out...');
            window.location = 'sign-up.html';
        });
    };

    // Assign event lister to form submission
     $('form').on('submit', function(event) {
        event.preventDefault();
        var formId = $(this).attr('id');
        if (formId == 'sign-up') {
            signUp();
        } else if (formId == 'sign-in') {
            signIn();
        }
    });

    // Assign click event to logout button
    $('#log-out').on('click', function() {
       console.log('clicked log out...');
        signOut(); 
    });


    // Authentication Change: see if a user is already signed in, and redirect
    var checked;
    firebase.auth().onAuthStateChanged(function(user) {
        if (checked != true) {
            var pathName = window.location.pathname;
            // Redirect to index.html if there is a user and the pathname isn't '/'
            if (user && pathName != '/') {
                // user is signed in
                window.location = '/';
            } else if (!user && pathName == '/') { // Redirect to sign-in if there is NOT a user and the pathname IS '/'
                window.location = '/sign-in.html'
            }
            checked = true;
        }
    });
            
});
