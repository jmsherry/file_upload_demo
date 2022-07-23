document.addEventListener("DOMContentLoaded", function () {
  if (document.forms.length) {
    M.updateTextFields();
  }

  const artistForm = document.getElementById("artistForm");
  if (artistForm) {
    const fileInput = document.getElementById("photos");
    artistForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(artistForm);
      data.delete("photo_names");
      console.log("data", data);
      const target =
        location.pathname === "/add-artist.html"
          ? "/artists"
          : location.pathname;
      fetch(target, {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((result) => {
          console.log("result", result);
        })
        .catch((err) => {
          console.log("err", err);
        });
      artistForm.reset();
      M.updateTextFields();
    });
  }

  const artistList = document.getElementById("artistList");
  if (artistList) {
    fetch("/artists")
      .then((resp) => resp.json())
      .then((result) => {
        console.log("result", result);
        renderArtistList(result);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function renderArtistList(artists) {
    const frag = document.createDocumentFragment();
    artists.forEach((artist) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <h2>${artist.firstname} ${artist.lastname}</h2>
      ${artist.photos
        .map((photo) => {
          // photos are either local uploads/<something> or remote in S3
          let imgPath = photo.path;

          // correct if local
          const isRemote = photo.path.startsWith("https");
          if (!isRemote) {
            const parts = photo.path.split("/");
            parts.shift();
            imgPath = parts.join("");
          }

          return `<img src="${imgPath}" alt="${photo.name}" width="100" height="100" />`;
        })
        .join("")}
      <a href="artists/${
        artist._id
      }/photos/add" class="btn waves-effect waves-light">Add more photos</a>`;
      frag.appendChild(li);
    });
    console.log(frag.innerHTML, artistList);
    artistList.appendChild(frag);
  }
});
