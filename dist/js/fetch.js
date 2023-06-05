function getData(responseFunction, filter) {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "connect.sid=s%3AM6CfLJhCFlu92tNvS7cRegIIcR8rhhUG.AN2Ss3OKnMLlBJEwcDELKykDb293dBuH%2FhX1M3mZI2w");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://ws-fatwa.herokuapp.com/kamtibmas", requestOptions)
    .then((response) => response.json())
    .then((result) => responseFunction(result, filter))
    .catch((error) => console.log("error", error));
}

getData(kecamatan);

function kecamatan(result) {
  inijson = result;
  let allKecamatanArr = inijson.map((row) => {
    return row.kecamatan.split(",").map(function (item) {
      return item.trim();
    });
  });
  let uniqueKecamatan = allKecamatanArr.flat().filter((item, index, arry) => arry.indexOf(item) === index);
  let sortingKecamatan = uniqueKecamatan.sort(function (first, second) {
    return first > second ? 1 : -1;
  });
  length = sortingKecamatan.length;
  for (let i = 0; i < length; i++) {
    let kecamatan = document.getElementById("kecamatan");
    let option = document.createElement("option");
    option.innerText = sortingKecamatan[i];
    kecamatan.append(option);
  }
}

// let split = uniqueCategory[i].split(" ")[1];

let hasil = "";

function selectValue() {
  hasil = "";
  const filter = document.getElementById("kecamatan").value;
  getData(tampilkan, filter);
}

let tampilkan = (result, filter) => {
  length = result.length;
  for (let i = 0; i < length; i++) {
    const element = result[i];
    if (element.kecamatan == filter) {
      hasil += "<tr id='tr'>";
      hasil += "<td scope='col' class='px-5 py-5 border-b border-gray-200 bg-white text-sm'><p class='text-gray-900 whitespace-no-wrap'>" + element.kecamatan + "</p></td>";
      hasil += "<td scope='col' class='px-5 py-5 border-b border-gray-200 bg-white text-sm'><p class='text-gray-900 whitespace-no-wrap'>" + element.kelurahan + "</p></td>";
      hasil += "<td scope='col' class='px-5 py-5 border-b border-gray-200 bg-white text-sm'><p class='text-gray-900 whitespace-no-wrap'>" + element.jenis_pelanggaran_kamtibmas + "</p></td>";
      hasil += "<td scope='col' class='px-5 py-5 border-b border-gray-200 bg-white text-sm'><p class='text-gray-900 whitespace-no-wrap'>" + element.lokasi_rawan_kamtibmas + "</p></td>";
      hasil += "</tr>";
    }
  }
  document.getElementById("tabel").innerHTML = hasil;
};
