<script>
  import Nav from "../components/Nav.svelte";
  import { user$ } from "../store";

  //   로그아웃은 2가지 정보 비워준다. (1.유저정보, 2.로컬스토리지). 그래서 user$.set(null); null로 바꿔주면되고, localStorage.removeItem("token"); 토큰 정보를 remove한다.
  const logout = () => {
    user$.set(null);
    localStorage.removeItem("token");
  };
</script>

<div>나의 당근</div>
<button class="logout-button" on:click={logout}>로그아웃</button>
<Nav location="my" />

<!-- 로그아웃 버튼 꾸미는건 숙제 -->
<style>
  .logout-button {
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
    background-color: tomato;
    margin: 10px;
    border-radius: 10px;
    padding: 5px 12px 5px 12px;
    color: white;
    font-weight: bolder;
  }
</style>
