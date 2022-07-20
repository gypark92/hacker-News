const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div'); //
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'; //@id값의 주소 

//페이징구현 
//페이지말고 다른 것도 생길수 있기 때문에 객체만듬
const store = { //시작페이지 
  currentPage: 1,
};

function getData(url) { //결괏값이 다르기 때문에 입력은 url이라는 인자로 받음

  ajax.open('GET', url, false); //method ,url ,boolean(false동기 방식)
  ajax.send();

  return JSON.parse(ajax.response);
}
//newsfeed 
function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];


  //문자열로 하나의 틀을 만들어 놓고 데이터를 넣는 방식 
  //복잡도를 줄일 수 있음 
  let template = `
  <div class="container mx-auto p-4">
    <h1>Hacker News</h1>
    <ul>
      {{__news_feed__}}
    </ul>
    <div>
      <a href="#/page/{{__prev_page__}}">이전 페이지</a>
      <a href="#/page/{{__next_page__}}">다음 페이지</a>
    </div>
  </div>
`;

for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
      <li>
      <a href="#/show/${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);
  }
  //replace 내용을 교체 
  template = template.replace('{{__news_feed__}}', newsList.join(''));
  template = template.replace('{{__prev_page__}}', store.currentPage > 1 ? store.currentPage - 1 : 1);
  template = template.replace('{{__next_page__}}', store.currentPage + 1);
  
  container.innerHTML = template;
}

function newsDetail() { //이벤트 hashchange라는 함수 실행 
  const id = location.hash.substr(7); //location 객체해시라는 속성으로 데이터 넘겨줌
  //substr() 쓰고싶은 위치값
  const newsContent = getData(CONTENT_URL.replace('@id', id))

  //문자열 처리방식
  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
       <a href="#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
}

//화면이 전환해야할때 판단하여 해당화는 화면으로 전환
function router() {
  // hash값 전제 가져오기 
  const routePath = location.hash;

  if (routePath === '') { //첫 진입일땐 뉴스피드
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) { //구분하는 구조 
    //입력으로 주어지는 문자열을 찾아서 있다면 0이상 없다면 -1 

    //추출 문자열에서 페이지의 숫자값 (문자열을 숫자로) 
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else { //뉴스목록 
    newsDetail();
  }
}
//화면의 전환 
window.addEventListener('hashchange', router);


//함수 호출 
router();