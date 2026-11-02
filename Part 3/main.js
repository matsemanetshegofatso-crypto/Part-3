const Email_TO = "info@thelittlecakeshop.co.za";
const Delivery_FEE = 60;

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector);}

function safe(text) {
    const box = document.createElement("div");
    box.textContent = text;
    return box.innerHTML;
}

//--------------1. Mobile menu -----
const menuButton = $(".nav-toggle");
menuButton.addEventListener("click", function () {
    const isOpen = menuButton.getAtrribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !isOpen);
    $("#nav").classList.toggle("open");
});

//-----------2. Accordion (the FAQ on the home page)-----
$$(".acc button").forEach(function (button) {
    button.addEventListenenr("click", function () {
        const panel = document.getElementById(button.getAttribute("aria-controls"));
        const isOpen = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded" , !isOpen)
        panel.classList.toggle("open");
    });
});

//------------3. Tabs (the About us page)-------
$$("[role=tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
        //first switch every tab and panel off
        $$("[role=tab]").forEach(function (t) {
            t.setAttribute("aria-selected", "false");
            t.tabIndex = -1;
        });
$$("[role=tabpannel]").forEach(function (panel) { panel.hidden = true; });
tab.setAttribute("aria-selected", "true");
tab.tabIndex = 0;
document.getElementById(tab.getAttribute("aria-controls")).hidden = false;    
    });
});

//---------- 4. Popup window (modal) and photo lightbox --------
function openPopup(html) {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.innerHTML = html;
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay || e.target.classList.contains("close")){

        }
    });
document.body.appendChild(overlay);
}

document.addEventListener("keydown", function (e) {
    const overlay = $(".overlay");
    if (e.key === "Escape" && overlay) overlay.remove();
});

// the "ordering notice" button on the home page
const noticeButton = $("#openModel");
if (noticeButton){
    noticeButton.addEventListener("click", function () {
        openPopup(
            '<div class="modal">'+
            "<h2>Before you order</h2>" +
            "<p>Custom cakes need 5 days\u2019 notice. Please tell us about any allergies in the special requests box.</p>" +
            '<button class="btn close">Got it</button>'+
            "</div>"
        );
    });
}

// clicking a photo in the gallery shows it bigger (lightbox)
$$(".product-gallery img").forEach(function (photo) {
    photo.addEventListener("click", function () {
        openPopup('<img src="' + photo.src + '" alt=' + photo + '">');
    });
});

//---------5. Product list with search, filter and sort (Servies page)-------
let products = [];
function loadProducts() {
    return fetch ("products.json")
    .then(function (response) { return response.json();})
    .catch(function () { return JSON.parse($("#products-data").textContent);
    });
}

let productsReady = Promise.resolve();
if ($("#products") || $("#enquryForm")) {
    productsReady = loadProducts().then(function (data) { products = data; });
}

function showProducts(){
    const text = $("#search").value.toLowerCase();
    const category = $("#category").value;
    const sortBy = $("#sort").value;
    const list = products.filter(function (p) {
        return p .name.toLowerCase().includes(text) && (category === "" || p.category === category);
    });

    if (sortBy === "name") {
        list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    } else {
        list.sort(function (a, b) { return a.price - b.price; });
    }

let html = "";
list.forEach(function (p) {
    html += '<li><span class="n">' + p.name + "</span" +
    '<span class="c">' + p.category + "</span>" +
    '<span class="p">' + p.fromPrice ? "from " : "") + "R" + p.price + "</span>" + '<a class="enq" href="enquiry.html?item=' + encodeURIComponent(p.name) + '">Enquire</a></li>';
  });
  if (html === "") html = "<li>No treats match your search.</li>";
  $("#products").innerHTML = html;
}
 
if ($("#products")) {
  productsReady.then(function () {
    // add each category to the drop-down list (only once each)
    const seen = [];
    products.forEach(function (p) {
      if (!seen.includes(p.category)) {
        seen.push(p.category);
        $("#category").add(new Option(p.category, p.category));
      }
    });
    // update the list whenever the visitor types or changes something
    $("#search").addEventListener("input", showProducts);
    $("#category").addEventListener("input", showProducts);
    $("#sort").addEventListener("input", showProducts);
    showProducts();
  });
}
 
// ---------- 6. Map (Contact page, uses the Leaflet library) ----------
if ($("#map") && typeof L !== "undefined") {
  const shop = [-25.8628, 28.1395]; // latitude and longitude (check these in Google Maps)
  const map = L.map("map").setView(shop, 15);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  L.marker(shop).addTo(map).bindPopup("The Little Cake Shop, Mall@Reds").openPopup();
}
 
