<script>
  let hour = new Date().getHours();
  let min = new Date().getMinutes();
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
  <!-- 메인안에 6개의 div -->
  <div class="item-list">
    <div class="item-list__img">
      <img src="assets/img.svg" alt="" />
    </div>
    <div class="item-list__info">
      <div class="item-list__info-title">게이밍 PC 팝니다</div>
      <div class="item-list__info-meta">역삼동 19초 전</div>
      <div class="item-list__info-price">100만원</div>
    </div>
  </div>

  <div class="item-list">
    <div class="item-list__img">
      <img src="assets/img.svg" alt="" />
    </div>
    <div class="item-list__info">
      <div class="item-list__info-title">게이밍 PC 팝니다</div>
      <div class="item-list__info-meta">역삼동 19초 전</div>
      <div class="item-list__info-price">100만원</div>
    </div>
  </div>
  <div class="item-list">
    <div class="item-list__img">
      <img src="assets/img.svg" alt="" />
    </div>
    <div class="item-list__info">
      <div class="item-list__info-title">게이밍 PC 팝니다</div>
      <div class="item-list__info-meta">역삼동 19초 전</div>
      <div class="item-list__info-price">100만원</div>
    </div>
  </div>
  <div class="item-list">
    <div class="item-list__img">
      <img src="assets/img.svg" alt="" />
    </div>
    <div class="item-list__info">
      <div class="item-list__info-title">게이밍 PC 팝니다</div>
      <div class="item-list__info-meta">역삼동 19초 전</div>
      <div class="item-list__info-price">100만원</div>
    </div>
  </div>
  <div class="item-list">
    <div class="item-list__img">
      <img src="assets/img.svg" alt="" />
    </div>
    <div class="item-list__info">
      <div class="item-list__info-title">게이밍 PC 팝니다</div>
      <div class="item-list__info-meta">역삼동 19초 전</div>
      <div class="item-list__info-price">100만원</div>
    </div>
  </div>
  <div class="item-list">
    <div class="item-list__img">
      <img src="assets/img.svg" alt="" />
    </div>
    <div class="item-list__info">
      <div class="item-list__info-title">게이밍 PC 팝니다</div>
      <div class="item-list__info-meta">역삼동 19초 전</div>
      <div class="item-list__info-price">100만원</div>
    </div>
  </div>

  <!-- +글쓰기 버튼을 div태그 아닌 a태그로 변경(a태그가 하이퍼링크를 걸어서, 특정 태그(a태그 안에 href라는 옵션 특성을 줘서)로 +글쓰기 페이지로 이동시켜주는 것) -->
  <a class="write-btn" href="#/write">+ 글쓰기</a>
</main>

<footer>
  <!-- 하단 footer를 감싸는 블럭 div1개 & 각 아이콘용 div5개 -->
  <div class="footer-block">
    <div class="footer-icons">
      <!--footer-icons: 아이콘 한개씩 큰 틀로-->
      <div class="footer-icons__img">
        <!--footer-icons__img: footer icons 이미지-->
        <img src="assets/home.svg" alt="" />
      </div>
      <div class="footer-icons__desc">홈</div>
      <!--footer-icons__desc: footer icons description 글자-->
    </div>

    <div class="footer-icons">
      <div class="footer-icons__img">
        <img src="assets/doc.svg" alt="" />
      </div>
      <div class="footer-icons__desc">동네생활</div>
    </div>

    <div class="footer-icons">
      <div class="footer-icons__img">
        <img src="assets/location.svg" alt="" />
      </div>
      <div class="footer-icons__desc">내 근처</div>
    </div>

    <div class="footer-icons">
      <div class="footer-icons__img">
        <img src="assets/chat.svg" alt="" />
      </div>
      <div class="footer-icons__desc">채팅</div>
    </div>

    <div class="footer-icons">
      <div class="footer-icons__img">
        <img src="assets/user.svg" alt="" />
      </div>
      <div class="footer-icons__desc">나의 당근</div>
    </div>
  </div>
</footer>

<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>

<style>
  .info-bar__time {
    color: blue;
  }
</style>
