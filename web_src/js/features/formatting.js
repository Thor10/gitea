const {lang} = document.documentElement;
const dateFormatter = new Intl.DateTimeFormat(lang, {year: 'numeric', month: 'long', day: 'numeric'});
const shortDateFormatter = new Intl.DateTimeFormat(lang, {year: 'numeric', month: 'short', day: 'numeric'});
const dateTimeFormatter = new Intl.DateTimeFormat(lang, {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});

export function initFormattingReplacements() {
  // for each <time></time> tag, if it has the data-format attribute, format
  // the text according to the user's chosen locale and formatter.
  formatAllTimeElements();
}

function formatAllTimeElements() {
  const timeElements = document.querySelectorAll('time[data-format]');
  for (const timeElement of timeElements) {
    const formatter = getFormatter(timeElement.dataset.format);
    timeElement.textContent = formatter.format(new Date(timeElement.dateTime));
  }
}

function getFormatter(format) {
  switch (format) {
    case 'date':
      return dateFormatter;
    case 'short-date':
      return shortDateFormatter;
    case 'date-time':
      return dateTimeFormatter;
    default:
      throw new Error('Unknown format');
  }
}
