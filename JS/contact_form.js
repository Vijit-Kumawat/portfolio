document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Fetch form input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Clear any previous error messages
    let errorMessage = '';

    // Constraints
    if (!name) {
        errorMessage += 'Name is required.\n';
    }
    if (!email) {
        errorMessage += 'Email is required.\n';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {  // Basic email pattern
        errorMessage += 'Please enter a valid email address.\n';
    }
    if (!message) {
        errorMessage += 'Message is required.\n';
    } else if (message.length < 10) {
        errorMessage += 'Message must be at least 10 characters long.\n';
    }

    // If there are errors, display them and return
    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    // If no errors, send the email
    emailjs.send("service_gnxx5kb", "template_2wtd0rl", {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
       // Clear form fields
       document.getElementById('contactForm').reset();

       // Change button text to "Sent"
       const submitButton = document.getElementById('btn');
       submitButton.innerHTML = 'Sent';
       submitButton.style.background = 'green'



       // After 3 seconds, reset
       setTimeout(function() {
           submitButton.innerHTML = 'Submit'; // Reset button text
           submitButton.style.background = 'var(--main-color)'; //Reset Background color
       }, 3000); // 3 seconds

    }, function(error) {
       alert('FAILED... ' + JSON.stringify(error));
    });
});

