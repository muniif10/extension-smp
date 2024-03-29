// Define a variable to track if the script has been loaded
let scriptLoaded = false;

var frame = window.frames["contentFrame"];
var frameDocument;
if (frame !== undefined) {
  frameDocument = frame.document;
} else {
  frameDocument = document;
}
// Function to check the condition and load the script
function checkConditionAndLoadScript() {
  var frame = window.frames[1];
  var frameDocument;
  if (frame !== undefined) {
    frameDocument = frame.document;
    
  } else {
    frameDocument = document;

  }

  // Check for your specific condition here
  if (frameDocument.getElementById("sems_id_to_register") !== null) {
    // Ensure the script is loaded only once

    if (
      !scriptLoaded ||
      frameDocument.getElementById("extensionButtonJadual") == null
    ) {
      
      // Send message to background script to load the extension script
      setTimeout(theThing(), 100);
      
      scriptLoaded = true; // Set the flag to true to prevent loading again
    }
  }
}

// Check the condition initially
checkConditionAndLoadScript();

// Check the condition periodically (every 1 second in this example)
setInterval(checkConditionAndLoadScript, 1000);

function theThing() {
  

  var frame = window.frames[1];
  var frameDocument;
  if (frame !== undefined) {
    frameDocument = frame.document;
    
  } else {
    frameDocument = document;
    
  }
  

  

  // Ensure semester and studentId elements are found before getting their attributes
  var semesterElement = frameDocument.getElementById("semsIdToRegister");
  var studentIdElement = frameDocument.getElementById("studId");

  if (semesterElement && studentIdElement) {
    var semester = semesterElement.getAttribute("value");
    var studentId = studentIdElement.getAttribute("value");

    var button = frameDocument.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("style", "color: black;");
    button.setAttribute("value", "LIHAT JADUAL BAHARU");
    button.id = "extensionButtonJadual";

    button.setAttribute(
      "onclick",
      `window.open('https://smprep.upm.edu.my/reports/rwservlet?smpreports&module=Portal_J_Waktu_Kuliah.rdf&SEMESTER=${semester}&STUD_ID=${studentId}');`
    );
    button.textContent = "LIHAT JADUAL BAHARU";

    // Extension marker
    var marker = frameDocument.createElement("p");
    marker.textContent = "Extension: ";

    // Create a span element
    var span = frameDocument.createElement("span");
    span.classList.add("button");

    // Append the button to the span
    span.appendChild(button);

    // Find the element you want to inject into (assuming you have an existing span with class "button")
    var existingSpan = frameDocument.querySelector(".top_info_bg2");

    // Inject the new button into the existing span
    existingSpan.appendChild(marker);
    existingSpan.appendChild(span);
  } else {
    console.error("Error: One or both of the required elements not found.");
  }
}
