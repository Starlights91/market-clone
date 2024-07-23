<!-- 앱 전체에 적용 -->
<script>
  import Login from "./pages/Login.svelte";
  import Main from "./pages/Main.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Signup from "./pages/Signup.svelte";
  import Write from "./pages/Write.svelte";
  import Router from "svelte-spa-router";
  import "./CSS/style.css";
  import { user$ } from "./store";
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
  } from "firebase/auth"; // 3가지 다 firebase/auth에 들어있어서 가져온다.
  // } from "../node_modules/firebase/auth"; //*****테스트 용 ****
  import { onMount } from "svelte";
  import Loading from "./pages/Loading.svelte";
  import MyPage from "./pages/MyPage.svelte";

  let isLoading = true; // 처음 이 앱이 렌더링 될 때는 로딩되어 있는 상태로 보여주고..

  const auth = getAuth();

  //checkLogin 함수로 묶어준다. 로그인 시키는 과정을 호출.
  const checkLogin = async () => {
    const token = localStorage.getItem("token"); //token은 localStorage에서 가져오고.
    if (!token) return (isLoading = false); //만약 여기서 토큰을 가져왔는데, 토큰이 없으면, 이 함수를 리턴해주고 (isLoading=로딩중입니다 뜨지않도록), 아무 동작도 하지 않도록 함.

    const credential = GoogleAuthProvider.credential(null, token); //토큰을 바탕으로 인증을 진행. GoogleAuthProvider는 idToken이 아니라 accessToken을 가져올거라서 앞에는 null, 그리고 뒤에 이 토큰 정보를 넘겨준다.
    const result = await signInWithCredential(auth, credential); // 그래서 signInWithCredential을 호출하게 된다.
    const user = result.user; // 결과에 유저 정보를 가져와서,
    user$.set(user); // 토큰을 바탕으로 user store에 (set해가지고 유저정보를) 업데이트.
    isLoading = false; // 여기까지 유저정보 가져온거 성공 했을 때에도 (isLoading=로딩중입니다 뜨지않도록).
  };

  const routes = {
    "/": Main,
    "/signup": Signup,
    "/write": Write,
    "/my": MyPage,
    "*": NotFound,
  };

  // 이 화면이 onMount될 때마다 한번 checkLogin을 진행하도록
  isLoading = false; // ***77강에서 계속 오류나서 내가 추가한 값.
  onMount(() => checkLogin());
</script>

<!-- isLoading이면, <Loading />페이지 보여주는데,-->
{#if isLoading}
  <Loading />
  <!-- user정보가 없으면 <Login/>페이지 (Login.svelte를 연결)를 보여주고 //참고:: {#if $!user$} ! 느낌표는: ~가 아니면 -->
{:else if !$user$}
  <Login />
  <!-- 그게 아니면, 라우터로 이동해서 const routes를 보여준다(이전에 구현해 놓은 코드들). -->
{:else}
  <Router {routes} />
{/if}
<!-- [과제] 로그인이 되어 있는 상태인지 app상단에 표시되도록 하는것 추가 필요. (Login.svelte /script 하단 참고)-->
