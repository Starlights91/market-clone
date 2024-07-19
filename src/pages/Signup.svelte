<!-- 서버쪽으로 sign up이라는 api로 보내기. 웹에서: http://127.0.0.1:8000/signup.html method를 post로-->
<form id="signup-form" action="/signup" method="POST">
  <div>회원가입</div>
  <div>
    <!-- input 마지막에 required를 입력하면, 필수입력 값으로 설정 -->
    <label for="id">아이디</label>
    <input type="text" id="id" name="id" required />
  </div>
  <div>
    <!-- input type에 "text"로 하면 p/w보이니까 "password"타입 사용하면 입력문자가 가려진다. -->
    <label for="password">패스워드</label>
    <input type="password" id="password" name="password" required />
  </div>
  <div>
    <!-- 패스워드 확인 추가 -->
    <label for="password2">패스워드 확인</label>
    <input type="password" id="password2" name="password2" required />
  </div>
  <div>
    <label for="name">이름</label>
    <input type="text" id="name" name="name" required />
  </div>
  <div>
    <label for="email">이메일</label>
    <input type="email" id="email" name="email" required />
  </div>
  <div>
    <button type="submit">회원 가입하기</button>
  </div>
  <div id="info"></div>
</form>
