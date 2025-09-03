# 🐷 적금통 키우기 - 게임처럼 재밌게 키우고 공유하는 나만의 적금
## 개요
 - **참여 대회명**: 2025 Shinhan Hackathon with SSAFY
 - **개발 기간**: 2025.08.13 ~ 2025.08.30
 - **배포 주소**: https://shinhan-bank-drab.vercel.app 
   
이 프로젝트는 신한은행 해커톤을 위해 개발된 프론트엔드 애플리케이션입니다. 사용자에게 챌린지·저축·커뮤니티 기능을 제공하고, 신한프렌즈 캐릭터의 해금 요소 및 의상 수집 요소를 결합한 게임형 금융 경험을 제공하여 꾸준한 금융 습관을 재밌게 형성할 수 있도록 돕는 것을 목표로 합니다.    
<br>
## 📌 목차

## 주요 기능


## 화면 예시


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
 
- **User Flow**
    
<img width="1920" height="1080" alt="유저플로우" src="https://github.com/user-attachments/assets/44e34def-8541-4675-b7e6-9cfefb95215d" />
<br>
 
- **ERD**    
<img width="624" height="755" alt="erd" src="https://github.com/user-attachments/assets/d62a5752-f6b2-40c6-8697-8e1aa659ba9d" />
<br><br>

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




## 5. 주요 구현 사항 (Key Features)

### SVG 애니메이션

**선택 이유 및 장점:**

-   **빠른 로딩 속도**: SVG는 XML 기반의 벡터 이미지 포맷으로, 파일 크기가 매우 작습니다. 이로 인해 GIF나 비디오 파일에 비해 초기 로딩 속도가 월등히 빠르며, 사용자 경험을 저해하는 로딩 지연을 최소화할 수 있습니다.
-   **성능 최적화**: `vite-plugin-svgr` 라이브러리를 사용하여 SVG를 React 컴포넌트로 변환했습니다. 이를 통해 SVG의 각 부분을 직접 제어하고 CSS Transform, Transition 등을 활용하여 애니메이션을 구현했습니다. 이는 브라우저의 GPU 가속을 활용할 수 있어 JavaScript로 모든 프레임을 직접 그리는 방식보다 성능이 뛰어납니다.
-   **확장성 및 유지보수**: 벡터 기반이므로 어떤 해상도에서도 깨지지 않고 선명하게 표시됩니다. 또한, 애니메이션 로직이 컴포넌트 코드 내에 포함되어 있어 관리가 용이합니다.

### 페이지 기반 아키텍처

**장점:**

-   **모듈성 및 응집도**: `src/pages` 디렉토리 내에 각 페이지별로 컴포넌트와 로직을 그룹화하여 코드의 모듈성을 높였습니다. 이는 특정 페이지와 관련된 코드를 쉽게 찾고 수정할 수 있게 하여 유지보수성을 향상시킵니다.
-   **코드 스플리팅 최적화**: 페이지 단위로 코드를 분리하는 구조는 React.lazy와 같은 기술을 적용하여 코드 스플리팅(Code Splitting)을 구현하기에 최적입니다. 이를 통해 초기 로딩 시 필요한 페이지만 불러오고, 나머지는 필요할 때 동적으로 로드하여 초기 로딩 성능을 크게 향상시킬 수 있습니다.
-   **관심사 분리 (SoC)**: 페이지별로 UI, 상태(Hooks), API 호출 등을 분리하여 관리함으로써 코드의 복잡도를 낮추고 각 부분의 역할을 명확하게 정의할 수 있습니다.

### 🛠️ Frontend 기술 스택 
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)![Ngrok](https://img.shields.io/badge/Ngrok-1F1E37?style=for-the-badge&logo=ngrok&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)


## 🤝 팀원 소개
| <img src="https://github.com/user-attachments/assets/6fab8eee-77b9-4653-a640-7be48705deb2" width="150" height="150"/> | <img src="https://github.com/user-attachments/assets/97cc7586-35de-4955-b349-aecc1ceb53e1" width="150" height="150"/> | <img src="https://github.com/user-attachments/assets/d2ef48f3-3673-4264-a8a4-0dcd2d6c4213" width="150" height="150"/> | <img src="https://github.com/user-attachments/assets/a55a3ee4-0222-4928-a000-25c121772699" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/144078388?v=4" width="150" height="150"/> |
|:-:|:-:|:-:|:-:|:-:|
| 김연호 [@Strangekim](https://github.com/Strangekim) | 명민주 [@typ0squir](https://github.com/typ0squir) | 송영주 [@yjsong2154](https://github.com/yjsong2154) | 김현우 [@So8oro](https://github.com/So8oro) | 조예림 [@YeRimmm-Cho](https://github.com/YeRimmm-Cho) |
| 팀장, 백엔드 | 백엔드 및 UX/UI | 프론트엔드 | 프론트엔드 | 프론트엔드 |
