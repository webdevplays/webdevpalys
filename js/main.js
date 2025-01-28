document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var formData = new FormData(form);

        fetch("contact.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(result => {
                if (result === "Success") {
                    showNotification("Message sent successfully", "success");
                } else {
                    showNotification("Message sent successfully", "success");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                showNotification("Error: Something went wrong", "error");
            });
    });

    function showNotification(message, type) {
        toastr.options = {
            closeButton: false,
            progressBar: true,
            positionClass: "toast-bottom-right",
            showDuration: 300,
            hideDuration: 1000,
            timeOut: 5000,
            extendedTimeOut: 1000,
        };

        toastr.clear(); // Clear any existing toasts


        if (type === "success") {
            toastr.success(message, "", { className: "toast-success" });
        } else {
            toastr.error(message, "", { className: "toast-error" });
        }
    }
});



// ------------- switch between dark and light mode ---------------- //

// Function to toggle between light and dark mode
function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('mode-icon');

    // Toggle the dark mode class
    body.classList.toggle('dark-mode');

    // Toggle the icon
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    // Save the user's preference to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
}

// Check if user's preference is stored in localStorage
const isDarkModeSaved = localStorage.getItem('dark-mode');

// Apply the saved preference (if available)
if (isDarkModeSaved === 'true') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}

// Update the icon based on the saved preference
const icon = document.getElementById('mode-icon');
if (icon) {
    if (isDarkModeSaved === 'true') {
        icon.classList.add('fa-sun');
    } else {
        icon.classList.add('fa-moon');
    }
}

// Add event listener to the mode toggle button
const modeToggle = document.getElementById('mode-toggle');
if (modeToggle) {
    modeToggle.addEventListener('click', toggleDarkMode);
}



// ---------------- preloader -------------------- //

var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
    loader.style.display = "none";
})


// ---------------- back to top button -------------------- //

let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let porogressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
        scrollProgress.style.display = "grid";
    }
    else {
        scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#02f291 ${scrollValue}%, #434e49 ${scrollValue}%)`;
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;



const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

function rotateIcon(iconId) {
    const icon = document.getElementById(iconId);
    icon.classList.toggle('rotated');
}

//   ------------- numbers counter -----------------//

$(document).ready(function () {
    $(".counter").counterUp({
        delay: 10,
        time: 1200,
    });
});
