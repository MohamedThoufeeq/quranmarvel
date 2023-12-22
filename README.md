# Multi Language Quran Reader Web Application

## Description

The Quran Reader Web Application allows users to explore the Quran in multiple languages. It provides a dynamic and user-friendly interface for reading specific chapters and verses, with options to customize the viewing experience.

## Table of Contents
- [About](#about)
- [Color Reference](#color-reference)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [quranmarvel.com](#quranmarvel)

## About

- Very lightweight and simple web app for reading the Quran.
- Doesn't require any library or framework to run, written in Vanilla.js.
- Works in all kinds of browsers.
- Doesn't collect caches and cookies, ensuring user privacy.
- Loading time is approximately 1 second for a swift user experience.
- Easily deployable.
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Background Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |
| Tile Color | ![#0a116e](https://via.placeholder.com/10/0a116e?text=+) #0a116e |
| Highlight Color | ![#d8040c](https://via.placeholder.com/10/d8040c?text=+) #d8040c |
| Text Color | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |



## Features

1. **Dynamic Chapter Selection:**
   - The application dynamically populates the chapter dropdown, allowing users to easily select a specific chapter from the Quran.

2. **Verse Input:**
   - Users can input a verse number to read a specific verse or leave it blank to view the entire chapter.

3. **Language Selection:**
   - The language dropdown enables users to choose from a variety of translations, providing a multi-language Quran reading experience.

4. **Arabic Text Display:**
   - Users have the option to show or hide the Arabic text using a clicky switch, providing flexibility based on individual preferences.

5. **Navigation Tools:**
   - Navigation buttons (`< chapter` and `chapter >`) allow users to easily move between chapters without manually changing the dropdown selection.
   - Navigation buttons (`< verse` and `verse >`) allow users to easily move between verses without manually changing the dropdown selection.

6. **Chapter Information Display:**
   - The application displays essential information about the selected chapter, including the chapter number, name, verse count, and revelation type.

7. **Bismillah Display:**
   - The application includes the display of "Bismillah" (In the name of GOD, The Most Merciful, The Most Gracious) at the beginning of each chapter.

8. **Responsive Design:**
   - The user interface is designed to be responsive, ensuring a seamless experience across various devices and screen sizes.

9. **Error Handling:**
    - The application incorporates error handling mechanisms to display informative messages in case of API request failures or other issues.

10. **Clear Presentation:**
    - Verses are presented in a clear and organized manner, making it easy for users to read and understand the Quranic text.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/MohamedThoufeeq/quranmarvel.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repo
    ```

3. Open `index.html` in your preferred browser.

## Usage

1. Open `index.html` in your web browser.
2. Select a chapter from the dropdown.
3. Enter a verse number or leave it blank for the entire chapter.
4. Choose a translation from the language dropdown.
5. Optionally, check the "Without Arabic" checkbox to hide Arabic text.
6. Explore the Quranic text with the provided tools.

## Demo

Click this link for live demo of out web application.
[quranmarvel.com/quran](https://quranmarvel.com/quran/)



# API Reference
Special Thanks to **api.alquran.coud** for their free api service.
This Quran reader web application utilizes the Al-Quran Cloud API to fetch Quranic data dynamically. 
They provide lots of endpoints to access their api with lots of data (For Example : Search option), We utilized only 4 endpoints for our application.
Below is a brief reference for the API endpoints used in our application:

## 1. Fetching List of Chapters

- **Endpoint:** `https://api.alquran.cloud/v1/surah`
- **Method:** GET
- **Description:** Retrieves the list of chapters (surah) in the Quran along with their details such as name, English translation, and verse count.

## 2. Fetching List of Translations (Editions)

- **Endpoint:** `https://api.alquran.cloud/v1/edition/type/translation`
- **Method:** GET
- **Description:** Fetches the available translations (editions) of the Quran in various languages. The response includes details such as language code, English name, and translation identifier.

## 3. Fetching Verses of a Chapter

- **Endpoint:** `https://api.alquran.cloud/v1/surah/{chapterNumber}/editions/quran-uthmani,{translationIdentifier}`
- **Method:** GET
- **Description:** Retrieves the verses of a specific chapter (surah) in the Quran. The response includes the Arabic text and the selected translation for each verse.

## 4. Fetching a Specific Verse

- **Endpoint:** `https://api.alquran.cloud/v1/ayah/{chapterNumber}:{verseNumber}/editions/quran-uthmani,{translationIdentifier}`
- **Method:** GET
- **Description:** Fetches a specific verse from a given chapter in the Quran. The response includes the Arabic text and the selected translation for the requested verse.

### Important Notes:

- Ensure that you use the appropriate translation identifier when fetching verses to get the desired language translation.
- The Al-Quran Cloud API documentation can be referred to for more details on available endpoints and parameters: [Al-Quran Cloud API Documentation](https://alquran.cloud/api)

Feel free to explore the API documentation for additional features and details provided by the Al-Quran Cloud API. If you have any questions or need further assistance, refer to the API documentation or reach out to the API provider for support.
## Contributing

Feel free to contribute to the development of this project. Follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

## QuranMarvel
Explore out Blog page [quranmarvel.com](https://quranmarvel.com/) where we explore about Marvel of Quran.
