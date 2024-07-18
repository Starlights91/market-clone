# 백엔드 서버 (Fast API를 통해서 API 만들기.) from FastAPI에서 FastAPI를 import(끌어온다).
#1번째 라인: fastapi에 import 이중에 하나 response가 있다로 import. 
from fastapi import FastAPI,UploadFile,Form,Response,Depends   #app.post에 image:UploadFile을 위해서 ,UploadFile 추가 & title:Annotated[str,Form()], 때문에 ,Form 추가. , Response 추가., Depends 추가
from fastapi.responses import JSONResponse    #from fastapi.responses에 import해서 JSONResponse로 불러온다.
from fastapi.encoders import jsonable_encoder   #from fastapi.encoders 중에서 import해서 jsonable_encoder를 불러온다.
from fastapi.staticfiles import StaticFiles
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException #유효하지않은 계정 정보에 대한 에러 처리를 할 수 있는 문법. 
from typing import Annotated   #from typing 이라는 것에서 import Annotated라는 속성을 가져온다.
import sqlite3

# SQLite3 사용할 준비 셋팅.
con = sqlite3.connect('db.db',check_same_thread=False)  # SQLite3.connect('db.db',)파일에다가 연결, check_same_thread옵션을 False로 준다(나중에 귀찮아지는 부분을 미연에 방지하기 위함.).
cur = con.cursor() # 커서를 현재 위치로 업데이트. cur 라는 속성을 주고, con.cursor () DB에서 cursor라는 개념을 이용해서 특정 insert하거나 select할 때 사용하기 위해 세팅하는 것.

#백엔드 코드가 실행될 때, CREATE TABLE을 한번 만들고, 만든 후에 데이터를 그 테이블 안에 넣을 수 있게 된다. 다만, 이렇게만 넣어주면 테이블이 이미 존재한다고 에러가 발생된다. 배포 후에도 서버가 잠깐 내려갔다 올라오게되면 그 때마다 아래의 CREATE TABLE이 들어가게되면 에러 발생.
#이런 에러를 방지하기 위해, 테이블이 없을 때만 CREATE 될 수 있도록 조건문 IF NOT EXISTS 을 하나 넣어주면 된다.  
cur.execute(f"""
            CREATE TABLE IF NOT EXISTS items (
	            id INTEGER PRIMARY KEY,
	            title TEXT NOT NULL,
	            image BLOB,
	            price INTEGER NOT NULL,
	            description TEXT,
	            place TEXT NOT NULL,
	            insertAt INTEGER NOT NULL
            );
            """)

app = FastAPI()

# LoginManager는 내가 만든 SECRET과 '/login' 통과해서, 적당한 access_token을 만들어 주는 그런 라이브러리
# SECRET 지정. SECRET정보는 access token을 어떻게 인코딩 할지를 정하는 것이기 때문에 노출되면, decoding이 될 수 있다.
# 이전에 jwt는 base64 인코딩을 통해서 암호화(인코딩)이 되는데, SECRET은 반대로 decoding이 가능하다.그래서 이 SECRET 키를 노출시키면, jwt를 언제든지 해석할 수 있게되는 것이라 주의.
# 토큰이 /login 로그인에서만 발급 될 수 있도록 지정.
SECRET = "super-coding"
manager = LoginManager(SECRET,'/login')

