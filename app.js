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

//getData(url) 넘겨주기 
const newsFeed = getData(NEWS_URL);



const ul = document.createElement('ul');

window.addEventListener('hashchange', function () { //이벤트 hashchange라는 함수 실행 
  const id = location.hash.substr(1); //location 객체해시라는 속성으로 데이터 넘겨줌
  //substr() 쓰고싶은 위치값


  const newsContent = getData(CONTENT_URL.replace('@id', id))
  const title = document.createElement('h1');

  title.innerHTML = newsContent.title;

  content.appendChild(title); //div 안에 자식요소로 title
});

for (let i = 0; i < 10; i++) {
  //li와 a태그를 자식 요소로 담을 수 있는  innerHTML속성을 제공할 DOM
  const div = document.createElement('div');
  div.innerHTML = `
    <li>
      <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
  `;
  //div태그 안에 li태그만 사용 
  //첫번째자식요소 firstElementChild속성
  ul.appendChild(div.firstElementChild);
}

//root라는 div 안에 넣기  
container.appendChild(ul);
container.appendChild(content);
s