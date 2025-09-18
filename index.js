const GITHUB_USERNAME = "ALIM"; // GitHub kullanıcı adın
const REPO_NAME = "alimdrive-storage"; // Repo adın
const TOKEN = "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"; // Token'ını buraya gir (güvenli test için)

function uploadToGitHub() {
  const file = document.getElementById("fileInput").files[0];
  const note = document.getElementById("note").value || "AlimDrive: Dosya yüklendi";

  if (!file) return alert("Dosya seçilmedi!");

  const reader = new FileReader();
  reader.onload = function () {
    const content = btoa(reader.result); // Base64 encode

    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${file.name}`;
    const data = {
      message: note,
      content: content
    };

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      alert("Yüklendi: " + file.name);
      listFiles();
    })
    .catch(err => {
      console.error("Yükleme hatası:", err);
      alert("Yükleme başarısız.");
    });
  };
  reader.readAsBinaryString(file);
}

function listFiles() {
  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents`;
  fetch(url)
    .then(res => res.json())
    .then(files => {
      const list = document.getElementById("fileList");
      list.innerHTML = "";
      files.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${file.download_url}" target="_blank">${file.name}</a>`;
        list.appendChild(li);
      });
    });
}
