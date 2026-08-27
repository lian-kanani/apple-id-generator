# Apple ID Cards Generator

A complete web-based tool designed to automatically generate printable A4 pages of Apple ID cards. The project supports reading data directly from Excel files to fill in account details (Email, Password, DOB, Security Questions) and formats them into ready-to-print double-sided physical cards.

---

**page link:** ([apple id generator](https://lian-kanani.github.io/apple-id-generator/))

## Features

- **Excel Integration:** Upload a `.xlsx` file to automatically populate hundreds of cards instantly using `SheetJS`.
- **Print-Ready Layout:** Precisely measured CSS Grid layout designed specifically for standard A4 paper.
- **Double-Sided Printing:** Automatically generates alternating Front and Back pages for easy two-sided printing.
- **Manual Editing:** Click on any empty cell directly in the browser to type data manually.
- **Scratch-Off Simulation:** Custom styling for hidden fields (Password/DOB) designed to be covered by scratch-off stickers physically.

## Project Structure

- `index.html` - The main interface and structure.
- `css/style.css` - Styling, print media queries, and A4 page formatting.
- `js/main.js` - Application logic and Excel parsing.

## How to Use

1. Clone the repository: 
```Bash
git clone https://github.com/lian-kanani/apple-id-generator.git
cd apple-id-generator
```
2. Open `index.html` in any modern web browser.
3. Use the **Upload Excel** button to load your data (Columns: Email | Password | DOB | Q1 | Q2 | Q3).
4. Click **Print Cards Now** and ensure your printer is set to A4 size with default margins.

## Tech Stack

- HTML5 / CSS3 (Grid & Print Media Queries)
- Vanilla JavaScript
