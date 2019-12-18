const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");
var locales = ['af-NA', 'af-ZA', 'agq-CM', 'ak-GH', 'am-ET', 'ar-001', 'ar-AE', 'ar-BH', 'ar-DJ', 'ar-DZ', 'ar-EG', 'ar-EH', 'ar-ER', 'ar-IL', 'ar-IQ', 'ar-JO', 'ar-KM', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-MR', 'ar-OM', 'ar-PS', 'ar-QA', 'ar-SA', 'ar-SD', 'ar-SO', 'ar-SS', 'ar-SY', 'ar-TD', 'ar-TN', 'ar-YE', 'asa-TZ', 'ast-ES', 'as-IN', 'az-Cyrl', 'az-Cyrl-AZ', 'az-Latn', 'az-Latn-AZ', 'bas-CM', 'bem-ZM', 'bez-TZ', 'be-BY', 'bg-BG', 'bm-ML', 'bn-BD', 'bn-IN', 'bo-CN', 'bo-IN', 'brx-IN', 'br-FR', 'bs-Cyrl', 'bs-Cyrl-BA', 'bs-Latn', 'bs-Latn-BA', 'ca-AD', 'ca-ES', 'ca-ES-VALENCIA', 'ca-FR', 'ca-IT', 'ccp-BD', 'ccp-IN', 'ceb-PH', 'ce-RU', 'cgg-UG', 'chr-US', 'ckb-IQ', 'ckb-IR', 'cs-CZ', 'cu-RU', 'cy-GB', 'dav-KE', 'da-DK', 'da-GL', 'de-AT', 'de-BE', 'de-CH', 'de-DE', 'de-IT', 'de-LI', 'de-LU', 'dje-NE', 'dsb-DE', 'dua-CM', 'dyo-SN', 'dz-BT', 'ebu-KE', 'ee-GH', 'ee-TG', 'el-CY', 'el-GR', 'en-001', 'en-150', 'en-AE', 'en-AG', 'en-AI', 'en-AS', 'en-AT', 'en-AU', 'en-BB', 'en-BE', 'en-BI', 'en-BM', 'en-BS', 'en-BW', 'en-BZ', 'en-CA', 'en-CC', 'en-CH', 'en-CK', 'en-CM', 'en-CX', 'en-CY', 'en-DE', 'en-DG', 'en-DK', 'en-DM', 'en-ER', 'en-FI', 'en-FJ', 'en-FK', 'en-FM', 'en-GB', 'en-GD', 'en-GG', 'en-GH', 'en-GI', 'en-GM', 'en-GU', 'en-GY', 'en-HK', 'en-IE', 'en-IL', 'en-IM', 'en-IN', 'en-IO', 'en-JE', 'en-JM', 'en-KE', 'en-KI', 'en-KN', 'en-KY', 'en-LC', 'en-LR', 'en-LS', 'en-MG', 'en-MH', 'en-MO', 'en-MP', 'en-MS', 'en-MT', 'en-MU', 'en-MW', 'en-MY', 'en-NA', 'en-NF', 'en-NG', 'en-NL', 'en-NR', 'en-NU', 'en-NZ', 'en-PG', 'en-PH', 'en-PK', 'en-PN', 'en-PR', 'en-PW', 'en-RW', 'en-SB', 'en-SC', 'en-SD', 'en-SE', 'en-SG', 'en-SH', 'en-SI', 'en-SL', 'en-SS', 'en-SX', 'en-SZ', 'en-TC', 'en-TK', 'en-TO', 'en-TT', 'en-TV', 'en-TZ', 'en-UG', 'en-UM', 'en-US', 'en-US-POSIX', 'en-VC', 'en-VG', 'en-VI', 'en-VU', 'en-WS', 'en-ZA', 'en-ZM', 'en-ZW', 'eo-001', 'es-419', 'es-AR', 'es-BO', 'es-BR', 'es-BZ', 'es-CL', 'es-CO', 'es-CR', 'es-CU', 'es-DO', 'es-EA', 'es-EC', 'es-ES', 'es-GQ', 'es-GT', 'es-HN', 'es-IC', 'es-MX', 'es-NI', 'es-PA', 'es-PE', 'es-PH', 'es-PR', 'es-PY', 'es-SV', 'es-US', 'es-UY', 'es-VE', 'et-EE', 'eu-ES', 'ewo-CM', 'fa-AF', 'fa-IR', 'ff-Latn', 'ff-Latn-BF', 'ff-Latn-CM', 'ff-Latn-GH', 'ff-Latn-GM', 'ff-Latn-GN', 'ff-Latn-GW', 'ff-Latn-LR', 'ff-Latn-MR', 'ff-Latn-NE', 'ff-Latn-NG', 'ff-Latn-SL', 'ff-Latn-SN', 'fil-PH', 'fi-FI', 'fo-DK', 'fo-FO', 'fr-BE', 'fr-BF', 'fr-BI', 'fr-BJ', 'fr-BL', 'fr-CA', 'fr-CD', 'fr-CF', 'fr-CG', 'fr-CH', 'fr-CI', 'fr-CM', 'fr-DJ', 'fr-DZ', 'fr-FR', 'fr-GA', 'fr-GF', 'fr-GN', 'fr-GP', 'fr-GQ', 'fr-HT', 'fr-KM', 'fr-LU', 'fr-MA', 'fr-MC', 'fr-MF', 'fr-MG', 'fr-ML', 'fr-MQ', 'fr-MR', 'fr-MU', 'fr-NC', 'fr-NE', 'fr-PF', 'fr-PM', 'fr-RE', 'fr-RW', 'fr-SC', 'fr-SN', 'fr-SY', 'fr-TD', 'fr-TG', 'fr-TN', 'fr-VU', 'fr-WF', 'fr-YT', 'fur-IT', 'fy-NL', 'ga-GB', 'ga-IE', 'gd-GB', 'gl-ES', 'gsw-CH', 'gsw-FR', 'gsw-LI', 'guz-KE', 'gu-IN', 'gv-IM', 'haw-US', 'ha-GH', 'ha-NE', 'ha-NG', 'he-IL', 'hi-IN', 'hr-BA', 'hr-HR', 'hsb-DE', 'hu-HU', 'hy-AM', 'ia-001', 'id-ID', 'ig-NG', 'ii-CN', 'is-IS', 'it-CH', 'it-IT', 'it-SM', 'it-VA', 'ja-JP', 'jgo-CM', 'jmc-TZ', 'jv-ID', 'kab-DZ', 'kam-KE', 'ka-GE', 'kde-TZ', 'kea-CV', 'khq-ML', 'ki-KE', 'kkj-CM', 'kk-KZ', 'kln-KE', 'kl-GL', 'km-KH', 'kn-IN', 'kok-IN', 'ko-KP', 'ko-KR', 'ksb-TZ', 'ksf-CM', 'ksh-DE', 'ks-IN', 'ku-TR', 'kw-GB', 'ky-KG', 'lag-TZ', 'lb-LU', 'lg-UG', 'lkt-US', 'ln-AO', 'ln-CD', 'ln-CF', 'ln-CG', 'lo-LA', 'lrc-IQ', 'lrc-IR', 'lt-LT', 'luo-KE', 'luy-KE', 'lu-CD', 'lv-LV', 'mas-KE', 'mas-TZ', 'mer-KE', 'mfe-MU', 'mgh-MZ', 'mgo-CM', 'mg-MG', 'mi-NZ', 'mk-MK', 'ml-IN', 'mn-MN', 'mr-IN', 'ms-BN', 'ms-MY', 'ms-SG', 'mt-MT', 'mua-CM', 'my-MM', 'mzn-IR', 'naq-NA', 'nb-NO', 'nb-SJ', 'nds-DE', 'nds-NL', 'nd-ZW', 'ne-IN', 'ne-NP', 'nl-AW', 'nl-BE', 'nl-BQ', 'nl-CW', 'nl-NL', 'nl-SR', 'nl-SX', 'nmg-CM', 'nnh-CM', 'nn-NO', 'nus-SS', 'nyn-UG', 'om-ET', 'om-KE', 'or-IN', 'os-GE', 'os-RU', 'pa-Arab', 'pa-Arab-PK', 'pa-Guru', 'pa-Guru-IN', 'pl-PL', 'prg-001', 'ps-AF', 'ps-PK', 'pt-AO', 'pt-BR', 'pt-CH', 'pt-CV', 'pt-GQ', 'pt-GW', 'pt-LU', 'pt-MO', 'pt-MZ', 'pt-PT', 'pt-ST', 'pt-TL', 'qu-BO', 'qu-EC', 'qu-PE', 'rm-CH', 'rn-BI', 'rof-TZ', 'ro-MD', 'ro-RO', 'ru-BY', 'ru-KG', 'ru-KZ', 'ru-MD', 'ru-RU', 'ru-UA', 'rwk-TZ', 'rw-RW', 'sah-RU', 'saq-KE', 'sbp-TZ', 'sd-PK', 'seh-MZ', 'ses-ML', 'se-FI', 'se-NO', 'se-SE', 'sg-CF', 'shi-Latn', 'shi-Latn-MA', 'shi-Tfng', 'shi-Tfng-MA', 'si-LK', 'sk-SK', 'sl-SI', 'smn-FI', 'sn-ZW', 'so-DJ', 'so-ET', 'so-KE', 'so-SO', 'sq-AL', 'sq-MK', 'sq-XK', 'sr-Cyrl', 'sr-Cyrl-BA', 'sr-Cyrl-ME', 'sr-Cyrl-RS', 'sr-Cyrl-XK', 'sr-Latn', 'sr-Latn-BA', 'sr-Latn-ME', 'sr-Latn-RS', 'sr-Latn-XK', 'sv-AX', 'sv-FI', 'sv-SE', 'sw-CD', 'sw-KE', 'sw-TZ', 'sw-UG', 'ta-IN', 'ta-LK', 'ta-MY', 'ta-SG', 'teo-KE', 'teo-UG', 'te-IN', 'tg-TJ', 'th-TH', 'ti-ER', 'ti-ET', 'tk-TM', 'to-TO', 'tr-CY', 'tr-TR', 'tt-RU', 'twq-NE', 'tzm-MA', 'ug-CN', 'uk-UA', 'ur-IN', 'ur-PK', 'uz-Arab', 'uz-Arab-AF', 'uz-Cyrl', 'uz-Cyrl-UZ', 'uz-Latn', 'uz-Latn-UZ', 'vai-Latn', 'vai-Latn-LR', 'vai-Vaii', 'vai-Vaii-LR', 'vi-VN', 'vo-001', 'vun-TZ', 'wae-CH', 'wo-SN', 'xh-ZA', 'xog-UG', 'yav-CM', 'yi-001', 'yo-BJ', 'yo-NG', 'yue-Hans', 'yue-Hans-CN', 'yue-Hant', 'yue-Hant-HK', 'zgh-MA', 'zh-Hans', 'zh-Hans-CN', 'zh-Hans-HK', 'zh-Hans-MO', 'zh-Hans-SG', 'zh-Hant', 'zh-Hant-HK', 'zh-Hant-MO', 'zh-Hant-TW', 'zu-ZA'];
var localeNames = new Map();
var count = locales.length;
locales.forEach(locale => {
    var xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        "http://www.localeplanet.com/api/" + locale + "/icu.js"
    );
    xhr.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
    xhr.onload = function() {
        var window = {};
        try {
            eval(xhr.responseText);
            var localeName = window.icu.getLocaleName();
            var shortDateFormatText = window.icu.getDateFormat("SHORT_PADDED_CENTURY")
                .format(new Date("April 11, 1961"));
            var shortDateFormatValue = shortDateFormatText.replace("12", "dd")
                .replace("04", "mm").replace("1961", "yy");
            var localeObj = {
                date: {
                    separators: [shortDateFormatText.match(/\W/)[0]],
                    shortFormats: [
                        { text: shortDateFormatText, value: shortDateFormatValue }
                    ]
                },
                name: localeName.charAt(0).toUpperCase() + localeName.slice(1)
            };
            localeNames.set(locale, localeObj);
        }
        catch (e) {
            console.log("Error locale: " + locale);
        }
        if (--count == 0) {
            var mapAsc = new Map([...localeNames.entries()].sort());
            // console.log(JSON.stringify([...mapAsc], undefined, 2));
            fs.writeFileSync("./dateformats.json",
                JSON.stringify(Object.fromEntries([...mapAsc]), undefined, 2));
        }
    };
    xhr.send();
});