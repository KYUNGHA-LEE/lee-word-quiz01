# 실시간 단어 찾기 게임

Firebase Realtime Database, GitHub, Vercel을 활용한 교실용 실시간 단어 찾기 게임입니다.

## 게임 규칙

- 강사는 방을 만들고 주제를 선택합니다.
- 주제는 과일, 동물, 나라, 꽃입니다.
- 학생은 방 코드와 닉네임으로 입장합니다.
- 학생이 현재 주제에 맞는 단어를 클릭하면 +1점입니다.
- 다른 주제의 단어를 클릭하면 -1점입니다.
- 단어판은 3초, 5초, 10초 간격으로 바꿀 수 있습니다.
- 게임 시간은 60초입니다.
- 게임 종료 후 TOP 3 순위가 팡파레와 함께 표시됩니다.

## 파일 구성

```txt
word-finder-game/
├── index.html
├── api/
│   └── check-teacher.js
├── database.rules.json
├── .env.example
└── README.md
```

## 1. Firebase 설정

Firebase에서 아래 기능을 준비합니다.

1. Firebase 프로젝트 생성
2. Realtime Database 생성
3. Authentication에서 Anonymous 로그인 사용 설정
4. 웹 앱 등록 후 `firebaseConfig` 확인

`index.html` 안의 아래 부분에 본인의 Firebase 설정값을 넣습니다.

```js
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

## 2. Realtime Database Rules

Firebase Console의 Realtime Database 규칙에 `database.rules.json` 내용을 붙여넣습니다.

이 규칙은 기본적으로 로그인한 익명 사용자만 방 데이터를 읽고 쓸 수 있게 합니다. 강사는 `hostUid` 기준으로 방을 관리합니다.

주의: 이 규칙은 수업용 기본 구조입니다. 학생이 개발자 도구로 점수를 조작하는 것까지 완전히 막으려면 점수 계산을 서버 함수에서 처리하는 구조로 강화해야 합니다.

## 3. GitHub에 올리기

GitHub 저장소에 아래 파일을 업로드합니다.

- `index.html`
- `api/check-teacher.js`
- `database.rules.json`
- `.env.example`
- `README.md`

## 4. Vercel 배포

Vercel에서 GitHub 저장소를 연결해 배포합니다.

Vercel 프로젝트 설정의 Environment Variables에 아래 이름의 환경변수를 추가합니다.

```txt
TEACHER_PASSWORD
```

값에는 실제 강사 비밀번호를 입력합니다. 이 값은 GitHub에 올리지 않습니다.

## 5. 실행 흐름

1. 강사 화면에서 비밀번호 입력
2. Vercel API 함수 `/api/check-teacher`가 비밀번호 확인
3. 맞으면 Firebase Anonymous 로그인
4. 방 생성
5. 학생은 방 코드와 닉네임으로 입장
6. 강사가 주제와 단어 변경 속도 선택
7. 게임 시작
8. 60초 후 TOP 3 표시

## 현재 버전의 한계

- 강사 화면이 타이머와 단어 변경을 진행합니다.
- 강사 브라우저 창을 닫으면 게임 진행이 멈출 수 있습니다.
- 학생 점수 조작을 완전히 막으려면 서버에서 클릭 판정을 처리하는 방식으로 확장해야 합니다.

처음 공부용으로는 이 버전이 적당하고, 이후에 서버 판정 방식으로 강화할 수 있습니다.
