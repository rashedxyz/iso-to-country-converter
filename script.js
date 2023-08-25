import countryData from "./data.js";

function getFullCountryNameFromISO(data, codes) {
  // traverse through the country codes to get the result array
  const countryNamesWithCount = codes.reduce((acc, item) => {
    // get the country data from country data set
    const filteredCountryData = data.filter(
      (elem) =>
        elem.alpha2.toLowerCase() === item.toLowerCase() ||
        elem.alpha3.toLowerCase() === item.toLowerCase() ||
        +elem.numeric === +item
    )[0];

    if (filteredCountryData) {
      // check it is already in the accumulator or not
      if (
        acc.filter((elem) => elem.countryName === filteredCountryData.name)
          .length
      ) {
        // update the accumulator object count
        acc = acc.map((elem) => {
          if (elem.countryName === filteredCountryData.name) {
            elem.count++;
          }
          return elem;
        });
      } else {
        // add new object to the accumulator
        acc.push({ countryName: filteredCountryData.name, count: 1 });
      }
    }

    return acc;
  }, []);

  return countryNamesWithCount;
}

const countryCodesTextareaElem = document.querySelector("#countryCodes");
const countryNamesOutputElem = document.querySelector("#countryNames");

const countryCodesTextareaElemChangeHandler = (e) => {
  const inputValue = e.target.value;
  const filteredValue = inputValue
    .split("\n")
    .filter((elem) => (elem ? true : false));

  if (filteredValue && filteredValue.length) {
    const outputCountryData = getFullCountryNameFromISO(
      countryData,
      filteredValue
    );
    
    // clear the output on change
    countryNamesOutputElem.innerHTML = "";

    // display new output on change every time
    outputCountryData.forEach((elem) => {
      countryNamesOutputElem.innerHTML += `<li class="list-group-item">${elem.countryName} (${elem.count})</li>`;
    });
  }
};

countryCodesTextareaElem.addEventListener(
  "input",
  countryCodesTextareaElemChangeHandler
);
