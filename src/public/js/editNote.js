const btnEdit = document.getElementById("btnEdit");

//Obtener los parámetros a través de la url
const values = window.location.search;

const urlParams = new URLSearchParams(values);

let id = urlParams.get("id");
let titleParam = urlParams.get("title");
let descriptionParam = urlParams.get("description");

const title = document.getElementById("title");
const description = document.getElementById("description");

$(document).ready(function () {
  $("#alert-edit").hide();
});

$("#btn-alert-edit").click(function () {
  $("#alert-edit").hide();
});

//Asignar valores
title.value = titleParam;
description.value = descriptionParam;

btnEdit.onclick = () => {
  const titleValue = title.value;
  const descriptionValue = description.value;

  if (titleValue == "" || descriptionValue == "") {
    $("#alert-edit").show();
  } else {
    updateData(id, titleValue, descriptionValue);
    window.location.href = "/";
  }
};

//Actualizar datos
async function updateData(id, title, description) {
  const response = await fetch("/api/update/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
    }),
  });

  const data = await response.json();
  console.log(data);
}
