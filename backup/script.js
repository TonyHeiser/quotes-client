async function getValues(url) {
  let quotes = await fetch(url).then(response => response.json());
  document.getElementById("value1").innerText = quotes.freakyAhhOil;
}

getValues("http://127.0.0.1:8787/");
