// Listen For Submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Hide results
  document.getElementById("results").style.display = "none";

  // Show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Function: Calculate Results
function calculateResults() {
  // console.log("Bravo Majstore!!!");

  // Get UI Variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // User Input Values
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Calculate Monthly Payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(0);
    totalPayment.value = (monthly * calculatedPayments).toFixed(0);
    totalInterest.value = (totalPayment.value - principal).toFixed(0);

    // Show results
    document.getElementById("results").style.display = "block";
    // Hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your input!");

    // Hide loader
    document.getElementById("loading").style.display = "none";
  }
}

// Create showError Function
function showError(error) {
  // Create  <div>
  const errorDiv = document.createElement("div");

  // Get elements fom HTML(DOM)
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Create class (bootstrap alert)
  errorDiv.className = "alert alert-danger";

  // Create Text and append to <div>
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Create clearError function
function clearError() {
  document.querySelector(".alert").remove();
}
