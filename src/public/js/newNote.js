const btn = document.getElementById("btn");

$(document).ready(function () {
  $("#alert").hide();
});

$("#btn-alert").click(function () {
  $("#alert").hide();
});

btn.onclick = () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (title == "" || description == "") {
    $("#alert").show();
  } else {
    //Guardamos la nota en la bd
    postData(title, description);
  }
};

async function postData(title, description) {
  const response = await fetch("/api/save", {
    method: "POST",
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

  // console.log(data);
}
