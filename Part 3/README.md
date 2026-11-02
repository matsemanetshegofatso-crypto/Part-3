# The Little Cake Shop — Website Project

## 1. Organisation Overview

**Name:** The Little Cake Shop

**Brief History:**
The Little Cake Shop is a charming local bakery based at Mall@Reds in Centurion, Gauteng. This inviting little spot focuses on freshly baked cakes, cupcakes, pastries and cookies, and also creates custom celebration cakes for birthdays, weddings and other special events. Over the years it has earned a strong reputation in the community thanks to its high-quality products, warm service and affordable prices. It has a more personal feel than a large commercial bakery, which is likely why so many customers return again.

**Mission Statement:**
Our mission is to create delicious, high-quality baked goods that bring happiness to every celebration while providing great customer service.

**Vision Statement:**
Our vision is to become the preferred bakery in Centurion by offering creative, fresh and cute baked products.

**Target Audience:**
- Families
- Students
- Working professionals
- Event planners

## 2. Goals and Objectives

**Goals:**
- Increase brand awareness
- Showcase bakery products
- Allow customers to place cake enquiries online
- Display contact information
- Increase store visits and custom cake orders

**Key Performance Indicators (KPIs):**
- Number of website visitors
- Number of enquiry forms submitted
- Increase in custom cake orders
- Customer feedback received
- Growth in social media followers

## 3. Current Website Analysis

**Current Situation:**
The Little Cake Shop does not currently have an official website and mainly relies on walk-in customers and social media.

**Areas for Improvement:**
- Create an online presence
- Display product catalogue
- Provide online enquiry forms
- Improve visibility on search engines
- Make contact details easier to find

## 4. Proposed Website Features and Functionality

The website will include:
- Home Page
- About Us
- Custom Cake Ordering page (Enquiry)
- Contact Us
- Link to location

## 5. Design and User Experience

**Colour Scheme:**
- Pink
- Brown
- All shades of cream

**Typography:**
- Headings: Playfair Display
- Body Text: Poppins or Arial

**Layout and Design:**
- Clean and modern
- Large, high-quality cake images
- Easy-to-use navigation menu
- Clear "Order Now" buttons
- Consistent branding throughout the website

**User Experience:**
- Responsive on mobile, tablet and desktop
- Fast loading pages
- Simple navigation
- Accessible contact information
- Easy-to-read fonts and colours

**Low-Fidelity Wireframes:**

**Home Page**
```
----------------------------------
Logo

Navigation Bar

Hero Image

Welcome Message

Featured Cakes

Special Offers

Footer
----------------------------------
```

**Contact Page**
```
----------------------------------
Logo

Navigation

Contact Form

Phone Number

Email

Map

Business Hours

Footer
----------------------------------
```

## 6. Technical Requirements

**Domain Name:** https://statuesque-gaufre-8cc143.netlify.app

**Hosting:** Shared web hosting suitable for a small business

**Programming Languages:**
- HTML
- CSS
- Java script

**Tools:**
- Visual Studio Code
- GitHub
- Google Maps API (for location)

## 7. Timeline and Milestones

_To be added._

## 8. Budget

_To be added._

## 9. Implementation Progress

**Pages built:**
- `index.html` — Home page, complete with responsive header, nav, product gallery, and contact info
- `about.html` — in progress
- `services.html` — in progress
- `enquiry.html` — not yet built
- `contact.html` — not yet built
- `main.js`
- `robots.txt`
- `sitemap.xml`
- `products.json`


**Stylesheet:**
- All pages share one external stylesheet, `style.css`, instead of repeating inline `<style>` blocks
- Includes a CSS reset, base typography, a responsive nav (stacked on mobile, row on tablet/desktop), a responsive product image grid, and a global rule so any image on any page scales to fit its container
- Breakpoints: `768px` (tablet) and `1024px` (desktop), mobile-first

**Responsive images:**
- `Cake.png` and `Cupcakes.png` have been resized into `-400w` and `-800w` versions and use `srcset`/`sizes` so smaller devices download smaller files
- `Sweets.png` is only available as a single small file (240×328px) — too low-resolution to generate an `-800w` version; a higher-resolution source photo is needed
- `Chocolate.png` has been resized into `-400w` and `-800w` versions, ready to use once its correct placement on the site is confirmed


**Outstanding items:**
- Fix repeated `heighr` typo (should be `height`) on the Services page image
- Replace deprecated `bgcolor` and `align` HTML attributes with CSS across all pages
- Add `alt` text to all images site-wide
- Confirm placement of the Chocolate hamper image (About page vs Services page)
- Build out `enquiry.html` and `contact.html`
- Get a higher-resolution photo of the sweets/hampers product


## 10. References
Anon., n.d. *The Little Cake Shop*. [Online]
Available at: https://www.thelittlecakeshop.co.za/mall-at-reds
[Accessed 14 August 2026].

n.d., 2026. *Jamii Directory*. [Online]
Available at: jamii.co.za
[Accessed 14 August 2026].