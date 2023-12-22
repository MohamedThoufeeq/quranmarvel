const chapterDropdown = document.getElementById('chapter-number');
const verseNumberInput = document.getElementById('verse-number');
const languageDropdown = document.getElementById('language');
const translationDropdown = document.getElementById('translation');
const resultDiv = document.getElementById('result');
const arabicVerses = document.getElementsByClassName("arabicVerse");
var singleVerseArabic = document.getElementsByClassName("singleVerseArabic")
var checkbox = document.getElementById("checkbox");
var defaultIdentifier = 'en.sahih';
// Get the button element by its ID
const plusbutton = document.getElementById('plusbutton');
const minusbutton = document.getElementById('minusbutton');


var json = {
    "ar": "Arabic",
    "sq": "Albanian",
    "az": "Azerbaijani",
    "bn": "Bengali",
    "bg": "Bulgarian",
    "ba": "Bosnian",
    "bs": "Bosnian",
    "my": "Burmese",
    "zh": "Chinese",
    "cs": "Czech",
    "dv": "Divehi; Dhivehi; Maldivian;",
    "en": "English",
    "fr": "French",
    "de": "German",
    "ha": "Hausa",
    "hi": "Hindi",
    "id": "Indonesian",
    "it": "Italian",
    "ja": "Japanese",
    "ko": "Korean",
    "ku": "Kurdish",
    "ms": "Malay",
    "ml": "Malayalam",
    "nl": "Dutch",
    "no": "Norwegian",
    "pl": "Polish",
    "pt": "Portuguese",
    "fa": "Persian",
    "ro": "Romanian",
    "ru": "Russian",
    "sd": "Sindhi",
    "si": "Sinhalese",
    "so": "Somali",
    "es": "Spanish",
    "sv": "Swedish",
    "sw": "Swahili",
    "ta": "Tamil",
    "tg": "Tajik",
    "th": "Thai",
    "tr": "Turkish",
    "tt": "Tatar",
    "ug": "Uyghur",
    "ur": "Urdu",
    "uz": "Uzbek",

};
var vNo = { "1": 7, "2": 286, "3": 200, "4": 176, "5": 120, "6": 165, "7": 206, "8": 75, "9": 129, "10": 109, "11": 123, "12": 111, "13": 43, "14": 52, "15": 99, "16": 128, "17": 111, "18": 110, "19": 98, "20": 135, "21": 112, "22": 78, "23": 118, "24": 64, "25": 77, "26": 227, "27": 93, "28": 88, "29": 69, "30": 60, "31": 34, "32": 30, "33": 73, "34": 54, "35": 45, "36": 83, "37": 182, "38": 88, "39": 75, "40": 85, "41": 54, "42": 53, "43": 89, "44": 59, "45": 37, "46": 35, "47": 38, "48": 29, "49": 18, "50": 45, "51": 60, "52": 49, "53": 62, "54": 55, "55": 78, "56": 96, "57": 29, "58": 22, "59": 24, "60": 13, "61": 14, "62": 11, "63": 11, "64": 18, "65": 12, "66": 12, "67": 30, "68": 52, "69": 52, "70": 44, "71": 28, "72": 28, "73": 20, "74": 56, "75": 40, "76": 31, "77": 50, "78": 40, "79": 46, "80": 42, "81": 29, "82": 19, "83": 36, "84": 25, "85": 22, "86": 17, "87": 19, "88": 26, "89": 30, "90": 20, "91": 15, "92": 21, "93": 11, "94": 8, "95": 8, "96": 19, "97": 5, "98": 8, "99": 8, "100": 11, "101": 11, "102": 8, "103": 3, "104": 9, "105": 5, "106": 4, "107": 7, "108": 3, "109": 6, "110": 3, "111": 5, "112": 4, "113": 5, "114": 6 };
function fetchChapter() {
    // Populate chapter dropdown
    fetch('https://api.alquran.cloud/v1/surah')
        .then(response => response.json())
        .then(data => {

            for (i = 1; i <= 114; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.text = `${i}. ${data.data[i - 1].englishName}`;
                chapterDropdown.add(option);
            }
        })
}
fetchChapter();
function fetchLanguages() {
    const url = 'https://api.alquran.cloud/v1/edition/type/translation';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const translations = data.data;
            let languageOptions = '';

            translations.forEach(translation => {
                const languageCode = translation.language;
                const languageName = json[languageCode];
                const identifier = translation.identifier;
                languageOptions += `<option value="${identifier}">${languageName} (${translation.englishName})</option>`;
            });

            languageDropdown.innerHTML = `
                    <label for="language">Select language:</label>
                    <select id="language-select">
                    <option selected value="en.sahih">English (Sahih International)</option>
                    ${languageOptions}
                    </select>
                `;
        })
        .catch(error => {
            languageDiv.innerHTML = 'Number exceeded the total number of verses, Clear the verses and enter the number within the totalnumber of verses from the chapter ';
            console.log(error.message);
        });
}
fetchLanguages();

