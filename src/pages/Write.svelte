<!-- 글쓰기!! -->
<script>
  import { getDatabase, ref, push } from "firebase/database";
  import {
    getStorage,
    ref as refImage,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
  import Nav from "../components/Nav.svelte";

  let title;
  let price;
  let description;
  let place;
  let files;

  const storage = getStorage();
  const db = getDatabase();

  function writeUserData(imgUrl) {
    push(ref(db, "items/"), {
      title,
      price,
      description,
      place,
      insertAt: new Date().getTime(),
      imgUrl,
    });
    //alert를 여기선 쓰지만, 현업 서비스에서는 사용하지 않는 문법. (좋지않은 UX인 이유: 사용자가 팝업이 뜨면, 확인 버튼을 눌러줘야 하기 때문에)
    alert("글쓰기가 완료되었습니다.");
    // 글쓰기 완료후 홈 으로 이동.
    window.location.hash = "/";
  }

  // 이미지 업로드 + 이미지의 파일명이 그대로 업로드 되도록 구현. 이렇게만 올리면 용량이 너무 큰데 (이미지 최적화는 따로 공부하기)
  const uploadFile = async () => {
    const file = files[0];
    const name = file.name;
    const imgRef = refImage(storage, name);
    await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);
    return url;
  };

  const handleSubmit = async () => {
    const url = await uploadFile();
    writeUserData(url);
  };
</script>

<form id="write-form" on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="image">이미지</label>
    <input type="file" bind:files id="image" name="image" />
  </div>
  <div>
    <label for="title">제목</label>
    <input type="text" id="title" name="title" bind:value={title} />
  </div>
  <div>
    <label for="price">가격</label>
    <input type="number" id="price" name="price" bind:value={price} />
  </div>
  <div>
    <label for="description">설명</label>
    <input
      type="text"
      id="description"
      name="description"
      bind:value={description}
    />
  </div>
  <div>
    <label for="place">장소</label>
    <input type="text" id="place" name="place" bind:value={place} />
  </div>

  <!-- 제출 버튼 -->
  <div>
    <button class="write-button" type="submit">글쓰기 완료!</button>
  </div>
</form>

<Nav location="write" />

<style>
  /* Write.svelte 글쓰기 페이지에서만 적용되는 스타일 */
  .write-button {
    background-color: tomato;
    margin: 10px;
    border-radius: 10px;
    padding: 5px 12px 5px 12px;
    color: white;
    cursor: pointer;
  }
</style>
