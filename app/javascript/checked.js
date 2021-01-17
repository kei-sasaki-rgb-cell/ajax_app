function check() {
  const posts = document.querySelectorAll(".post");//クラス名post荷物要素を取得、postクラスはindex.html.erbのブロック変数
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id")//getAttributeは要素上の指定した属性の値を戻り値として返す
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      }
    });
   });//要素1つずつに対して、「クリック」した際に動作する処理を記述します。
}//{}は引数
setInterval(check, 1000);
//window.addEventListener("load", check); //loadは文字列、checkは設定する値