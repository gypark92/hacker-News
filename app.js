const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div'); //
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'; //@id값의 주소 

//중복되는 또는 반복되는 코드 하나로 만드는 방법!!!!! 

//코드반복 제거 ->함수로 만들기(코드를 묶는 단위)
function getData(url) { //결괏값이 다르기 때문에 입력은 url이라는 인자로 받음

  ajax.open('GET', url, false); //method ,url ,boolean(false동기 방식)
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
//getData(url) 넘겨주기 
const newsFeed = getData(NEWS_URL);
const newsList = [];

  newsList.push('<ul>');
  //목록화면
  for(let i = 0; i < 10; i++) {
    newsList.push(`
      <li>
        <a href="#${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);
  }
  
  newsList.push('</ul>');
  
  container.innerHTML = newsList.join('');
}

function newsDetail() { //이벤트 hashchange라는 함수 실행 
  const id = location.hash.substr(1); //location 객체해시라는 속성으로 데이터 넘겨줌
  //substr() 쓰고싶은 위치값
  const newsContent = getData(CONTENT_URL.replace('@id', id))

  //문자열 처리방식
  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#">목록으로</a>
    </div>
  `;
}

//화면이 전환해야할때 판단하여 해당화는 화면으로 전환
function router() {
// hash값 전제 가져오기 
  const routePath = location.hash;

  if (routePath === '') {//첫 진입일땐 뉴스피드
    newsFeed();
  } else {//뉴스목록 
    newsDetail();
  }
}
//화면의 전환 
window.addEventListener('hashchange', router);


//함수 호출 
router();