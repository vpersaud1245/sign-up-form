const inputs = document.querySelectorAll("input:not([type=submit])");

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
    }
  });

  input.addEventListener("keyup", (e) => {
    if (errorField != "" && input.checkValidity()) {
      console.log(input.checkValidity());
      errorField.textContent = "";
      input.style.backgroundColor = "white";
      input.style.border = "1px solid black";
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
