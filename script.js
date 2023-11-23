const inputs = document.querySelectorAll("input:not([type=submit])");
const passwordField = document.querySelector("#password");
const confirmPasswordField = document.querySelector("#password-confirmation");
const passwordErrorField = document.querySelector(
  "input[id=password] + .error-field"
);
const confirmPasswordErrorField = document.querySelector(
  "input[id=password-confirmation]+ .error-field"
);

function applyInputErrorStyle(inputField) {
  inputField.style.backgroundColor = "#FFF0ED";
  inputField.style.border = "1px solid red";
}

function removeInputErrorStyle(inputField) {
  inputField.style.backgroundColor = "white";
  inputField.style.border = "1px solid black";
}

inputs.forEach((input) => {
  let errorField = document.querySelector(
    `input[id="${input.id}"] + .error-field`
  );

  // APPLY VALIDATION ERRORS
  input.addEventListener("blur", (e) => {
    if (!input.checkValidity()) {
      if (input.value == "") {
        let label = document.querySelector(`label[for=${input.id}]`);
        let fieldName = label.textContent;
        errorField.textContent = `${fieldName} is required`;
      } else if (input.type == "email") {
        errorField.textContent = "Not a valid email";
      } else if (input.type == "tel") {
        errorField.textContent = "Phone Number is invalid";
      } else if (input.type == "password") {
        errorField.textContent = "Password At least 8 characters is required";
      }
      applyInputErrorStyle(input);
    } else if (
      (input.id == "password" || input.id == "password-confirmation") &&
      passwordField.value != confirmPasswordField.value
    ) {
      passwordField.value = "";
      passwordField.focus();
      confirmPasswordField.value = "";
      passwordErrorField.textContent = "Passwords do not match";
      confirmPasswordErrorField.textContent = "Passwords do not match";
      applyInputErrorStyle(passwordField);
      applyInputErrorStyle(confirmPasswordField);
    } else if (input.type == "tel" && input.checkValidity()) {
      // Format telephone field on blur
      input.value = input.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
  });

  // CLEAR VALIDATION ERRORS
  input.addEventListener("keyup", (e) => {
    if (
      errorField != "" &&
      input.checkValidity() &&
      input.id != "password" &&
      input.id != "password-confirmation"
    ) {
      console.log(input.checkValidity());
      errorField.textContent = "";
      removeInputErrorStyle(input);
    } else if (
      errorField != "" &&
      (input.id == "password" || input.id == "password-confirmation")
    ) {
      if (
        passwordErrorField.textContent == "Passwords do not match" &&
        confirmPasswordErrorField.textContent == "Passwords do not match" &&
        passwordField.value === confirmPasswordField.value &&
        passwordField.value != "" &&
        confirmPasswordField.value != ""
      ) {
        passwordErrorField.textContent = "";
        confirmPasswordErrorField.textContent = "";
        removeInputErrorStyle(passwordField);
        removeInputErrorStyle(confirmPasswordField);
      } else if (
        passwordErrorField.textContent != "Passwords do not match" &&
        confirmPasswordErrorField.textContent == "Passwords do not match" &&
        passwordField.value === confirmPasswordField.value &&
        passwordField.value != "" &&
        confirmPasswordField.value != ""
      ) {
        confirmPasswordErrorField.textContent = "";
        removeInputErrorStyle(confirmPasswordField);
      } else if (
        errorField.textContent != "Passwords do not match" &&
        input.checkValidity()
      ) {
        errorField.textContent = "";
        removeInputErrorStyle(input);
      }
    }
  });

  // Only allow number characters in telephone field
  if (input.type == "tel") {
    const validChars = /^[0-9]+$/;
    // Lets user still use keyboard to navigate within the field
    const controlKeys = [
      "Shift",
      "Tab",
      "Backspace",
      "ArrowRight",
      "ArrowLeft",
    ];
    input.addEventListener("keydown", (e) => {
      if (!validChars.test(e.key) && !controlKeys.includes(e.key)) {
        e.preventDefault();
      }
    });

    // Allows user to edit formatted telephone number by
    // returning it to less than 10 characters
    input.addEventListener("focus", (e) => {
      if (input.value.match(/\(\d{3}\) \d{3}-\d{4}/)) {
        input.value = input.value.replace(/\D/g, "");
      }
    });
  }
});