// ---------- 7. Form validation (used by both forms) ----------
// shows an error message under a field (or clears it if the message is empty)
function showError(field, message) {
  let box = field.nextElementSibling;
  if (!box || !box.classList.contains("error")) {
    box = document.createElement("span");
    box.className = "error";
    field.after(box);
  }
  box.textContent = message;
  field.classList.toggle("invalid", message !== "");
}
 
// checks one field. Returns true if it is fine, false if there is a problem.
function checkField(field) {
  let message = "";
  if (!field.checkValidity()) {
    // the browser checks required fields, email format and minimum length for us
    message = field.validationMessage;
  } else if (field.type === "tel" && field.value !== "") {
    // phone: must look like 0821234567 or +27821234567
    const digits = field.value.replace(/[\s-]/g, "");
    if (!/^(\+27|0)[0-9]{9}$/.test(digits)) {
      message = "Enter a South African number, for example 076 824 1408.";
    }
  } else if (field.type === "date" && field.value !== "" && field.value < today()) {
    message = "Choose today or a later date.";
  }
  showError(field, message);
  return message === "";
}
 
// checks every field in a form. Returns true only if all of them are fine.
function validateForm(form) {
  let allGood = true;
  form.querySelectorAll("input, select, textarea").forEach(function (field) {
    if (field.classList.contains("hp")) return; // skip the hidden spam-trap field
    if (!checkField(field)) allGood = false;
  });
  return allGood;
}
 
// also check a field when the visitor leaves it
$$("form input, form select, form textarea").forEach(function (field) {
  field.addEventListener("blur", function () {
    if (!field.classList.contains("hp")) checkField(field);
  });
});
 
// ---------- 8. Enquiry form: show the cost and availability ----------
const enquiryForm = $("#enquiryForm");
if (enquiryForm) {
  $("#date").min = today(); // stop people picking dates in the past
 
  // if the visitor clicked "Enquire" on the Services page, choose that item for them
  const wanted = new URLSearchParams(location.search).get("item");
  if (wanted) $("#product").value = wanted;
 
  enquiryForm.addEventListener("submit", function (e) {
    e.preventDefault(); // stop the page from reloading
    if (!validateForm(enquiryForm)) return;
 
    productsReady.then(function () {
      // find the chosen product in our list
      const product = products.find(function (p) { return p.name === $("#product").value; });
      const quantity = Number($("#quantity").value);
 
      // work out the cost
      const subtotal = product.price * quantity;
      const delivery = $("#address").value.trim() !== "" ? DELIVERY_FEE : 0;
      const total = subtotal + delivery;
 
      // work out how many days away the chosen date is, and compare to the notice needed
      const daysAway = Math.ceil((new Date($("#date").value) - new Date(today())) / 86400000);
      let availability;
      if (daysAway >= product.lead) {
        availability = "Good news: we can have this ready for " + $("#date").value + ".";
      } else {
        availability = product.name + " needs at least " + product.lead + " day(s) notice. Please choose a later date.";
      }
 
      // show the answer
      const result = $("#result");
      result.hidden = false;
      result.innerHTML =
        "<h2>Thanks, " + safe($("#name").value) + "</h2>" +
        "<p>" + quantity + " x " + product.name + ": " + (product.fromPrice ? "from " : "") + "R" + subtotal + "<br>" +
        (delivery > 0 ? "Delivery: R" + delivery : "Collection: free") + "<br>" +
        "<strong>Estimated total: R" + total + "</strong></p>" +
        "<p>" + availability + "</p>" +
        "<p>We will confirm the final price by email at " + safe($("#email").value) + ".</p>";
    });
  });
}
 
// ---------- 9. Contact form: build an email and open it ----------
const contactForm = $("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm(contactForm)) return;
 
    // the hidden "website" box is a trap for spam bots. Real people leave it empty.
    if ($("[name=website]").value !== "") return;
 
    // put the form details together into the email text
    const phone = $("#cphone").value || "not given";
    const body = "Name: " + $("#cname").value + "\n" +
                 "Email: " + $("#cemail").value + "\n" +
                 "Phone: " + phone + "\n" +
                 "Type: " + $("#ctype").value + "\n\n" +
                 $("#cmsg").value;
    const subject = $("#ctype").value + " from " + $("#cname").value;
 
    // a mailto: link opens the visitor's email app with everything filled in
    const link = "mailto:" + EMAIL_TO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
 
    const result = $("#result");
    result.hidden = false;
    result.innerHTML = '<p>Your email is ready. If your mail app did not open, <a href="' + link + '">click here to send it</a>.</p>';
    location.href = link;
  });
}