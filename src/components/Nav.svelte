<script>
  // 전달받을 값을 넣어줄 수 있다 (앱하단의 컴포넌트가 해당 페이지에 들어갈 때마다 표시가 바뀌도록)
  export let location;

  //홈버튼 활성화. window.location.pathname (/)이 아닌 hash로 쓴건, 웹 주소에 /#/으로 들어가기 때문에
  const moveToHome = () => (window.location.hash = "/");

  //나의 당근 mypage 활성화.
  const moveToMyPage = () => (window.location.hash = "/my");
</script>

<footer>
  <!-- 하단 footer를 감싸는 블럭 div1개 & 각 아이콘용 div5개 -->
  <div class="footer-block">
    <!-- footer-icons를 div가 아닌 버튼으로 변경 -->
    <button class="footer-icons" on:click={moveToHome}>
      <!--footer-icons: 아이콘 한개씩 큰 틀로-->
      <div class="footer-icons__img">
        <!-- location이 home (홈) 페이지에 있으면, 네이게이션 바의 홈 아이콘이 검정색으로 보이게 -->
        {#if location === "home"}
          <!--footer-icons__img: footer icons 이미지-->
          <img src="assets/home_on.svg" alt="homeYes" />
          <!-- location이 home (홈) 페이지가 아니면, 네이게이션 바의 홈 아이콘이 비어 보이게 -->
        {:else}
          <img src="assets/home_off.svg" alt="homeNot" />
        {/if}
      </div>
      <!--footer-icons__desc: footer icons description 글자-->
      <div class="footer-icons__desc">홈</div>
    </button>

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

    <button class="footer-icons" on:click={moveToMyPage}>
      <div class="footer-icons__img">
        <!-- location이 my(나의 당근)페이지이면 검정 아이콘으로 보이게-->
        {#if location === "my"}
          <img src="assets/user_on.svg" alt="myYes" />
          <!-- location이 my(나의 당근)페이지가 아니면 비어있는 아이콘으로 보이게-->
        {:else}
          <img src="assets/user_off.svg" alt="myNo" />
        {/if}
      </div>
      <div class="footer-icons__desc">나의 당근</div>
    </button>
  </div>
</footer>
