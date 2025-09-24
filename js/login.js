document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Bypass form validation and submission
    window.location.href = "Student-Dashboard.html"; // Redirect to the dashboard
});