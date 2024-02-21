const text = document.querySelector("#animal");
const button = document.querySelector("#button");
const picture = document.querySelector("#picture");
const notif = document.querySelector("#notif");

button.addEventListener("click", function () {
  let searchText = text.value;

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let xmlDoc = this.responseXML;

      let animals = xmlDoc.getElementsByTagName("Animal");
      let flag = false;

      for (let i = 0; i < animals.length; i++) {
        let animalName =
          animals[i].getElementsByTagName("Name")[0].firstChild.nodeValue;

        if (searchText == animalName) {
          picture.style.display = "block";
          picture.src =
            animals[i].getElementsByTagName("Location")[0].firstChild.nodeValue;
          notif.innerHTML = "";
          flag = true;
        }
      }

      if (!flag) {
        picture.src = "";
        picture.style.display = "none";
        notif.innerHTML = "No Data Found";
      }
    }
  };

  xhr.open("GET", "animals.xml", true);
  xhr.send();
});
