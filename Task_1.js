document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const steps = document.querySelectorAll(".step");
  const nextButtons = document.querySelectorAll(".next-btn");
  const previousButtons = document.querySelectorAll(".previous-btn");
  const submitButton = document.querySelector(".submit-btn");

  let currentStep = 0;

  nextButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
          if (validateStep(currentStep)) {
              steps[currentStep].classList.remove("active");
              currentStep = index + 1;
              steps[currentStep].classList.add("active");
          } else {
              alert("Please fill out all mandatory fields correctly.");
          }
      });
  });

  previousButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
          steps[currentStep].classList.remove("active");
          currentStep = index;
          steps[currentStep].classList.add("active");
      });
  });

  form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateStep(currentStep)) {
          alert("Form submitted successfully!");
      } else {
          alert("Please fill out all mandatory fields correctly.");
      }
  });

  function validateStep(stepIndex) {
      const inputs = steps[stepIndex].querySelectorAll("input");
      let isValid = true;

      inputs.forEach((input) => {
          if (input.hasAttribute("required") && input.value.trim() === "") {
              isValid = false;
          }
      });

      if (stepIndex === 1) {
          const emailInput = steps[1].querySelector("#email");
          const phoneInput = steps[1].querySelector("#phone");
          const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          const phonePattern = /^\d{10}$/;

          if (!emailPattern.test(emailInput.value)) {
              alert("Please enter a valid email address.");
              isValid = false;
          }

          if (!phonePattern.test(phoneInput.value)) {
              alert("Please enter a valid 10-digit phone number.");
              isValid = false;
          }
      }

      if (stepIndex === 2) {
          const postCodeInput = steps[2].querySelector("#postCode");
          const cityInput = steps[2].querySelector("#city");
          const postCodePattern = /^\d{6}$/;
          const cityPattern = /^[a-zA-Z ]+$/;

          if (!postCodePattern.test(postCodeInput.value)) {
              alert("Please enter a valid 6-digit postal code.");
              isValid = false;
          }

          if (!cityPattern.test(cityInput.value)) {
              alert("Please enter a valid city name.");
              isValid = false;
          }
      }

      return isValid;
  }
});