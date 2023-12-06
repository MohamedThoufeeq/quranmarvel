        const chapterDropdown = document.getElementById('chapter-number');
        const verseNumberInput = document.getElementById('verse-number');
        const languageDropdown = document.getElementById('language');
        const translationDropdown = document.getElementById('translation');
        const resultDiv = document.getElementById('result');
        const arabicVerses = document.getElementsByClassName("arabicVerse");
        var singleVerseArabic = document.getElementsByClassName("singleVerseArabic")
        var checkbox = document.getElementById("checkbox");
        var defaultIdentifier = 'en.sahih';
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

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let verses = '';
                    document.getElementById("chapterInfo").innerHTML = ``;

                    if (verseNumber) {
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
                            resultDiv.innerHTML = `<p><span class = "bismi">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>`;
                            bismiGreen();
                            if (chapterNumber == 1) {
                                arabicRed();
                            }
                        } else {
                            arabicRed();
                        }
                        document.getElementById("chapterInfo").innerHTML = `
                                <div id='cInfo'><p>
                                <b>Chapter Number :</b> ${data.data[0].surah.number} ( ${data.data[0].surah.name} )   
                                <b>Chapter Name:</b> ${data.data[0].surah.englishName}( ${data.data[0].surah.englishNameTranslation} )   
                                <b>Verse count :</b> ${data.data[0].surah.numberOfAyahs}   
                                <b>Revelation type :</b> ${data.data[0].surah.revelationType}</p>
                                </div>
                                `;
                    } else {

                        const firstVerseArabic = data.data[0].ayahs[0].text.substring(0, 38);
                        const remainingFirstVerseArabic = data.data[0].ayahs[0].text.substring(38);
                        verses += `<p><span class = "bismi">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>`;
                        function fvoffc() {
                            verses += `
                                    <p><span>1. </span><span id = 'firstVerseArabic' class = "arabicVerse">${remainingFirstVerseArabic}</span>
                                    ${data.data[1].ayahs[0].text}</p>
                                `;
                        }
                        if (chapterNumber == 1) {
                            verses += `
                                  <p>
                                    <span>1.</span>
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
                                    <span>${index + 1}.</span>
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
                                <b>Chapter Number :</b> ${data.data[0].number} ( ${data.data[0].name} )   
                                <b>Chapter Name:</b> ${data.data[0].englishName}( ${data.data[0].englishNameTranslation} )   
                                <b>Verse count :</b> ${data.data[0].numberOfAyahs}   
                                <b>Revelation type :</b> ${data.data[0].revelationType}</p>
                                </div>
                                `;
                    }

                })
                .catch(error => {
                    resultDiv.innerHTML = 'Errors in fetchverses: ' + error.message;
                });
        }
        function updateResult() {
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

        // Add "display:none" style to "arabicVerse" class when checkbox is clicked
        document.addEventListener("DOMContentLoaded", function () {
            // add the arabicVerse class to the element
            let element = document.getElementById("arabicVerse");
            element.classList.add("arabicVerse");
        });

        document.addEventListener("DOMContentLoaded", function () {
            // add the arabicVerse class to the element
            let element = document.getElementById("singleVerseArabic");
            element.classList.add("singleVerseArabic");
        });

        // add an onChange event listener to the checkbox
        checkbox.addEventListener("change", function () {
            // if the checkbox is checked, set the display style of each arabicVerse element to 'flex'
            // otherwise, set the display style of each arabicVerse element to 'none'
            for (let i = 0; i < arabicVerses.length; i++) {
                arabicVerses[i].style.display = this.checked ? "none" : "";
            }
            document.getElementById('singleVerseArabic')
                .style.display = this.checked ? "none" : "";
            // singleVerseArabic.style.display = "none";
            // singleVerseArabic.style.color= "red";
            // console.log(singleVerseArabic.style);
        });