# 해당 유저가 DB에 존재하는지를 조회를 해봐야 함 이때 LoginManager key를 같이 조회하기 때문에 @manager.user_loader()를 호출.
@manager.user_loader()
# 아래의#엑세스 토큰 id, name, email들이 string타입으로 들어가지 않기 때문에 def query_user(id): 에서 def query_user(data):로 변경.
def query_user(data):
    #WHERE_STATEMENTS에 f'''''' 원래는 data는.... 만약에 if type data가 access_token sub아래의 객체 형태로 넘어오게되면, 그 안에 있는 id를 빼서 써야되기 때문에 'dict': 데이터 안에 있는 id값으로 들어가게 된다.
    WHERE_STATEMENTS = f'id="{data}"'
    #파이썬은 아래처럼 타입을 지정해주어야 함. 'dict': 으로 하면 string으로 문자열로 인식되니까 그냥 dict:
    if type(data) == dict:
        WHERE_STATEMENTS = f'''id="{data["id"]}"'''
        # SQL에서 컬럼명도 같이 가져오는 문법. (이 문법으로 에러 해결: TypeError: tuple indices must be integers or slices, not str)
    con.row_factory = sqlite3.Row
    cur = con.cursor() # 커서를 현재 위치로 업데이트. cur 라는 속성을 주고, con.cursor () DB에서 cursor라는 개념을 이용해서 특정 insert하거나 select할 때 사용하기 위해 세팅하는 것.
    user = cur.execute(f"""
                       SELECT * from users WHERE {WHERE_STATEMENTS}
                       """).fetchone()
    return user


# 로그인 정보 user = query_user(id)를 통해서 유저 정보를 받아온다.
@app.post('/login')
def login(id:Annotated[str,Form()], 
           password:Annotated[str,Form()]):
    user = query_user(id)
    # print(user)
    # print(user['password']) #이렇게 특정 컬럼만 조회하려면, 상단의 def query_user(id): 에서 SQL에서 컬럼명도 같이 가져오는 문법. con.row_factory = sqlite3.Row & cur = con.cursor() 사용해서 컴럼과 같이 가져와야 한다.
    
    #if 유저가 없거나, raise 존재하지 않는 유저거나, elif 여기에 입력한 password가 유저의 정보를 조회해서 얻은 password와 일치하지 않으면, raise 이것도 역시 에러를 보내준다.
    # 여기서 user가 없으면 서버에서 에러메세지를 보내줘야하고, python에선 raise 문법을 사용.
    # 상단에 from fastapi_login.exceptions import InvalidCredentialsException 추가. (유효하지않은 계정 정보에 대한 에러 처리를 할 수 있는 문법)
    # elseif = 파이썬에선 elif로 사용.
    if not user:
        raise InvalidCredentialsException  #raise InvalidCredentialsException이 401 자동으로 생성해서 내려줌
    elif password != user['password']:
        raise InvalidCredentialsException
    
    # 엑세스 토큰: sub안에 객체를 이렇게 'id':user['id'], 'name':'name':user['name'],'email':user['email']로 내려주도록 함.
    access_token = manager.create_access_token(data={
        'sub': {
            'id':user['id'],
            'name':user['name'],
            'email':user['email']
        }
    })
    
    return {'access_token':access_token} #따로 지정해주지 않으면, 서버에서 자동으로 200 상태코드를 내려주는데, 여기에 access_token을 넣어준다.

#signup.html에서 form을 통해서 보내니까 post로 받아야함.
#사용자를 추가하는 과정
@app.post('/signup')
def signup(id:Annotated[str,Form()], 
           password:Annotated[str,Form()],
           name:Annotated[str,Form()],
           email:Annotated[str,Form()]):
    cur.execute(f"""
                INSERT INTO users(id,name,email,password)
                VALUES ('{id}','{name}','{email}','{password}')
                """)
    con.commit()
    return '200'
#[개선 필요] 여기까지는 이미 가입된 유저임에도 가입이 되기 때문에, 이미 가입되어 있는 user인지 판단하는 로직은 생각해서 추가하기.