async function fetchData(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    reject(new Error("Failed to fetch data"));
                }
            }
        };
        xhr.send();
    });
}

async function fetchDataAndProcess(url, chapterNumber, verseNumber) {
    try {
        var data = await fetchData(url);

        let verses = '';
        document.getElementById("chapterInfo").innerHTML = ``;

        if (verseNumber) {
            document.getElementById("minusbutton").textContent = '< verse';
            document.getElementById("plusbutton").textContent = 'verse >';
            if (verseNumber == '1') {
                document.getElementById('minusbutton').disabled = true;
            } else if (vNo[chapterNumber] == verseNumber) {
                document.getElementById('plusbutton').disabled = true;
            }
            var totalVerses = data.data[0].surah.numberOfAyahs;

            let verseInArabic = data.data[0].text;
            let verseINEnglish = data.data[1].text;
            // Color the first 22 letters in green
            const bismi = verseInArabic.substring(0, 38);
            const remainingVerseArabic = verseInArabic.substring(38);
            function bismiGreen() {

                resultDiv.innerHTML += `                           
                            <div class = "singleVerseArabic" id = "singleVerseArabic">
                            ${remainingVerseArabic}
                            <br></div>
                            <div id= "englishText">
                            ${verseINEnglish}</div>                        
                            <div id = 'reference'><h5>Quran ${chapterNumber}:${verseNumber}</h5></div> `;
                verseNumberInput.max = totalVerses;
            }
            function arabicRed() {
                resultDiv.innerHTML = `                           
                            <div class = "singleVerseArabic" id = "singleVerseArabic">
                            ${verseInArabic}<br></div>
                            <div id= "englishText">
                            ${verseINEnglish}</div>                        
                            <div id = 'reference'><h5>Quran ${chapterNumber}:${verseNumber}</h5></div> `;
                verseNumberInput.max = totalVerses;
            }
            arabicRed();
            if (verseNumber == 1) {
                // if(chapterNumber =='9'){
                resultDiv.innerHTML = `<p><div class = "bismi" id="bismi">(Bismillahir Rahmanir Raheem) <span id="arabic">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ </span><br><span> In the name of GOD, The Most Merciful, The Most Gracious</span></div>`;
                // }
                bismiGreen();
                if (chapterNumber == 1) {
                    arabicRed();
                }
                
            } else {
                arabicRed();
            }
            
            document.getElementById("chapterInfo").innerHTML = `
                            <div id='cInfo'><p>
                            <table id = "tab">
                                 <tr id = "header">
                                   <th>Chapter Number</th>
                                   <th>Chapter Name</th>
                                   <th>Verse count</th>
                                   <th>Revelation type</th>
                                 </tr>
                                 <tr>
                                   <td>${data.data[0].surah.number}</td>
                                   <td>${data.data[0].surah.englishName} ( ${data.data[0].surah.englishNameTranslation} )  ( ${data.data[0].surah.name} )</td>
                                   <td> ${data.data[0].surah.numberOfAyahs}</td>
                                   <td>${data.data[0].surah.revelationType}</td>
                                 </tr></p>
                            </table></div> `;
            if(chapterNumber=='9' && verseNumber == '1'){
                document.getElementById('bismi').style.display='none';
            }
        } else {
            plusbutton.disabled = false;
            plusbutton.textContent = 'chapter >';
            minusbutton.textContent = '< chapter';

            const firstVerseArabic = data.data[0].ayahs[0].text.substring(0, 38);
            const remainingFirstVerseArabic = data.data[0].ayahs[0].text.substring(38);
            if(chapterNumber!='9'){
            verses += `<p><span class = "bismi" id="bismi">(Bismillahir Rahmanir Raheem)<span id="arabic"> بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ </span><br><span> In the name of GOD, The Most Merciful, The Most Gracious</span></span>`;
            }
            function fvoffc() {
                verses += `
                                <p><span id = "verseNo">1. </span><span id = 'firstVerseArabic' class = "arabicVerse">${remainingFirstVerseArabic}</span>
                                ${data.data[1].ayahs[0].text}</p>
                            `;
            }
            if (chapterNumber == 1) {
                verses += `
                              <p>
                                <span id = "verseNo">1.</span>
                                <span class="arabicVerse" id="arabicVerse">${data.data[0].ayahs[0].text}<br></span>
                                ${data.data[1].ayahs[0].text}<br>
                              </p>
                            `;
            } else {
                fvoffc();
            }
            function forLoopVerses() {
                for (let index = 1; index < data.data[1].ayahs.length; index++) {
                    const ayah = data.data[1].ayahs[index];
                    verses += `
                              <p>
                                <span id = "verseNo">${index + 1}.</span>
                                <span class="arabicVerse" id="arabicVerse">${data.data[0].ayahs[index].text}<br></span>
                                ${ayah.text}<br>
                              </p>
                            `;
                }
            }
            forLoopVerses();

            resultDiv.innerHTML = `<ol>${verses}</ol>`;
            document.getElementById("chapterInfo").innerHTML = `
                            <div id='cInfo'><p>
                            <table id = "tab">
                                 <tr id = "header">
                                   <th>Chapter Number</th>
                                   <th>Chapter Name</th>
                                   <th>Verse count</th>
                                   <th>Revelation type</th>
                                 </tr>
                                 <tr>
                                   <td>${data.data[0].number}</td>
                                   <td>${data.data[0].englishName} ( ${data.data[0].englishNameTranslation} ) ( ${data.data[0].name} )</td>
                                   <td>${data.data[0].numberOfAyahs}</td>
                                   <td>${data.data[0].revelationType}</td>
                                 </tr></p>
                            </table></div>
                            `;
        }

    } catch (error) {
        console.error("Error:", error.message);
    }
}

