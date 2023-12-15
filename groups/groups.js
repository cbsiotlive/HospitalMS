
// ------------------------side ber----------------------------------
const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
    $(".dashboard-nav-dropdown-toggle").click(function () {
        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
        $(this).parent()
            .siblings()
            .removeClass("show");
    });
    $(".menu-toggle").click(function () {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
    });
});


$(document).ready(function () {
    $(".dashboard-nav-item").click(function () {
        // Remove the "active" class from all items
        $(".dashboard-nav-item").removeClass("active");

        // Add the "active" class to the clicked item
        $(this).addClass("active");
    });
});
// ------------------------side ber End----------------------------------

//------------------------online offline----------------------------------
var stutas = 1;
function updateStatus() {
    var statusButton = document.getElementById('statusButton');

    if (stutas == 1) {
        statusButton.classList.remove('offline');
        statusButton.classList.add('online');
    } else {
        statusButton.classList.remove('online');
        statusButton.classList.add('offline');
    }
}

updateStatus();

window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
//------------------------online offline end----------------------------------

// ------------------------last seen----------------------------------
var stutas = 1;
function lastseenupdateStatus() {

    var statusText = document.getElementById('statusText');

    if (stutas == 1) {

        statusText.textContent = 'Online';
    } else {

        var lastSeenMinutesAgo = getLastSeenMinutesAgo();
        statusText.textContent = 'Last seen ' + lastSeenMinutesAgo + ' minutes ago';
    }
}

function getLastSeenMinutesAgo() {
    return Math.floor(Math.random() * 60) + 1;
}

lastseenupdateStatus();

window.addEventListener('online', lastseenupdateStatus);
window.addEventListener('offline', lastseenupdateStatus);
// ------------------------last seen end----------------------------------

// ------------------------last seen by mouse function----------------------------------
document.addEventListener("DOMContentLoaded", function () {
    let lastMoveTime = new Date().getTime(); // Initialize last move time
  
    // Set initial status
    updateStatus(true);
  
    document.addEventListener("mousemove", function () {
      lastMoveTime = new Date().getTime(); // Update last move time
      updateStatus(true);
    });
  
    const checkInterval = 1000;
    const inactivityTime = 5000;
  
    setInterval(function () {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - lastMoveTime;
  
      if (elapsedTime >= inactivityTime) {
        updateStatus(false, lastMoveTime);
      }
    }, checkInterval);
  
    // Function to update status text
    function updateStatus(active, lastMoveTime) {
      const statusElement = document.getElementById("status");
  
      if (active) {
        statusElement.textContent = "Online";
        statusElement.style.color = "green";
      } else {
        const now = new Date();
        const lastMoveDate = new Date(lastMoveTime);
        const hours = lastMoveDate.getHours();
        const minutes = lastMoveDate.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
  
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const lastMoveTimeString = `${formattedHours}:${padZero(minutes)} ${ampm}`;
  
        // Check if last move was today or yesterday
        const isToday = now.toDateString() === lastMoveDate.toDateString();
        const isYesterday = new Date(now - 86400000).toDateString() === lastMoveDate.toDateString();
  
        let dateLabel = "";
        if (isToday) {
          dateLabel = "Today";
        } else if (isYesterday) {
          dateLabel = "Yesterday";
        } else {
          dateLabel = lastMoveDate.toLocaleDateString();
        }
  
        statusElement.textContent = `Last seen ${dateLabel}, at ${lastMoveTimeString}`;
        statusElement.style.color = "red";
      }
    }
  
    // Function to pad single-digit minutes with a leading zero
    function padZero(number) {
      return number < 10 ? `0${number}` : number;
    }
  });
  // ------------------------last seen by mouse function end----------------------------------