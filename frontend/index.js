//한국시간 UTC(세계시간)+9, write.js에서 세계시간 기준이라서, 여기선 -9시간 빼서 세계시간에 맞추기. 만약 실시간으로 시간 변경하게 하고 싶으면 setInterval을 추가하면 1초마다 업데이트 된다.
const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else return "방금 전"; //else만 써서 시간이 undefined가 표시되어 else return으로 "방금 전"이 표시 됨.
};
// [개선 필요]: 몇일 전, 몇달 전 추가.

//가장 마지막(최근)에 넣은 데이터가 앞(위)에 올 수 있도록 하기 위해 Array형식으로, [].reverse() 사용하면, Array를 뒤집어주는 문법.  이렇게 넣기.-->  data.reverse().forEach((obj) => {
//html main에서 (item-list)를 Div로 만들어서, div element로 만들고,
//Div는 .className이 = "item-list";로 html에 명시한대로 넣어준다.
const renderData = (data) => {
  const main = document.querySelector("main");

  data.reverse().forEach(async (obj) => {
    const div = document.createElement("div");
    div.className = "item-list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "item-list__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;
    // img.src = obj.image; //img에는 class가 없으니까 .src 어떤 값을 띄울지 입력. (이미지를 불러와서 띄울거라 obj.image)
    // console.log(obj); //실험

    const InfoDiv = document.createElement("div");
    InfoDiv.className = "item-list__info";

    const InfoTitleDiv = document.createElement("div");
    InfoTitleDiv.className = "item-list__info-title";
    InfoTitleDiv.innerText = obj.title; //InfoTitleDiv 안에 .innerText는 obj.title ( data.forEach((obj) => {에서 obj가져온 값과 title을 넣어준 것)

    const InfoMetaDiv = document.createElement("div");
    InfoMetaDiv.className = "item-list__info-meta";
    InfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt); // 장소 + " " + 띄어쓰고 + 시간. timestamp가 여기 calcTime에 전달이 될거고, 전달이 되면, 상단의 timestamp 계산로직을 거쳐서 몇시간/분/초전을 표시해서 문자열을 return.

    const InfoPriceDiv = document.createElement("div");
    InfoPriceDiv.className = "item-list__info-price";
    InfoPriceDiv.innerText = obj.price;

    InfoDiv.appendChild(InfoTitleDiv);
    InfoDiv.appendChild(InfoMetaDiv);
    InfoDiv.appendChild(InfoPriceDiv);
    imgDiv.appendChild(img);
    div.appendChild(imgDiv);
    div.appendChild(InfoDiv);
    main.appendChild(div);
  });
};

// 여기서 accesstoken을 필요할 때 마다 넣어줄 수 있도록  한다.
const fetchList = async () => {
  //login.js에서는 setItem("token")을 해두었으니까, 가져올 때는 getItem("token") 안에 있는 값을 accessToken이라는 값으로 가져온다.
  const accessToken = window.localStorage.getItem("token");
  const res = await fetch("/items", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    alert("로그인이 필요합니다!");
    window.location.pathname = "/login.html";
    return;
  }

  const data = await res.json();
  renderData(data);
  //   console.log(data);
};

fetchList(); //index.html, 즉 첫화면이 떴을 때, 이 함수가 한번 호출되면서, 쭉 이렇게 자바스크립트에서 쭉보다가 이 함수 호출해주면서, 상단의 fetch("/items")를 보내게되고, res.json을 바꿔서 console.log로 찍게 된다.