function fetchVerses(chapterNumber, verseNumber) {
    var notVerseURL = `https://api.alquran.cloud/v1/surah/${chapterNumber}/editions/quran-uthmani,${languageDropdown.value}`;
    var verseWithArabic = `https://api.alquran.cloud/v1/ayah/${chapterNumber}:${verseNumber}/editions/quran-uthmani,${languageDropdown.value}`;
    var url;
    if (verseNumber) {
        url = verseWithArabic;
        document.getElementById('result').style.overflowY = 'hidden';
        document.getElementById('result').style.maxHeight = 'fit-content';

    } else {
        url = notVerseURL;
    }
    //process data
    fetchDataAndProcess(url, chapterNumber, verseNumber);

}
function updateResult() {
    plusbutton.disabled = false;
    minusbutton.disabled = false;
    const chapterNumber = chapterDropdown.value;
    const verseNumber = verseNumberInput.value;
    checkbox.checked = false;
    fetchVerses(chapterNumber, verseNumber);
}

chapterDropdown.addEventListener('change', updateResult);
verseNumberInput.addEventListener('change', updateResult);
languageDropdown.addEventListener('change', updateResult)
// By default, display the numbered list of the verses from the first chapter of the Quran
fetchVerses(1);

// add an onChange event listener to the checkbox
checkbox.addEventListener("click", function () {
    // if the checkbox is checked, set the display style of each arabicVerse element to 'flex'
    // otherwise, set the display style of each arabicVerse element to 'none'
    for (let i = 0; i < arabicVerses.length; i++) {
        arabicVerses[i].style.display = this.checked ? "none" : "";
    }
    document.getElementById('singleVerseArabic').style.display = this.checked ? "none" : "";
});
// Add a click event listener to the plus button
plusbutton.addEventListener('click', async function () {
    checkbox.checked = false;
    // Disable the button to prevent multiple clicks
    plusbutton.disabled = true;
    let verseNumber;
    var chapterNumber = chapterDropdown.value;
    // Increment the verseNumber
    if (verseNumberInput.value == '') {

        if (chapterNumber === '114') {
            // If it's the first chapter, set the chapterNumber to 114
            chapterNumber = '1';
        } else {
            chapterNumber = +chapterDropdown.value + 1;
        }

    } else {
        verseNumber = +verseNumberInput.value + 1;
        // Enable minus button if verseNumber is greater than 1
        minusbutton.disabled = false;
    }

    try {
        // Fetch and display the next verse
        await fetchVerses(chapterNumber, verseNumber);

        // Update the input field with the new verseNumber
        if(typeof verseNumber != 'undefined'){
            verseNumberInput.value = verseNumber;
        }
        chapterDropdown.value = chapterNumber;
    } catch (error) {
        console.error('Error fetching data:', error);
        resultDiv.innerHTML = 'Error fetching data. Please try again.';
    } finally {
        // Enable the button after the fetch operation is completed
        plusbutton.disabled = false;
    }
});

