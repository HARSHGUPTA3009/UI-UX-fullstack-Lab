// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // Form Validation for Registration Page
  const registrationForm = document.getElementById("registrationForm")
  if (registrationForm) {
    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Clear previous error messages
      clearErrorMessages()

      let isValid = true

      // Validate name
      const name = document.getElementById("name").value.trim()
      if (name === "") {
        showError("nameError", "Name is required")
        isValid = false
      } else if (name.length < 2) {
        showError("nameError", "Name must be at least 2 characters long")
        isValid = false
      }

      // Validate email
      const email = document.getElementById("email").value.trim()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (email === "") {
        showError("emailError", "Email is required")
        isValid = false
      } else if (!emailRegex.test(email)) {
        showError("emailError", "Please enter a valid email address")
        isValid = false
      }

      // Validate event selection
      const event = document.getElementById("event").value
      if (event === "") {
        showError("eventError", "Please select an event")
        isValid = false
      }

      // Validate terms checkbox
      const terms = document.getElementById("terms").checked
      if (!terms) {
        showError("termsError", "You must agree to the terms and conditions")
        isValid = false
      }

      if (isValid) {
        // Show success message
        showSuccessAlert("Registration successful! You will receive a confirmation email shortly.")

        // Reset form after successful submission
        setTimeout(() => {
          registrationForm.reset()
        }, 2000)
      } else {
        // Show error alert
        showErrorAlert("Please correct the errors above and try again.")
      }
    })
  }

  // FAQ Toggle Functionality
  const faqItems = document.querySelectorAll(".faq-item")
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    if (question) {
      question.addEventListener("click", () => {
        // Close other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
          }
        })

        // Toggle current item
        item.classList.toggle("active")
      })
    }
  })

  // Gallery Filter Functionality
  const categoryBtns = document.querySelectorAll(".category-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const category = this.getAttribute("data-category")

      // Filter gallery items
      galleryItems.forEach((item) => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "block"
          item.style.animation = "fadeInUp 0.5s ease-out"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add scroll effect to navigation
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.style.backgroundColor = "rgba(26, 26, 26, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.style.backgroundColor = "var(--secondary-bg)"
      navbar.style.backdropFilter = "none"
    }
  })

  // Add loading animation to images
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
      this.style.transform = "scale(1)"
    })

    // Set initial styles for loading animation
    img.style.opacity = "0"
    img.style.transform = "scale(0.9)"
    img.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })
})

// Helper Functions
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
    errorElement.style.display = "block"
  }
}

function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error-message")
  errorElements.forEach((element) => {
    element.textContent = ""
    element.style.display = "none"
  })
}

function showSuccessAlert(message) {
  // Create and show success alert
  const alert = document.createElement("div")
  alert.className = "alert alert-success"
  alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--success-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        animation: slideInRight 0.5s ease-out;
    `
  alert.textContent = message

  document.body.appendChild(alert)

  // Remove alert after 5 seconds
  setTimeout(() => {
    alert.style.animation = "slideOutRight 0.5s ease-out"
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert)
      }
    }, 500)
  }, 5000)
}

function showErrorAlert(message) {
  // Create and show error alert
  const alert = document.createElement("div")
  alert.className = "alert alert-error"
  alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--error-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        animation: slideInRight 0.5s ease-out;
    `
  alert.textContent = message

  document.body.appendChild(alert)

  // Remove alert after 5 seconds
  setTimeout(() => {
    alert.style.animation = "slideOutRight 0.5s ease-out"
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert)
      }
    }, 500)
  }, 5000)
}

// Add CSS animations for alerts
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Form input enhancements
document.addEventListener("DOMContentLoaded", () => {
  // Add focus/blur effects to form inputs
  const formInputs = document.querySelectorAll("input, select, textarea")
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused")
      if (this.value.trim() !== "") {
        this.parentElement.classList.add("filled")
      } else {
        this.parentElement.classList.remove("filled")
      }
    })
  })
})

// Keyboard navigation for FAQ items
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    const focusedElement = document.activeElement
    if (focusedElement.classList.contains("faq-question")) {
      e.preventDefault()
      focusedElement.click()
    }
  }
})

// Add intersection observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".highlight-card, .event-item, .gallery-item, .faq-item")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })
})
