<p align="center"><img src="https://user-images.githubusercontent.com/79002373/207541622-52b3b95c-4fd0-40c0-8925-945f507fc584.png" width=20% height=20% /></p>

<p align="center"><a href="https://www.mildo.live/">👉🏻 <strong>밀도 바로가기</strong></a></p>


<p align="center"><a href="https://github.com/boostcampwm-2022/web33-Mildo/wiki">👉🏻 <strong>위키</strong></a></p>

# 📍 Mildo 소개

Mildo는 **반응형 웹**으로 제작되어 언제 어디서든 **서울시 주요 50곳의 인구 밀도 정보**를 쉽게 확인할 수 있는 서비스입니다.

# 👍🏻 Mildo의 장점

### 목적이 명확한 서비스

- 서울시 실시간 **인구 밀도**와 관련된 정보만 제공합니다.

### 기기 제약이 없는 서비스

- **데스크톱 환경**과 **모바일 환경**에서 모두 이용할 수 있습니다.

### 간단한 이용 방법

- **비로그인** 상태에서도 Mildo의 주요 기능들을 이용할 수 있습니다.
- 지도에서 서울시 주요 지역 50곳의 실시간 인구 밀도 정보를 **한눈에 파악**할 수 있습니다.
- 핀을 클릭하여 해당 지역의 **구체적인 인구 정보를 확인**할 수 있습니다.

### 이용자 편의 기능 제공

- 혼잡도 **필터** 기능을 통해 혼잡도 별로 지역을 확인할 수 있습니다.
- **북마크**를 사용해 선호하는 지역의 정보만 빠르게 확인할 수 있습니다.
- **검색**으로 직접 지도를 움직일 필요 없이 원하는 지역으로 이동할 수 있습니다.

# ✨ 기능 소개

- 사이트 접속 시 서울시의 지도가 나타나고, 주요 장소의 인구 밀도 정보를 나타내는 마커를 확인할 수 있습니다.

  <img src="https://user-images.githubusercontent.com/85938399/207534254-40c8b913-3e76-4031-82f1-99ffca784ca3.gif" width=30% height=30%/>

- 주요 장소의 마커를 클릭하여 해당 장소의 인구와 최근 24시간 인구 동향을 파악할 수 있습니다.

  <img src="https://user-images.githubusercontent.com/85938399/207534279-91dce451-ed8d-4d97-a92f-4856b6c208d3.gif" width=30% height=30%/>

- 상단의 필터링 기능을 통해 이용자가 원하는 특정 혼잡도의 마커만 확인할 수 있습니다.

  <img src="https://user-images.githubusercontent.com/85938399/207534312-ea9aac40-503e-49dc-99d4-7a35441fa9db.gif" width=30% height=30%/>

- 검색 기능을 통해 주요 장소를 쉽게 찾을 수 있습니다.

  <img src="https://user-images.githubusercontent.com/85938399/207534338-4bd312f9-44cc-4e40-a436-ada27cacb479.gif" width=30% height=30%/>

- 네이버 로그인 기능을 제공하며, 북마크 기능을 사용할 수 있습니다.

  <img src="https://user-images.githubusercontent.com/85938399/207534363-633a9443-1312-46ba-89f8-afd02e082880.gif" width=30% height=30%/>

- 주요 장소를 북마크에 등록하여 관심 있는 장소의 혼잡도를 한눈에 확인할 수 있으며, 해당 장소로 쉽게 이동할 수도 있습니다.

  <img src="https://user-images.githubusercontent.com/85938399/207534377-1038fab1-8a59-4d56-9216-2877d63e7521.gif" width=30% height=30%/>

# 🛠️ 기술 스택

![Untitled](https://user-images.githubusercontent.com/85938399/207538368-3e15f942-7e2d-47fc-b8fc-601e08057c91.png)

<details>
  <summary><h2>주요 기술 소개</h2></summary>
<div>

### React

- Mildo는 서울 실시간 도시데이터 API, 네이버 Maps API 등 다양한 외부 API를 사용합니다.
    - React의 hooks를 사용하면 정보를 가져오고, 렌더링을 하는 일련의 과정을 원할하게 수행할 수 있습니다.
- Mildo는 Modal, Loading, Marker 등의 컴포넌트를 재사용하는 경우가 많습니다.
- Mildo는 데이터 변동 잦아 재렌더링이 많이 발생하는데 상태 관리를 통해 부분 렌더링으로 성능을 개선하였습니다.

### TypeScript

- Mildo는 여러 외부 API를 통해 날짜, 장소명, 좌표, 인구수 등의 다양한 타입의 외부 데이터를 사용합니다.
    - 직접 수집하지 않는 외부 데이터이기 때문에 정확한 타입 관리가 이뤄지지 않으면 사용자에게 잘못된 정보를 제공하거나 협업 과정에서 혼선이 생길 것으로 판단했습니다.

### jotai

- jotai를 사용하여 전역 상태를 관리하고 그래프 렌더링에 필요한 데이터를 캐싱하는데 사용했습니다.

### node-cron

- 서울시 도시 데이터 API는 대략 1시간에 2번 정도 고정된 시간으로 제공됩니다.
    - 그래서 이용자가 접속할 때마다 api 요청을 보내는 것보다 api 서버에서 일정 간격으로 서울시 도시 데이터를 저장하여 성능을 개선했습니다.

### Redis

- Mildo는 매일 50 곳에 대한 정보를 30분마다 1회씩 총 48회 수집하기 때문에 MongoDB에서 최근 데이터를 가져오면 속도에 문제가 발생했습니다.
    - 그래서 최근 데이터는 Redis에 함께 저장하고 불러와서 데이터 처리 속도를 높였습니다.

### Github Actions

- 완성된 프로그램 제작을 목표로 매주 목요일에 배포를 진행하였습니다.
- Github Actions를 사용해 비교적 간편하게 CI/CD를 구현하고 배포에 들이는 시간을 아낄 수 있었습니다.

### Nginx

- Mildo는 사용자 위치 정보가 필요하여 https 설정이 필요한데, nginx를 통해 https를 적용하였습니다.

</div>
</details>

# 🤔 주요 기술적 고민

- [🚈 인구 밀도 데이터 조회 시간 단축시키기](https://github.com/boostcampwm-2022/web33-Mildo/wiki/%EC%9D%B8%EA%B5%AC-%EB%B0%80%EB%8F%84-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A1%B0%ED%9A%8C-%EC%8B%9C%EA%B0%84-%EB%8B%A8%EC%B6%95%EC%8B%9C%ED%82%A4%EA%B8%B0)
- [🥦 react-query를 이용한 캐싱](https://github.com/boostcampwm-2022/web33-Mildo/wiki/react-query%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BA%90%EC%8B%B1)
- [🔁 Suspense와 react-query, jotai atomsWithQuery](https://github.com/boostcampwm-2022/web33-Mildo/wiki/Suspense%EC%99%80-react-query,-jotai-atomsWithQuery)
- [🛵 모달 제목 애니메이션 구현하기](https://github.com/boostcampwm-2022/web33-Mildo/wiki/%EB%AA%A8%EB%8B%AC-%EC%A0%9C%EB%AA%A9-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
- [💗 LCP 개선](https://github.com/boostcampwm-2022/web33-Mildo/wiki/LCP-%EA%B0%9C%EC%84%A0)
