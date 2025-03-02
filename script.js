document.getElementById("googleSignInBtn").addEventListener("click", function() {
    document.getElementById("booking").style.display = "block";
    window.location.href = "#booking"; // Scroll to the form
});

document.addEventListener("DOMContentLoaded", function () {
    // Initialize service type dropdown
    document.getElementById("serviceType").style.display = "none";
    
    // Form submission handler
    document.getElementById("bookingForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        
        // Get form elements
        const form = event.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const messageElement = document.getElementById("bookingMessage");

        // Validate form inputs
        if (!validateForm()) {
            return;
        }

        // Add loading state
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        try {
            // Send to Formspree
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showSuccessMessage(formData);
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showErrorMessage();
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Book Now";
        }
    });

    // Service type dropdown handler
    document.getElementById("service").addEventListener("change", updateTypeOptions);
});

// Form validation function
function validateForm() {
    const requiredFields = ['name', 'email', 'sex', 'age', 'service', 'serviceType'];
    const messageElement = document.getElementById("bookingMessage");

    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            messageElement.textContent = "Please fill in all required fields.";
            messageElement.style.color = "red";
            field.focus();
            return false;
        }
    }
    
    // Additional email validation
    const email = document.getElementById("email").value;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        messageElement.textContent = "Please enter a valid email address.";
        messageElement.style.color = "red";
        return false;
    }

    return true;
}

// Success message handler
function showSuccessMessage(formData) {
    const messageElement = document.getElementById("bookingMessage");
    messageElement.innerHTML = `
        <span style="color: green; font-weight: bold;">
            ✔️ Thank you, ${formData.get('name')}!<br>
            Your booking for ${formData.get('service_type')} under ${formData.get('service')} has been received.<br>
            We'll confirm your appointment shortly via email.
        </span>
    `;
}

// Error message handler
function showErrorMessage() {
    const messageElement = document.getElementById("bookingMessage");
    messageElement.innerHTML = `
        <span style="color: red; font-weight: bold;">
            ❌ Error submitting form. Please try again.<br>
            For immediate assistance, call: <a href="tel:+919593966583">+91 9593966583</a>
        </span>
    `;
}

// Service type options updater (unchanged from your original)
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
    
    // Service options mapping
    const serviceOptions = {
        "pathology": ["Blood Test", "Sugar Test", "Blood Group Test", "Liver Function Test", "Kidney Function Test"],
        "x-ray": ["Chest X-Ray", "Abdominal X-Ray", "Bone X-Ray"],
        "ecg": ["Resting ECG", "Exercise ECG"],
        "biopsy": ["Skin Biopsy", "Liver Biopsy", "Kidney Biopsy"],
        "pft": ["Spirometry", "Lung Volume Test"]
    };

    // Add new options
    if (serviceOptions[service]) {
        serviceOptions[service].forEach(type => {
            let optionElement = document.createElement("option");
            optionElement.value = type.toLowerCase().replace(/ /g, "-");
            optionElement.textContent = type;
            serviceType.appendChild(optionElement);
        });
    }

    // Show dropdown
    serviceType.style.display = "block";
    serviceType.disabled = false;
}
