const form = document.getElementById("write-form");

// 이 handleSubmitForm 이벤트에 내가 addEventListener로 이 함수를 등록 해줬기 때문에 (event)가 넘어온다.
//     event.preventDefault(); 를 하단에 추가해서, 그 (event)가 넘어오면,  event.preventDefault();를 넣어서 이벤트가 default로 동작하지 않게 방지 한다.
// try문: fetch를 하다가 데이터를 받아오는 과정에서 예상치 못한 에러가 생겼을 때, 밑에 catch문으로 들어와서 그 에러에 대한 내용을 출력하도록.
//try-catch문을 이용해서
// 하단에 (const값을 json으로 바꾸는 과정이 필요함.) 그래서 const data는 res.json으로 바꿔주고,
// if 만약 이 data 값이 서버에서 내려주기로 한 200이면, 페이지를 이동시켜 주기 위해서 window.location이라는 객체를 참고해서 .pathname을 "/" root로 바꾸라고 하면 root페이지로 이동시킨다.
// else 그렇지 않으면, console.error 출력으로 "이미지 업로드에 실패했습니다."라고 출력하기.
//   } catch (e) {     console.error(e);  }   ::이런식으로 (e)를 넣어 하단과 같이 에러가 출력 되도록 처리를 하는 법 기억하기 (어떤 fetch를 await구문을 이용해서 서버에 요청을 보낼 때, try-catch문을 이용해서 에러 처리 할 수 있는 방법이다.)
const handleSubmitForm = async (event) => {
  event.preventDefault();
  // const body로 따로주고, = new FormData(form); 를 넣어서 보낼거니까 넣고,
  // body에 어떤 정보를 추가해야되니까 append문법 써서 ()괄호 열어보면 설명이 나오는데 name: 컬럼명을 말함 , value: 어떤 값을 넣을지 말함. name&value를 쉼표로 구분된 값으로 넣을 수 있다.
  const body = new FormData(form);
  // 세계시간 기준으로
  body.append("insertAt", new Date().getTime());
  try {
    const res = await fetch("/items", {
      method: "POST",
      body: body,
    });
    const data = await res.json();
    if (data === "200") window.location.pathname = "/";
  } catch (e) {
    console.error(e);
  }
}; // 확인용 함수이름: console.log("제출!!");  // const handleSubmitForm = () => console.log("제출!!");

form.addEventListener("submit", handleSubmitForm);
