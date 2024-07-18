const form = document.querySelector("#login-form");

// // const가 아닌 let으로 하면 나중에 변수를 바꿀 수 있다(전역변수). accessToken이 null로 있다가, 로그인이 완료가 되면,
// let accessToken = null;

//event.preventDefault(); 은 refresh되는것을 방지.
//서버에서도 signup으로 들어온 id와 p/w를 받아서 print 해주도록
//formData에 password라는 값이 있을건데, 이 "password"는 내가 html input에 지정해 둔 name="password"이니까 이 값으로 되는데, formData.get('password') 를 가져와서
//그걸 SHA256Password으로 바꿔줄건데, 이 formdata에서  formData.get("password") password값을 가져와서 sha256()으로 감싸주면, 암호화가 된다.
//이 암호화된 값을 password에다가 다시 넣어준다.
const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);
  //   console.log(formData.get("password"));

  // /login으로 보낸다.
  const res = await fetch("/login", {
    method: "post",
    body: formData,
  });
  //서버에 요청을 하고, await에서 res.json해서 데이터를 받았는데, if 데이터가 200으로 성공했다는 응답을 줬을 때만, 성공했다는 메세지를 띄워야 한다. else if 데이터가 틀렸을 때 401로 구분. 이 status code는 서버(main.py에 @app.post('/login') raise InvalidCredentialsException)에서 내려주는 것.
  const data = await res.json();
  const accessToken = data.access_token; // 이걸 로컬 스토리지에 저장.
  window.localStorage.setItem("token", accessToken); //웹 localStorage에다가 accessToken 저장 setItem: 새로 아이템을 추가한다.
  //   window.sessionStorage.setItem("token", accessToken); //웹 sessionStorage에다가 accessToken 저장
  alert("로그인 되었습니다!");

  //   const infoDiv = document.querySelector("#info");
  //   infoDiv.innerText = "로그인 되었습니다!";

  window.location.pathname = "/";

  //   //로그인 된다음에 btn이 생기고, 버튼을 눌렀을 때 상품 가져오기.
  //   const btn = document.createElement("button");
  //   btn.innerText = "상품 가져오기!";
  //   btn.addEventListener("click", async () => {
  //     const res = await fetch("/items", {
  //       //headers에다가 Authorization이라는 헤더를 추가 할건데, access token의 'Authorization':에서는 `Bearer`라는 앞에 prefix를 넣어주고 띄어쓰기 한 다음에, 저장한 이 accessToken을 ${accessToken} 이렇게 넣어서 보내주면 서버로 요청을 보내게 되고, 서버가 받아서 응답을 해주게 된다.
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   });
  //   infoDiv.appendChild(btn);

  //   console.log("엑세스토큰!!", data);
  //   if (res.status === 200) {
  //     alert("로그인에 성공했습니다!");
  //     window.location.pathname = "/"; //로그인에 성공하면 / 루트 페이지로 돌려 보내도록 입력.
  //     console.log(res.status);
  //   } else if (res.status === 401) {
  //     alert("id 혹은 password가 틀렸습니다.");
  //   }
};

form.addEventListener("submit", handleSubmit);
