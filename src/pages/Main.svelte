<script>
  import { onMount } from "svelte";
  import { getDatabase, ref, onValue } from "firebase/database";
  import Nav from "../components/Nav.svelte";

  let hour = new Date().getHours();
  let min = new Date().getMinutes();

  // 글쓰기 페이지에 쓴 글들이 main 페이지에 그 값들을 업데이트 해주는 것. svelte에서 반응형으로 화면을 반응하게 만들기. $: items 는 items가 반응형 변수($표시로 반응형변수 사용)로 선언. 즉, 이 값이 바뀌게 되면 하단에 items를 렌더링하고 있는 태그에서 자동으로 값이 바뀌면 화면을 업데이트하게 만들어준다.
  $: items = [];

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
    else return "방금 전"; //else만 써서 시간이 undefined가 표시되어 else return으로 "방금 전"이 표시 됨. [개선 필요]: 몇일 전, 몇달 전 추가.
  };

  const db = getDatabase();
  const itemsRef = ref(db, "items/");

  // svelte에서 렌더링 되었을 때, onValue 함수가 실행되도록 onMount사용. (글쓰기에서 올려진 글들이 글쓰기 페이지에서 다시 홈으로오면, 사라지지 않고 그대로 유지되도록 하는 것)
  onMount(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
    });
  });
</script>

<header>
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="assets/chart-bar.svg" alt="chart-bar" />
      <img src="assets/wifi.svg" alt="wifi" />
      <img src="assets/battery.svg" alt="battery" />
    </div>
  </div>
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>역삼1동</div>
      <div class="menu-bar__location-icon">
        <img src="assets/arrow-down.svg" alt="" />
      </div>
    </div>
    <div class="menu-bar__icons">
      <img src="assets/search.svg" alt="" />
      <img src="assets/menu.svg" alt="" />
      <img src="assets/alert.svg" alt="" />
    </div>
  </div>
</header>

<main>
  <!-- each, items변수라는 array에서 item하나를 가져와서 div, 여기에 item.title  -->
  {#each items as item}
    <div class="item-list">
      <div class="item-list__img">
        <img alt={item.title} src={item.imgUrl} />
      </div>
      <div class="item-list__info">
        <div class="item-list__info-title">{item.title}</div>
        <div class="item-list__info-meta">
          {item.place}
          {calcTime(item.insertAt)}
        </div>
        <div class="item-list__info-price">{item.price}</div>
        <div>{item.description}</div>
      </div>
    </div>
  {/each}

  <!-- +글쓰기 버튼을 div태그 아닌 a태그로 변경(a태그가 하이퍼링크를 걸어서, 특정 태그(a태그 안에 href라는 옵션 특성을 줘서)로 +글쓰기 페이지로 이동시켜주는 것) -->
  <a class="write-btn" href="#/write">+ 글쓰기</a>
</main>

<!-- 홈버튼 누르면, 홈 으로 이동. -->
<Nav location="home" />

<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>

<style>
  .info-bar__time {
    color: blue;
  }
</style>
