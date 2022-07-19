const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';//@id값의 주소 


ajax.open('GET', NEWS_URL, false);//method ,url,boolean(false동기 방식)
ajax.send();

const newsFeed = JSON.parse(ajax.response);//객체로 바꾸기 
const ul = document.createElement('ul');

window.addEventListener('hashchange', function() {
  const id = location.hash.substr(1);//location 객체ㅔ 해시라는 속성으로 데이터 넘겨줌

  ajax.open('GET', CONTENT_URL.replace('@id', id), false);//@id
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement('h1');

  title.innerHTML = newsContent.title;

  content.appendChild(title);
});

for(let i = 0; i < 10; i++) {
  const li = document.createElement('li');
  const a = document.createElement('a');//a태그 만들기

  a.href = `#${newsFeed[i].id}`;// #hashchange안에 있는 함수가 각각 클릭 시 호출(hashEvent)
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

  li.appendChild(a);
  ul.appendChild(li);//ul 태그안에 자식요소 li태그 넣기
}

container.appendChild(ul);
container.appendChild(content);
