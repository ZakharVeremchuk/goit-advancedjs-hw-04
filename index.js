import{S as w,a as L,i as l}from"./assets/vendor-RTsT7IRe.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))g(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const y of o.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&g(y)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function g(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const f=new w(".gallery .image-link",{captionsData:"alt",captionDelay:250}),S="38994291-8fc9a2a1ed4020d28b7742733";let m,u;async function h(e){return m!==e?(m=e,u=1):u+=1,await L.get("https://pixabay.com/api/",{params:{key:S,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:u,per_page:15}}).then(t=>t.data)}function k(e){return`
    <li class="card">
      <a href="${e.largeImageURL}" class="image-link" target="_blank" rel="noopener">
        <img 
          src="${e.webformatURL}" 
          alt="${e.tags}"
          class="image"/>
      </a>
      <div class="info">
        <div class="likes">
          <p class="title">Likes</p>
          <p class="value">${e.likes}</p>
        </div>
        <div class="views">
          <p class="title">Views</p>
          <p class="value">${e.views}</p>
        </div>
        <div class="comments">
          <p class="title">Comments</p>
          <p class="value">${e.comments}</p>
        </div>
        <div class="downloads">
          <p class="title">Downloads</p>
          <p class="value">${e.downloads}</p>
        </div>
      </div>
    </li>
  `}function P(e,t){e.innerHTML=v(t)}function q(e,t){e.innerHTML+=v(t)}function v(e){return e.map(k).join("")}document.querySelector(".searchfield");const R=document.querySelector(".inputform"),r=document.getElementById("custom-loader"),n=document.querySelector(".load-more-button"),d=document.querySelector(".gallery"),c=document.getElementById("loading-message");let b="",p=0,i=0;R.addEventListener("submit",e=>{e.preventDefault();const t=e.target.elements.searchfield.value.trim();if(r.style.display="block",!t){r.style.display="none",l.warning({message:"Please enter a search query!",position:"topRight"}),c.style.display="none";return}b=t,c.style.display="block",d.innerHTML="",h(t).then(a=>{r.style.display="none",c.style.display="none",a.hits.length==0?(e.target.elements.searchfield.value="",l.error({message:"Sorry, there are no images mathcing your search query. Please try again!",position:"topRight"}),n.style.display="none"):(P(d,a.hits),f.refresh(),p=a.totalHits,i=a.hits.length,n.style.display=i<p?"block":"none")}).catch(()=>{r.style.display="none",c.style.display="none",n.style.display="none",l.error({message:"Something went wrong. Please try again later.",position:"topRight"})})});n.addEventListener("click",async()=>{event.preventDefault(),n.style.display="none",r.style.display="block";try{const e=await h(b);r.style.display="none",q(d,e.hits),f.refresh(),i+=e.hits.length,n.style.display=i<p?"block":"none",i==p&&l.info({message:"We are sorry, but you have reached the end of search results.",position:"topRight"});const t=d.querySelector(".card");if(t){const a=t.getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}}catch{n.style.display="none",r.style.display="none",l.error({message:"Something went wrong. Please try again later.",position:"topRight"})}});
//# sourceMappingURL=index.js.map
