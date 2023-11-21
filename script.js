const inputs = document.querySelectorAll("input:not([type=submit])");
const passwordField = document.querySelector("#password");
const confirmPasswordField = document.querySelector("#password-confirmation");
const passwordErrorField = document.querySelector(
  "input[id=password] + .error-field"
);
const confirmPasswordErrorField = document.querySelector(
  "input[id=password-confirmation]+ .error-field"
);

inputs.forEach((input) => {
  let errorField = document.querySelector(
    `input[id="${input.id}"] + .error-field`
  );

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
      }
      input.style.backgroundColor = "#FFF0ED";
      input.style.border = "1px solid red";
    } else if (input.id == "password" || input.id == "password-confirmation") {
      if (
        passwordField.value != "" &&
        confirmPasswordField.value != "" &&
        !(passwordField.value === confirmPasswordField.value)
      ) {
        passwordField.value = "";
        passwordField.focus();
        confirmPasswordField.value = "";
        passwordErrorField.textContent = "Passwords do not match";
        confirmPasswordErrorField.textContent = "Passwords do not match";
        passwordField.style.backgroundColor = "#FFF0ED";
        passwordField.style.border = "1px solid red";
        confirmPasswordField.style.backgroundColor = "#FFF0ED";
        confirmPasswordField.style.border = "1px solid red";
      }
    }
  });

  input.addEventListener("keyup", (e) => {
    if (
      errorField != "" &&
      input.checkValidity() &&
      input.id != "password" &&
      input.id != "password-confirmation"
    ) {
      console.log(input.checkValidity());
      errorField.textContent = "";
      input.style.backgroundColor = "white";
      input.style.border = "1px solid black";
    } else if (
      errorField != "" &&
      (input.id == "password" || input.id == "password-confirmation")
    ) {
      if (
        errorField.textContent == "Passwords do not match" &&
        passwordField.value === confirmPasswordField.value &&
        passwordField.value != "" &&
        confirmPasswordField.value != ""
      ) {
        passwordErrorField.textContent = "";
        confirmPasswordErrorField.textContent = "";
        passwordField.style.backgroundColor = "white";
        passwordField.style.border = "1px solid black";
        confirmPasswordFieldField.style.backgroundColor = "white";
        confirmPasswordFieldField.style.border = "1px solid black";
      } else if (
        errorField.textContent != "Passwords do not match" &&
        input.checkValidity()
      ) {
        errorField.textContent = "";
        input.style.backgroundColor = "white";
        input.style.border = "1px solid black";
      }
    }
  });

  if (input.type == "tel") {
    const validChars = /^[0-9]+$/;
    input.addEventListener("keydown", (e) => {
      if (validChars.test(e.key) == false) {
        console.log(e.key);
        if (
          e.key == "Shift" ||
          e.key == "Tab" ||
          e.key == "Backspace" ||
          e.key == "ArrowRight" ||
          e.key == "ArrowLeft"
        ) {
          return;
        }
        e.preventDefault();
      }
    });
  }
});
