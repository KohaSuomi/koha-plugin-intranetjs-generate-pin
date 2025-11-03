// --- TRANSLATIONS ---
const GENERATE_PIN_TRANSLATIONS = {
  "en": {
    password_generated: "PIN password generated!",
    password_generation_failed: "Password generation failed!"
  },
  "fi": {
    password_generated: "PIN-salasana luotu!",
    password_generation_failed: "Salasanan luonti epäonnistui!"
  },
  "sv": {
    password_generated: "PIN-lösenord genererat!",
    password_generation_failed: "Lösenordsgenerering misslyckades!"
  }
};

function gt(key, ...args) {
  // Detect language, default to 'en'
  const lang = (window.LANG || navigator.language || "en").substring(0,2);
  const dict = GENERATE_PIN_TRANSLATIONS[lang] || GENERATE_PIN_TRANSLATIONS["en"];
  const val = dict[key];
  return typeof val === "function" ? val(...args) : val;
}

// --- ORIGINAL SCRIPT WITH TRANSLATIONS ---
/// Generates a four-digit PIN code password for patrons with specific categories
/// Without this, patrons would get alphanumeric passwords

/* Generoi henkilöasiakkaalle PIN-koodi salasanaksi */
function generate_patron_password() {
    // generate a PIN
    var chars = '0123456789';
    var length = 4;
    var password = '';
    for (var i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

$(document).ready(function () {
    if (window.location.href.indexOf("members/member-password.pl") > -1) {
        $("body").on('click', "#fillrandom", function (event) {
            event.stopImmediatePropagation();
            event.preventDefault();

            var password = '';
            var patron = $('.patroncategory').text();

            var categories = "REPLACE_BY_CONFIG_PARAM_A";
            categories = categories.trim();
            categories = categories.split(',');

            for (i = 0; i < categories.length; i++) {

                if ((patron.indexOf(categories[i]) >= 0)) {
                    password = generate_patron_password();
                    $("#newpassword").val(password);
                    $("#newpassword").attr('type', 'text');
                    $("#newpassword2").val(password);
                    $("#newpassword2").attr('type', 'text');
                    return;
                }
                else {
                    var pattern_regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}/;
                    while (!pattern_regex.test(password)) {
                        password = generate_password();
                    }
                    $("#newpassword").val(password);
                    $("#newpassword").attr('type', 'text');
                    $("#newpassword2").val(password);
                    $("#newpassword2").attr('type', 'text');
                }
            }
        });
    }
});
/// END OF SCRIPT ///