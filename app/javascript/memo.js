function memo() {
  const submit = document.getElementById("submit");//index.html.erbのid取得
  submit.addEventListener("click", (e) => {//クリックした時に実行される関数
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();//非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200){
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");//↓17〜25行目までメモとして描画する部分のHTML
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時:${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    };
    e.preventDefault();
  });
} //関数定義
window.addEventListener("load", memo); //ページ読み込み