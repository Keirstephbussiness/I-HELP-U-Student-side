// Enhanced Real-time Validation for Login and Signup Forms
document.addEventListener("DOMContentLoaded", function () {
  
  // Helper function to remove all validation classes
  function removeValidationClasses(element) {
    element.classList.remove("is-invalid", "is-valid");
  }

  // Helper function to add real-time validation listener
  function addRealTimeValidation(input, validationFn, errorMessage = "") {
    input.addEventListener("input", function() {
      removeValidationClasses(this);
      
      if (this.value === "") {
        // Empty field - no validation
        return;
      }

      if (validationFn(this.value)) {
        this.classList.add("is-valid");
      } else {
        this.classList.add("is-invalid");
        if (errorMessage && this.nextElementSibling && this.nextElementSibling.classList.contains("invalid-feedback")) {
          this.nextElementSibling.textContent = errorMessage;
        }
      }
    });

    // Also validate on blur (when user leaves the field)
    input.addEventListener("blur", function() {
      if (this.value === "") {
        removeValidationClasses(this);
      }
    });
  }

  // Input type blocking functions
  function setupInputBlocking(input, allowedPattern, placeholderText = "") {
    input.addEventListener("input", function(e) {
      const cursorPosition = e.target.selectionStart;
      const previousValue = e.target.value;
      const newValue = previousValue.replace(allowedPattern, '');
      
      e.target.value = newValue;
      
      // Restore cursor position
      const diff = previousValue.length - newValue.length;
      e.target.setSelectionRange(cursorPosition - diff, cursorPosition - diff);
    });

    if (placeholderText) {
      input.setAttribute("placeholder", placeholderText);
    }
  }

  // LOGIN FORM VALIDATION
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    // Student Number - only digits, exactly 10
    const studentNumber = document.getElementById("studentNumber");
    if (studentNumber) {
      // Block non-digit input
      setupInputBlocking(studentNumber, /[^0-9]/g, "Enter 9-digit student number");
      
      // Real-time validation
      addRealTimeValidation(studentNumber, function(value) {
        return /^\d{10}$/.test(value);
      }, "Student number must be exactly 10 digits");
    }

    // Password - allow letters, numbers, and special characters
    const passwordLogin = document.getElementById("passwordLogin");
    if (passwordLogin) {
      // Allow alphanumeric and common special characters
      setupInputBlocking(passwordLogin, /[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/g, "Enter your password");
      
      // Real-time validation
      addRealTimeValidation(passwordLogin, function(value) {
        return value.length >= 6;
      }, "Password must be at least 6 characters long");
    }

    // Form submission
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      // Re-validate all fields on submit
      if (studentNumber && !/^\d{10}$/.test(studentNumber.value)) {
        studentNumber.classList.add("is-invalid");
        valid = false;
      }
      
      if (passwordLogin && passwordLogin.value.length < 6) {
        passwordLogin.classList.add("is-invalid");
        valid = false;
      }

      if (valid) {
        alert("Login Successful!");
        // Here you would typically send the form data to your server
        // loginForm.submit(); // Uncomment if you want to actually submit
      }
    });
  }

  // SIGNUP FORM VALIDATION
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    
    // Student Number - only digits, exactly 10
    const studentNumberSignup = document.getElementById("studentNumberSignup");
    if (studentNumberSignup) {
      setupInputBlocking(studentNumberSignup, /[^0-9]/g, "Enter 9-digit student number");
      addRealTimeValidation(studentNumberSignup, function(value) {
        return /^\d{10}$/.test(value);
      }, "Student number must be exactly 9 digits");
    }

    // Full Name - letters and spaces only
    const fullName = document.getElementById("fullName");
    if (fullName) {
      setupInputBlocking(fullName, /[^A-Za-z\s]/g, "Enter full name (letters only)");
      addRealTimeValidation(fullName, function(value) {
        return /^[A-Za-z\s]+$/.test(value.trim()) && value.trim().length >= 2;
      }, "Full name must contain only letters and spaces (minimum 2 characters)");
    }

    // Email validation
    const email = document.getElementById("email");
    if (email) {
      // Email doesn't need input blocking as it's handled by type="email"
      addRealTimeValidation(email, function(value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      }, "Please enter a valid email address");
    }

    // Password - allow letters, numbers, and special characters
    const passwordSignup = document.getElementById("passwordSignup");
    if (passwordSignup) {
      setupInputBlocking(passwordSignup, /[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/g, "Enter password (min 6 chars)");
      addRealTimeValidation(passwordSignup, function(value) {
        return value.length >= 6;
      }, "Password must be at least 6 characters long");
    }

    // Confirm Password - sync with password field
    const confirmPassword = document.getElementById("confirmPassword");
    if (confirmPassword && passwordSignup) {
      setupInputBlocking(confirmPassword, /[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/g, "Confirm your password");
      
      function validateConfirmPassword() {
        removeValidationClasses(confirmPassword);
        
        if (confirmPassword.value === "") {
          return;
        }
        
        if (confirmPassword.value === passwordSignup.value) {
          confirmPassword.classList.add("is-valid");
        } else {
          confirmPassword.classList.add("is-invalid");
          if (confirmPassword.nextElementSibling && confirmPassword.nextElementSibling.classList.contains("invalid-feedback")) {
            confirmPassword.nextElementSibling.textContent = "Passwords do not match";
          }
        }
      }

      confirmPassword.addEventListener("input", validateConfirmPassword);
      passwordSignup.addEventListener("input", validateConfirmPassword); // Validate when password changes too

      confirmPassword.addEventListener("blur", function() {
        if (this.value === "") {
          removeValidationClasses(this);
        }
      });
    }

    // Form submission
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      // Re-validate all fields on submit
      if (studentNumberSignup && !/^\d{10}$/.test(studentNumberSignup.value)) {
        studentNumberSignup.classList.add("is-invalid");
        valid = false;
      }

      if (fullName && (!/^[A-Za-z\s]+$/.test(fullName.value) || fullName.value.trim().length < 2)) {
        fullName.classList.add("is-invalid");
        valid = false;
      }

      if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
        email.classList.add("is-invalid");
        valid = false;
      }

      if (passwordSignup && passwordSignup.value.length < 6) {
        passwordSignup.classList.add("is-invalid");
        valid = false;
      }

      if (confirmPassword && (confirmPassword.value !== passwordSignup.value || confirmPassword.value === "")) {
        confirmPassword.classList.add("is-invalid");
        valid = false;
      }

      if (valid) {
        alert("Sign-up Successful!");
        signupForm.reset();
        // Reset all validation classes
        document.querySelectorAll(".form-control").forEach(el => {
          removeValidationClasses(el);
        });
        document.querySelectorAll(".invalid-feedback").forEach(el => {
          el.textContent = "";
        });
        // Here you would typically send the form data to your server
        // signupForm.submit(); // Uncomment if you want to actually submit
      }
    });
  }

  // Optional: Add visual feedback for form state
  function updateFormState(form) {
    const inputs = form.querySelectorAll(".form-control");
    let allValid = true;
    let hasInput = false;

    inputs.forEach(input => {
      if (input.value !== "") {
        hasInput = true;
      }
      if (input.classList.contains("is-invalid")) {
        allValid = false;
      }
    });

    // You can add a submit button state management here
    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      if (hasInput && allValid) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("disabled");
      } else if (hasInput) {
        submitBtn.disabled = true;
        submitBtn.classList.add("disabled");
      }
    }
  }

  // Attach form state updates to input events
  if (loginForm) {
    loginForm.querySelectorAll(".form-control").forEach(input => {
      input.addEventListener("input", () => updateFormState(loginForm));
      input.addEventListener("blur", () => updateFormState(loginForm));
    });
  }

  if (signupForm) {
    signupForm.querySelectorAll(".form-control").forEach(input => {
      input.addEventListener("input", () => updateFormState(signupForm));
      input.addEventListener("blur", () => updateFormState(signupForm));
    });
  }
});