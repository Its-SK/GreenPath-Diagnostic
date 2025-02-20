document.getElementById("googleSignInBtn").addEventListener("click", function() {
    document.getElementById("booking").style.display = "block";
    window.location.href = "#booking"; // Scroll to the form
});


document.addEventListener("DOMContentLoaded", function () {
    // Ensure the dropdown is hidden initially
    document.getElementById("serviceType").style.display = "none";

    // Attach event listener for form submission
    document.getElementById("bookingForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let sex = document.getElementById("sex").value;
        let age = document.getElementById("age").value.trim();
        let service = document.getElementById("service").value;
        let serviceType = document.getElementById("serviceType").value;

        // Validate form inputs
        if (!name || !email || !sex || !age || !service || !serviceType) {
            document.getElementById("bookingMessage").textContent = "Please fill in all fields.";
            document.getElementById("bookingMessage").style.color = "red";
            return;
        }

        let message = `Thank you, ${name}! Your booking for ${serviceType} under ${service} has been confirmed.`;
        document.getElementById("bookingMessage").textContent = message;
        document.getElementById("bookingMessage").style.color = "green";
    });

    // Update Type of Service options based on the selected service
    document.getElementById("service").addEventListener("change", updateTypeOptions);
});

function updateTypeOptions() {
    let service = document.getElementById("service").value;
    let serviceType = document.getElementById("serviceType");

    // Clear previous options
    serviceType.innerHTML = "";

    // Default option
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select Service Type";
    serviceType.appendChild(defaultOption);

    let options = [];

    if (service === "pathology") {
        options = ["Blood Test", "Sugar Test", "Blood Group Test", "Liver Function Test", "Kidney Function Test"];
    } else if (service === "x-ray") {
        options = ["Chest X-Ray", "Abdominal X-Ray", "Bone X-Ray"];
    } else if (service === "ecg") {
        options = ["Resting ECG", "Exercise ECG"];
    } else if (service === "biopsy") {
        options = ["Skin Biopsy", "Liver Biopsy", "Kidney Biopsy"];
    } else if (service === "pft") {
        options = ["Spirometry", "Lung Volume Test"];
    }

    // Add new options
    options.forEach(type => {
        let optionElement = document.createElement("option");
        optionElement.value = type.toLowerCase().replace(/ /g, "-");
        optionElement.textContent = type;
        serviceType.appendChild(optionElement);
    });

    serviceType.style.display = "block"; // Changed to always show when called
    serviceType.disabled = false;
}