// Add a click event listener to the minus button
minusbutton.addEventListener('click', async function () {
    checkbox.checked = false;
    // Disable the button to prevent multiple clicks
    minusbutton.disabled = true;
    let verseNumber = verseNumberInput.value;
    var chapterNumber = chapterDropdown.value;
    // Increment the verseNumber
    if (verseNumberInput.value == '') {
        if (chapterNumber === '1') {
            // If it's the first chapter, set the chapterNumber to 114
            chapterNumber = '114';
        } else {
            chapterNumber = +chapterNumber - 1;
        }
        chapterDropdown.value = chapterNumber;
        // chapterNumber = +chapterDropdown.value-1;

    } else {
        if (verseNumber == '1') {
            // document.getElementById('minusbutton').click=disabled;
        } else {
            verseNumber = +verseNumber - 1;
        }
        if (vNo[chapterNumber] - 1 == verseNumber) {
            document.getElementById('plusbutton').disabled = false;
        }
    }

    try {
        // Fetch and display the previous verse
        await fetchVerses(chapterNumber, verseNumber);

        // Update the input field with the new verseNumber
        verseNumberInput.value = verseNumber;
        chapterDropdown.value = chapterNumber;
    } catch (error) {
        console.error('Error fetching data:', error);
        resultDiv.innerHTML = 'Error fetching data. Please try again.';
    } finally {
        // Enable the button after the fetch operation is completed
        minusbutton.disabled = false;
    }
});
document.querySelector('.switch-input').addEventListener('change', () => {
    const audio = new Audio("data:audio/mpeg;base64,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l66A+sBKsb3MK//SnKSoeEbwjlksu4Y6nUw8//swZPsA8awMWfghSAAAAA0gAAABCB0LYeAwQ4gAADSAAAAElUxBTUUzLjEwMFVVVVVVVVVVVVVVgRCAAnmjmEjpMKT//f6oUrbOjqnbawppb6P//2DCQVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//swZPuA8etCV/kBHWAAAA0gAAABBxBTXeA8YoAAADSAAAAEVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sgZPyA8agY1vgLEKAAAA0gAAABBxDdV+KkToAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7IGT0gPF8JNV4BxHQAAANIAAAAQUcZVOgCSfAAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk9wzxTDJTaCASMgAADSAAAAEDIJ9QQAh2gAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTtjfDOL1IYARUQAAANIAAAAQC4ATIAAAAAAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAf4AAAAgAAA0gAAABAAAB/gAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=");
    audio.play();
    
    if (navigator.vibrate) navigator.vibrate(50);
  });
function playClickSound() {
    var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3');
    var audio2 = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3');

    // Reset the audio elements
    audio.currentTime = 0;
    audio2.currentTime = 0;
    // Preload the audio
    audio.preload = 'auto';
    audio2.preload = 'auto';
    // Stop any ongoing playback
    audio.pause();
    audio2.pause();
    audio2.load();
    audio2.play();
    audio.load();
    audio.play();
}

// Adding event listeners after the document has loaded
$(document).ready(function () {
    $(".button").on('click', playClickSound);
});
