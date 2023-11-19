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
      } else {
        errorField.textContent = input.validationMessage;
      }
      input.style.backgroundColor = "#FFF0ED";
      input.style.border = "1px solid red";
    }
  });

  input.addEventListener("keypress", (e) => {
    if (errorField != "") {
      errorField.textContent = "";
      input.style.backgroundColor = "white";
      input.style.border = "1px solid black";
    }
  });
});
