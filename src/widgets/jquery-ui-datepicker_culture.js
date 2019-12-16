export var dateCultures = {
    "en-US": {
        date: {
            separators: ["/", "-"],
            shortFormats: [
                { text: "04/12/1961", value: "mm/dd/yy" },
                { text: "1961-04-12", value: "yy-mm-dd" }
            ]
        },
        name: "English (Unated States)"
    },
    "ru-RU": {
        date: {
            separators: ["."],
            shortFormats: [
                { text: "12.04.1961", value: "dd.mm.yy" }
            ]
        },
        name: "Русский (Россия)"
    },
    "et-EE": {
        date: {
            separators: ["."],
            shortFormats: [
                { text: "12.04.1961", value: "d.mm.yy" }
            ]
        },
        name: "Eesti (Eesti)"
    }
};