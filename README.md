## Mildo 소개

Mildo는 **반응형 웹**으로 제작되어 언제 어디서든 **서울시 주요 50곳의 인구 밀도 정보**를 쉽게 확인할 수 있는 서비스입니다.

## Mildo의 장점

### 목적이 명확한 서비스

- 서울시 실시간 인구 밀도와 관련된 정보만 제공합니다.

### 기기 제약이 없는 서비스

- 데스크톱 환경과 모바일 환경에서 모두 이용할 수 있습니다.

### 간단한 이용 방법

- 비로그인 상태에서도 Mildo의 주요 기능들을 이용할 수 있습니다.
- 지도에서 서울시 주요 지역 50곳의 실시간 인구 밀도 정보를 한눈에 파악할 수 있습니다.
- 핀을 클릭하여 해당 지역의 구체적인 인구 정보를 확인할 수 있습니다.

### 이용자 편의 기능 제공

- 혼잡도 필터 기능을 통해 혼잡도 별로 지역을 확인할 수 있습니다.
- 북마크를 사용해 선호하는 지역의 정보만 빠르게 확인할 수 있습니다.
- 검색으로 직접 지도를 움직일 필요 없이 원하는 지역으로 이동할 수 있습니다.

## 기능 소개

- 사이트 접속 시 서울시의 지도가 나타나고, 주요 장소의 인구 밀도 정보를 나타내는 마커를 확인할 수 있습니다.
  ![1  전체 화면](https://user-images.githubusercontent.com/85938399/207534254-40c8b913-3e76-4031-82f1-99ffca784ca3.gif)

- 주요 장소의 마커를 클릭하여 해당 장소의 인구와 최근 24시간 인구 동향을 파악할 수 있습니다.
  ![2  주요 장소 마커](https://user-images.githubusercontent.com/85938399/207534279-91dce451-ed8d-4d97-a92f-4856b6c208d3.gif)

- 상단의 필터링 기능을 통해 이용자가 원하는 특정 혼잡도의 마커만 확인할 수 있습니다.
  ![3  필터링](https://user-images.githubusercontent.com/85938399/207534312-ea9aac40-503e-49dc-99d4-7a35441fa9db.gif)

- 검색 기능을 통해 주요 장소를 쉽게 찾을 수 있습니다.
  ![4  검색](https://user-images.githubusercontent.com/85938399/207534338-4bd312f9-44cc-4e40-a436-ada27cacb479.gif)

- 네이버 로그인 기능을 제공하며, 북마크 기능을 사용할 수 있습니다.
  ![5  로그인](https://user-images.githubusercontent.com/85938399/207534363-633a9443-1312-46ba-89f8-afd02e082880.gif)

- 주요 장소를 북마크에 등록하여 관심 있는 장소의 혼잡도를 한눈에 확인할 수 있으며, 해당 장소로 쉽게 이동할 수도 있습니다.
  ![6  북마크](https://user-images.githubusercontent.com/85938399/207534377-1038fab1-8a59-4d56-9216-2877d63e7521.gif)

## 기술 스택

![Untitled](https://user-images.githubusercontent.com/85938399/207538368-3e15f942-7e2d-47fc-b8fc-601e08057c91.png)

## 주요 기술적 고민

- [🚈 인구 밀도 데이터 조회 시간 단축시키기](https://github.com/boostcampwm-2022/web33-Mildo/wiki/%EC%9D%B8%EA%B5%AC-%EB%B0%80%EB%8F%84-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A1%B0%ED%9A%8C-%EC%8B%9C%EA%B0%84-%EB%8B%A8%EC%B6%95%EC%8B%9C%ED%82%A4%EA%B8%B0)
- [🥦 react-query를 이용한 캐싱](https://github.com/boostcampwm-2022/web33-Mildo/wiki/react-query%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BA%90%EC%8B%B1)
- [🔁 Suspense와 react-query, jotai atomsWithQuery](https://github.com/boostcampwm-2022/web33-Mildo/wiki/Suspense%EC%99%80-react-query,-jotai-atomsWithQuery)
- [🛵 모달 제목 애니메이션 구현하기](https://github.com/boostcampwm-2022/web33-Mildo/wiki/%EB%AA%A8%EB%8B%AC-%EC%A0%9C%EB%AA%A9-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
- [💗 LCP 개선](https://github.com/boostcampwm-2022/web33-Mildo/wiki/LCP-%EA%B0%9C%EC%84%A0)
