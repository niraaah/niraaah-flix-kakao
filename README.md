# 영화 검색 및 관리 웹 애플리케이션

본 프로젝트는 TMDB API를 활용하여 영화 검색, 관리, 시청 기록 등을 제공하는 웹 애플리케이션입니다. 사용자는 개인 TMDB API 키를 통해 영화 데이터를 검색하고, 찜 목록 관리 및 무한 스크롤링을 활용한 효율적인 탐색을 경험할 수 있습니다.

---

## 📚 프로젝트 기본 정보

- **프로젝트 이름**: 영화 검색 및 관리 웹 애플리케이션
- **주요 기능**:
  - 영화 검색 (키워드, 장르, 언어, 평점, 개봉년도 등)
  - 로그인 및 회원가입 기능
  - 영화 찜하기 및 관리
  - 모달을 통한 상세 영화 정보 제공
  - 무한 스크롤링 및 반응형 UI
- **배포 상태**: 개발 중
- **사용 API**: [TMDB API](https://www.themoviedb.org/documentation/api)

---

## 🛠️ 기술 스택 명시

- **프론트엔드**: React, React Router DOM
- **스타일링**: CSS, Custom Animation, CSS Grid, Flexbox
- **백엔드 (API 사용)**: TMDB API
- **상태 관리**: React State
- **스토리지**: Local Storage
- **추가 라이브러리**:
  - `react-markdown`: 약관 내용 렌더링
  - `react-toastify`: 사용자 알림 (Toast) 처리

---

## 🔧 설치 및 실행 가이드

### 1️⃣ 프로젝트 클론

```bash
git clone <프로젝트 URL>
cd <프로젝트 폴더>
```

### 2️⃣ 패키지 설치

```bash
npm install
```

### 3️⃣ 프로젝트 실행

```bash
npm start
```

앱은 기본적으로 `http://localhost:3000`에서 실행됩니다. 

### 4️⃣ GitHub Pages 배포

프로젝트를 GitHub Pages에 배포하려면, 다음 명령어를 사용하여 빌드한 후 배포합니다.

```bash
npm run build
npm run deploy
```

배포 후, GitHub Pages에서 제공하는 URL을 통해 애플리케이션에 접근할 수 있습니다.

---

## 🗂️ 프로젝트 구조 설명

```csharp
📦 src
├── 📂 assets              # 이미지 및 정적 파일
│   ├── images/            # 이미지 파일
├── 📂 components          # 재사용 가능한 컴포넌트
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── MovieCard.jsx
│   ├── MovieModal.jsx
│   ├── Toast.jsx
│   └── WishlistCard.jsx
├── 📂 hooks               # 사용자 정의 Hook
│   ├── useFetchMovies.js
│   ├── useLocalStorage.js
│   └── useWishlist.ts
├── 📂 pages               # 주요 페이지
│   ├── Home.jsx
│   ├── MovieDetails.jsx
│   ├── Popular.jsx
│   ├── Search.jsx
│   ├── SignIn.jsx
│   └── Wishlist.jsx
├── 📂 services            # API 호출 및 유틸리티
│   ├── URL.ts             # TMDB API 호출 함수
├── 📂 styles              # 스타일링 파일
│   ├── global.css
│   ├── Home.css
│   ├── SignIn.css
│   └── Toast.css
└── 📂 terms               # 약관 파일
    └── terms.md
```

---

## 🧑‍💻 개발 가이드

### 1️⃣ 코딩 컨벤션

- 변수 및 함수명: 카멜케이스 (`camelCase`)
- 컴포넌트명: 파스칼케이스 (`PascalCase`)
- CSS 클래스명: 케밥케이스 (`kebab-case`)
- 코드 포매팅: ESLint 및 Prettier 준수

그럼 주요 개발자들이 자주 사용하는 기본적인 규칙으로 간소화된 버전을 제공하겠습니다. 자주 사용하고 가독성이 좋은 커밋 메시지 규칙으로 구성했습니다.

---

### 2️⃣ Git 커밋 메시지 규칙

| **유형**      | **설명**                          | **예시**                          |
|---------------|-----------------------------------|-----------------------------------|
| `feat`        | 새로운 기능 추가                 | feat: 검색 필터 기능 추가          |
| `fix`         | 버그 수정                       | fix: 로그인 상태 유지 문제 해결     |
| `docs`        | 문서 추가/수정                  | docs: README.md에 설치 가이드 추가 |
| `style`       | 스타일 변경 (UI/코드 포매팅 등) | style: 버튼 색상 조정             |
| `refactor`    | 코드 리팩토링                  | refactor: 영화 카드 로직 개선      |
| `test`        | 테스트 코드 추가/수정           | test: 영화 상세 페이지 테스트 추가 |
| `chore`       | 기타 작업 (빌드, 설정 변경 등)  | chore: ESLint 설정 추가           |

---

### 3️⃣ 브랜치 전략

- `main`: 배포 가능한 코드
- `develop`: 개발 중인 코드
- `feature/{기능명}`: 새로운 기능 추가 시 생성
- PR(Pull Request)을 통해 `develop`으로 병합

### 4️⃣ PR 템플릿 안내

#### PR 제목

`[유형] 작업 내용 요약`

#### 본문 템플릿

```md
## 작업 내용
- 주요 작업 내용

## 테스트 방법
- 테스트 방법 안내

## 관련 이슈
- #이슈번호
```

---

## 🐞 이슈 등록 방법

1. 이슈 제목은 간결하게 작성 (`[유형] 이슈 제목`)
2. 본문에 작업 내용을 구체적으로 기재
3. 관련 커밋 및 PR 번호 연결

---

## 📄 추가 문서 링크

- [TMDB API 문서](https://www.themoviedb.org/documentation/api)
- [React 공식 문서](https://reactjs.org/docs/getting-started.html)
- [React Router DOM 공식 문서](https://reactrouter.com/en/main)

---

## 📖 변경 이력


| 버전       | 변경 내용                                         | 날짜       |
|------------|--------------------------------------------------|------------|
| `v1.0.0`   | 프로젝트 초기화 및 기본 구조 설정                  | 2024-11-01 |
| `v1.1.0`   | TMDB API 연동 및 영화 검색, 장르 필터링 기능 추가  | 2024-11-05 |
| `v1.2.0`   | 로그인/회원가입 페이지 구현 (개인 TMDB API 키 사용) | 2024-11-08 |
| `v1.3.0`   | 찜하기 기능 추가 및 로컬스토리지 연동              | 2024-11-10 |
| `v1.4.0`   | 영화 상세 모달 구현 및 찜하기 버튼 기능 강화       | 2024-11-15 |
| `v1.5.0`   | 영화 찜 목록 페이지 구현 및 찜 해제/동기화 개선    | 2024-11-17 |
| `v1.6.0`   | 무한 스크롤 및 반응형 UI 업데이트                 | 2024-11-20 |
| `v1.7.0`   | 헤더 개선: 모바일 메뉴 추가 및 로그아웃 모달 구현 | 2024-11-22 |
| `v1.8.0`   | UI 개선: 버튼 스타일, 영화 카드 레이아웃 최적화   | 2024-11-24 |
| `v1.9.0`   | 모달 콘텐츠 스크롤 처리 및 기타 오류 수정  | 2024-11-25 |
| `v2.0.0`   | 최종 코드 정리 및 배포 준비                      | 2024-11-26 |

---

## 🔗 관련 프로젝트 링크

- [TMDB API 공식 사이트](https://www.themoviedb.org/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

---

Happy Coding! 🚀