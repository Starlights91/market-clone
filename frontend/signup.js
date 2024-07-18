const form = document.querySelector("#singup-form");

// 로직: (checkPassword)라는 function을 만드는데, const formData를 가져와서, 그 formData에 password라는 값과 password2라는 값을 가져와서 두개를 비교
const checkPassword = () => {
  const formData = new FormData(form);
  const password1 = formData.get("password");
  const password2 = formData.get("password2");
  if (password1 === password2) {
    return true;
  } else return false;
};

//서버에서도 signup으로 들어온 id와 p/w를 받아서 print 해주도록
//formData에 password라는 값이 있을건데, 이 "password"는 내가 html input에 지정해 둔 name="password"이니까 이 값으로 되는데, formData.get('password') 를 가져와서
//그걸 SHA256Password으로 바꿔줄건데, 이 formdata에서  formData.get("password") password값을 가져와서 sha256()으로 감싸주면, 암호화가 된다.
//이 암호화된 값을 password에다가 다시 넣어준다.
const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);
  console.log(formData.get("password"));

  const div = document.querySelector("#info");

  //서버로 요청 보내기 전에 div.innerText를 없애주기. 그러면, 틀리면 같지않다는 문구 뜨고, 다시 두개 똑같은 비밀번호 입력하면 해당 문구가 사라진다.
  //성공하면 파란색 글씨로, 실패하면 빨간색 글씨로 사용자에게 문구가 띄워져 알려줘야 사용자도 된건지/아닌지 확인 할 수 있으니까, 이런 부분도 프론트엔드에서는 중요한 부분!
  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "post",
      body: formData,
    });
    //서버에 요청을 하고, await에서 res.json해서 데이터를 받았는데, if 데이터가 200으로 성공했다는 응답을 줬을 때만, 회원가입 성공했다는 메세지를 띄워야 한다.
    const data = await res.json();
    if (data === "200") {
      div.innerText = "회원가입에 성공했습니다!";
      div.style.color = "blue";
    }
  } else {
    div.innerText = "비밀번호가 같지 않습니다.";
    div.style.color = "red";
  }
};

form.addEventListener("submit", handleSubmit);
