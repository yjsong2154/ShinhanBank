
# 🐷 적금통 키우기 - 게임처럼 재밌게 키우고 공유하는 나만의 적금
## 📖 개요
 - **참여 대회명**: 2025 Shinhan Hackathon with SSAFY
 - **개발 기간**: 2025.08.13 ~ 2025.08.30
 - **배포 주소**: https://shinhan-bank-drab.vercel.app

이 프로젝트는 신한은행 해커톤을 위해 개발된 프론트엔드 애플리케이션입니다. 사용자에게 챌린지·저축·커뮤니티 기능을 제공하고, 신한프렌즈 캐릭터의 해금 요소 및 의상 수집 요소를 결합한 게임형 금융 경험을 제공하여 꾸준한 금융 습관을 재밌게 형성할 수 있도록 돕는 것을 목표로 합니다.    
<br>
## 📌 목차
- [✨ 주요 기능](#-주요-기능)
- [🖥️ 화면 구성 및 시연 동영상](#️-화면-구성-및-시연-동영상)
- [⚙️ 프로젝트 실행 가이드](#️-프로젝트-실행-가이드)
- [🧩 시스템 아키텍쳐](#-시스템-아키텍쳐)
- [🔥 주요 구현 사항](#-주요-구현-사항)
- [🛠️ Frontend 기술 스택](#️-frontend-기술-스택)
- [🤝 팀원 소개](#-팀원-소개)
- [🔗 관련 링크](#-관련-링크)
<br>

## ✨ 주요 기능
### 적금통 관리

-   다양한 적금 상품 선택 및 적금통 생성
    
-   실시간 납입 내역 동기화
    
-   목표 달성률 및 진행 상황 추적
    
-   중도 해지 기능 제공
<br>
    

### 캐릭터 시스템
-   캐릭터, 의상, 모자 등 다양한 코스메틱 아이템    

-   업적 달성을 통한 새로운 아이템 획득    

-   적금통별 캐릭터 개별 설정 가능
<br>

### 업적 & 랭킹

-   저축 활동 기반 업적 시스템
    
-   대학별/학과별 챌린지 랭킹 제공
    
-   가중치 기반 종합 점수 산출
<br>

### 알림 시스템

-   납입 성공/실패 실시간 알림

-   업적 달성 알림    

-   댓글 및 좋아요 알림

<br>

## 🖥️ 화면 구성 및 시연 동영상
- **시연 영상**    
https://youtube.com/shorts/6i-mFkp4MJI?feature=share
<br>

## ⚙️ 프로젝트 실행 가이드

### 개발 환경

- **Node.js**: v20.11.0
- **pnpm**: 9.6.0
- **Vite**: ^7.1.0
- **React**: ^19.1.1
- **TypeScript**: ~5.8.3
<br>

### 로컬 환경에서 빌드 및 실행 방법
#### 빌드 방법

1.  프로젝트 루트 디렉토리에서 다음 명령어를 실행하여 의존성을 설치합니다.
    ```bash
    npm install
    ```
2.  다음 명령어를 실행하여 프로젝트를 빌드합니다.
    ```bash
    npm build
    ```
3.  빌드 결과물은 `dist` 디렉토리에 생성됩니다.    
<br>

#### 실행 방법

1.  프로젝트 루트 디렉토리에서 다음 명령어를 실행하여 의존성을 설치합니다.
    ```bash
    npm install
    ```
2.  다음 명령어를 실행하여 개발 서버를 구동합니다.
    ```bash
    npm run dev
    ```
3.  브라우저에서 `http://localhost:5173` (또는 터미널에 표시된 주소)로 접속합니다.
<br>   

### 🚀 배포된 서비스 접속

아래 링크를 통해 Vercel에 배포된 라이브 서비스를 바로 이용할 수 있습니다.

-   **서비스 주소**: [https://shinhan-bank-drab.vercel.app/](https://shinhan-bank-drab.vercel.app/)
<br>  


## 🧩 시스템 아키텍쳐 

- **Architecture**    
<img width="1920" height="1138" alt="architecture" src="https://github.com/user-attachments/assets/5ca137a3-291e-47af-ae08-55eb63f44572" />
<br>
 
- **Flow Chart**
    
<img width="1920" height="1080" alt="유저플로우" src="https://github.com/user-attachments/assets/44e34def-8541-4675-b7e6-9cfefb95215d" />
<br>
 
- **ERD**    
<img width="624" height="755" alt="erd" src="https://github.com/user-attachments/assets/d62a5752-f6b2-40c6-8697-8e1aa659ba9d" />
<br></br>

- **프론트엔드 폴더 구조**    
```
shinhan_hackathon_FE
 ┣ 📂docs                # 기획서, 화면 설계 자료
 ┣ 📂public              
 ┣ 📂src                 
 ┃ ┣ 📂animation         # 신한프렌즈캐릭터 애니메이션 관련
 ┃ ┣ 📂api               # API 호출 모듈 및 mock 데이터
 ┃ ┣ 📂assets            
 ┃ ┣ 📂components        # 공통 UI 컴포넌트
 ┃ ┣ 📂contexts          
 ┃ ┣ 📂hooks             # 커스텀 훅 (저장, 랭킹, 피드 등)
 ┃ ┣ 📂pages             # 페이지 단위 컴포넌트
 ┃ ┣ 📂styles            
 ┃ ┣ 📂utils             
 ┃ ┣ 📜App.tsx           
 ┃ ┗ 📜main.tsx          
 ┣ 📜.env                
 ┣ 📜.gitignore
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┗ 📜vite.config.ts
```
<br>



## 🔥 주요 구현 사항


### SVG 애니메이션

-   **빠른 로딩 속도**: GIF/비디오보다 가벼운 SVG 벡터 포맷 활용
    
-   **성능 최적화**: `vite-plugin-svgr`로 SVG를 React 컴포넌트로 변환 → CSS Transform/Transition으로 GPU 가속 애니메이션 구현
    
-   **확장성**: 해상도 무관 선명 표시, 애니메이션 로직을 컴포넌트 내에서 관리하여 유지보수 용이
<br>
    

### 페이지 기반 아키텍처

-   **모듈성**: `src/pages`에 페이지 단위 코드 그룹화 → 관련 로직 탐색과 유지보수 효율 상승
    
-   **코드 스플리팅**: React.lazy 등 적용으로 초기 로딩 최적화
    
-   **관심사 분리 (SoC)**: UI / Hooks / API 호출을 페이지별로 분리, 복잡도 감소

<br>

## 🛠️ Frontend 기술 스택 
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)![Styled-Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)![Ngrok](https://img.shields.io/badge/Ngrok-1F1E37?style=for-the-badge&logo=ngrok&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

<br>

## 🤝 팀원 소개
| <img src="https://github.com/user-attachments/assets/6fab8eee-77b9-4653-a640-7be48705deb2" width="150" height="150"/> | <img src="https://github.com/user-attachments/assets/97cc7586-35de-4955-b349-aecc1ceb53e1" width="150" height="150"/> | <img src="https://github.com/user-attachments/assets/d2ef48f3-3673-4264-a8a4-0dcd2d6c4213" width="150" height="150"/> | <img src="https://github.com/user-attachments/assets/a55a3ee4-0222-4928-a000-25c121772699" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/144078388?v=4" width="150" height="150"/> |
|:-:|:-:|:-:|:-:|:-:|
| 김연호 [@Strangekim](https://github.com/Strangekim) | 명민주 [@typ0squir](https://github.com/typ0squir) | 송영주 [@yjsong2154](https://github.com/yjsong2154) | 김현우 [@So8oro](https://github.com/So8oro) | 조예림 [@YeRimmm-Cho](https://github.com/YeRimmm-Cho) |
| 팀장, 백엔드 | 백엔드 및 UX/UI | 프론트엔드 | 프론트엔드 | 프론트엔드 |
<br>


## 🔗 관련 링크
- [Backend Repository](https://github.com/Strangekim/saving_box_challenge_backend)
- [기획 문서 (Notion)](https://www.notion.so/25a4f047161481029fdde7bdee741b53)