@app.post('/items')
async def create_item(image:UploadFile, 
                title:Annotated[str,Form()], 
                price:Annotated[int,Form()], 
                description:Annotated[str,Form()], 
                place:Annotated[str,Form()],
                insertAt:Annotated[int,Form()],
                # user=Depends(manager) #[개선 필요] 서버에서는 유저가 인증된 상태에서만 응답을 내려줄 수 있게 추가 가능. 다만 이 코드만 넣어선 실행이 안되니까, +unauthorized로 된 부분을 로그인/회원가입 페이지로 서버에서 연결해주어야 함.
                ):
    
    # 받은 데이터를 넣어줘야 하는데,
    # 1줄: 이미지 데이터는 BLOB 타입으로 굉장히 크게 오기 때문에 이미지 데이터를 읽을 시간이 먼저 필요하다. await 때문에 빨간줄 뜨는거라 위에서 def 앞에 async 넣기! 
    # 2줄: 이미지와 title, price 등 이런 정보들이 다 읽혀 있을거라 DB에 insert하는 것.
    # 3줄: INSERT INTO items는 SQL 테이블 명. ()안에는 컬럼명들.
    # 4줄: VALUES는 들어갈 값 순서대로. 각각 문자열(str)값에는 '작은 따옴표'와 {중괄호}를 쓰고, 숫자열(int)값에는 '작은 따옴표'는 생략하고 {중괄호}만 쓴다. image는 image_bytes로 앞에서 바꾸어 놓았기 때문에, 그 뒤에.hex 문법을 써서 16진법으로 바꿔서 저장.
    # 요약: title,image,price,description,place를 갖는 items라는 테이블에 (VALUES)이런 값들을 넣어 데이터가 들어간다는 뜻.
    image_bytes = await image.read() 
    cur.execute(f"""
                INSERT INTO items(title,image,price,description,place,insertAt) 
                VALUES ('{title}','{image_bytes.hex()}',{price},'{description}','{place}','{insertAt}')
                """)
    con.commit()
    return '200' #여기까지 다 됐을 때, /docs에서 response body: 200이 나오면 서버쪽에 제대로 들어갔다는 뜻. items에 넣어준 값들이 제대로 들어갔는지 dbeaver를 다시 열어서 db.db > 테이블 > items에서 확인 시, 내가 docs에서 입력했던 값들이 정상적으로 들어간것을 확인할 수 있다. #프론트엔드에서도 처리가 잘 되는지 확인: 

# user=Depends(manager) 를 써서 서버에서는 유저가 인증된 상태에서만 응답을 내려주고, 그렇지 않으면 401 에러를 내려준다.
@app.get('/items')
async def get_items(user=Depends(manager)):
    # SQL에서 컬럼명도 같이 가져오는 문법.
    # print(user)
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    rows = cur.execute(f"""
                       SELECT * FROM items;
                       """).fetchall()
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))

#이미지 응답 만들기. ('/images/를 {item_id}')를 같이 넣어 보내주면, 그 item id 요청에 맞는 특정 이미지 컬럼만 가져와서 보내준다.    
#이렇게 아래처럼 image_ bytes 까지만 가져오게되면 이미지는 hex(16진법)라서 
#변환해서 가져오도록 response 만들기. return Response
#.fetchone()[0]  :하나만 가져올 때 문법
#최상단에 1번째 라인: from fastapi import FastAPI,UploadFile,Form,Response  :여기에 ,Response 추가해서 fastapi에 import 이중에 하나 response가 있다로 import 그리고, 
#(content=) 안에 있는 컨텐츠를 어떻게 response 할 거냐, fromhex(image_ bytes) 16진법으로 된 것을 가져와서 여기 bytes 즉, 이진법 bytes로 바꿔서, response하겠다는 말. 
@app.get('/images/{item_id}')
async def get_image(item_id):
    cur = con.cursor()
    image_bytes = cur.execute(f"""
                              SELECT image FROM items WHERE id={item_id}
                              """).fetchone()[0]
    #media_type='image/*' 추가: python 환경(version)이 Fly.io와 내 로컬과 다르면, 이미지가 정상적으로 불러와지지 않는 문제가 발생될 수 있기 때문에 명시해주는 것이 좋다.   
    return Response(content=bytes.fromhex(image_bytes), media_type='image/*')


app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend") # app.mount ("/"), 이 루트 패스는 맨 마지막에 작성해주는 것이 좋다.
