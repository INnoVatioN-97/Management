# Goorm 나동빈님 리액트 고객 관리 시스템 강좌영상 연습

## 리액트의 흐름

-   1. constructor()

-   2. componentWillMount()

-   3. render()

-   4. componentDidMount()

## Feature

-   1. 고객 추가, 제거, 목록 출력
-   2. AWS RDS의 MySQL, HeidiSQL을 활용해 DB 작업.(고객 정보 관리)
-   3. Material-ui로 깔끔한 디자인 적용

> 알게 된 점:
>
> > -   props를 미친듯이 활용하자.
> > -   디자인 감이 더럽게 안올 때는 일단 material-ui를 적극 활용하자.
> > -   색감 못뽑아낼 때는 일단 FlatUIColors를 애용하자.
> > -   DBMS 등을 활용해 뭔가를 관리할 때는 해당 튜플을 삭제한다고 무작정 DELETE FROM~을 하기 보다, 애초에 테이블을 만들 때 삭제여부, 삭제일지 등을 확인할 수 있는 속성을 하나 추가해서 만들어서, 출력할 리스트 내에서는 보이지 않에 where절로 처리하고, 내 DB 내에서는 이 엔티티가 언제 삭제되었는지(탈퇴 등), 삭제된 상태인지 여부 등을 확인하는게 유지보수하고 로그 확인하기에 더 좋다.
> > -   AWS RDS를 처음 써봤는데 프리티어로 사용하면 돈 걱정도 거의 없고 일단 무엇보다도 처음 설정할때만 고생하고 나면 그 이후로는 구글 파이어베이스보다 더 친숙하다. 그냥 스프링에서 JDBC로 mariadb 연결해서 쓰던것 처럼 관리하면 됨.
> >
> > > 비용 안털리게 조심하기. 프로젝트 끝나면 일단 밑도끝도없이 뒤도 돌아보지 않고 해당 스토리지 제거하고 행복해지기

> > -   컴포넌트의 state나 props가 변경되는 경우 shouldComponentUpdate() 등이 사용되어 다시 render()를 불러와 뷰를 갱신한다.
> >
> > > 리액트는 이러한 상태의 변화를 알아서 감지하여 view를 재구성해준다.
