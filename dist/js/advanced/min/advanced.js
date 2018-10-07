const apiKey="32ad11f7baf84533819d0089abe5c95c",apiSource="https://newsapi.org/v2/";var check,gitPath="/milestone-project-2";function getMenuItems(e){var t=new Array;console.log("Running..."),"local"==check?(console.log("IS Local"),$.getJSON("assets/data/menu.json",function(n){$.each(n,function(e,n){t.push(n)}),e(t)})):"server"==check&&(console.log("IS Server"),$.getJSON(`${gitPath}/assets/data/menu.json`,function(n){$.each(n,function(e,n){t.push(n)}),e(t)}))}function alphanumericsonly(e){var t=/([^A-Za-z0-9])/;t.test(e.value)&&(e.value=e.value.replace(t,""))}function sendPublisher(e,t){var n=`${apiSource}sources?&apiKey=${apiKey}`,a=new XMLHttpRequest;a.open("GET",n),a.send(),a.onreadystatechange=function(){4==this.readyState&&200==this.status&&t(JSON.parse(this.responseText))}}function addPublisher(e,t){sendPublisher(e,function(e){var n=e.sources;t(n)})}let sources,language,sort,search;window.location.pathname==gitPath+"/"||window.location.pathname==gitPath+"/index.html"?check="server":window.location.pathname==gitPath+"/advanced.html"?check="server":"/"==window.location.pathname||"/index.html"==window.location.pathname?check="local":"/advanced.html"==window.location.pathname&&(check="local"),$(window).scroll(function(){$(this).scrollTop()>300?$(".scrollTop").show():$(".scrollTop").hide()}),$(document).ready(function(){$("#loading").hide(),$(".scrollTop").hide();var e=$(".scrollTop");$(e).click(function(){return $("html, body").animate({scrollTop:0},800),!1}),$("button.nextButton").hide(),$("button.prevButton").hide()}),$(document).ready(function(){if("/"===window.location.pathname||"/index.html"===window.location.pathname){var e=[],t=[],n=document.getElementById("menuCountry"),a=document.getElementById("menuCategory");getMenuItems(function(o){var r=o[1],c=o[0];r.forEach(function(t){e.push(`<option selected value="${t.id}">${t.name}</option>`),n.innerHTML=e.join("")}),c.forEach(function(e){t.push(`<option value="${e.id}">${e.name}</option>`),a.innerHTML=t.join("")})})}else if("/advanced.html"===window.location.pathname){var o=[],r=[],c=document.getElementById("menuLanguages"),i=document.getElementById("menuSortBy");getMenuItems(function(e){var t=e[3];e[2].forEach(function(e){o.push(`<option id="menuCategoryItem" value="${e.id}">${e.name}</option>`),c.innerHTML=`${o}`}),t.forEach(function(e){r.push(`<option id="menuCategoryItem" value="${e.id}">${e.name}</option>`),i.innerHTML=`${r}`})})}});let multiple=[];var pageResultSearch,currentPageSearch=1,currentPageSizeSearch=100;function getEverythingInfo(e){document.getElementById("output").innerHTML="";var t=document.getElementById("totalResultsInfoSearch"),n=document.getElementById("output");function a(){$(".searchMenu").hide(),$("#loading").show(),$(".menu-header").css("background-color","#ffffff");var a=[],o=new Array;o.sortBy=sort,o.sources=sources,o.language=language,o.q=search,o.page=currentPageSearch,addThings(o,function(o){var r=o.articles;pageResultSearch=o.totalResults,e?e?pageResultSearch<currentPageSizeSearch?(currentPageSizeSearch=pageResultSearch,t.innerHTML="<strong>Results: </strong>"+currentPageSizeSearch+" / "+pageResultSearch):0==currentPageSizeSearch&&(currentPageSizeSearch=100,t.innerHTML="<strong>Results: </strong>"+currentPageSizeSearch+" / "+pageResultSearch):t.innerHTML="<strong>Results: </strong>"+currentPageSizeSearch+" / "+pageResultSearch:currentPageSizeSearch>pageResultSearch||pageResultSearch<=100?(currentPageSizeSearch=pageResultSearch,t.innerHTML="<strong>Results: </strong>"+currentPageSizeSearch+" / "+pageResultSearch):pageResultSearch>=100?(currentPageSizeSearch=100,t.innerHTML="<strong>Results: </strong>"+currentPageSizeSearch+" / "+pageResultSearch):currentPageSizeSearch<pageResultSearch&&(currentPageSizeSearch=pageResultSearch,t.innerHTML="<strong>Results: </strong>"+currentPageSizeSearch+" / "+pageResultSearch),r.forEach(function(e){var t=e.publishedAt,n=moment(t).format("DD/MM/YYYY"),o=e;null==o.urlToImage&&(o.urlToImage="assets/images/empty.png"),null==o.description&&(o.description="No Description"),null==o.content&&(o.content="Read More"),a.push(`<div class="article-post">\n                        <div class="row">\n                            <div class="col-md-3">\n                                <div class="picture">\n                                    <img alt="${o.title}" src="${o.urlToImage}"></img>\n                                </div>\n                            </div>\n                            <div class="col-md-9">\n                                <div class="article-text">\n                                    <div class="article-publish">\n                                        <div class="article-publisher">\n                                        <div class="publisher-name">\n                                            <strong>News Source:</strong> ${o.source.name}\n                                        </div>\n                                        <div class="published-time">\n                                        <strong>Date:</strong> ${n}\n                                        </div>\n                                    </div>\n                                    </div>\n                                    <div class="article-title">${o.title}</div>\n                                    <div class="article-description">${o.description}</div>\n                                    <div class="article-content"><a href="${o.url}" target="_blank">${o.content}</a></div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>`)}),0==r.length?n.innerHTML='<h1 class="no-articles" align="center">No Articles Found</h1>':n.innerHTML=a.join(""),t.innerHTML="<strong>Results: </strong>"+currentPageSizeSearch+" / "+pageResultSearch,$(".searchMenu").show(),$("#loading").hide(),$(".menu-header").css("background-color","#f7f7f7"),$("#totalResultsInfoSearch").show(),pageResultSearch<=100||currentPageSizeSearch<=100?$("button.prevButton").hide():$("button.prevButton").show(),pageResultSearch<=100||pageResultSearch==currentPageSizeSearch?$("button.nextButton").hide():$("button.nextButton").show()})}"navigation"!=e&&(currentPageSearch=1,sort=$("#menuSortBy option:selected").attr("value"),language=$("#menuLanguages option:selected").attr("value"),sources=$("#menuSourcesAdvanced option:selected").attr("value"),search=document.getElementById("adSearch").value,"many"==$("#menuSourcesAdvanced option:selected").attr("value")?sources==multiple?sources.toString():(sources=multiple).toString():sources=$("#menuSourcesAdvanced option:selected").attr("value")),e?a():"all"!=sources||search?""==sources&&0==multiple.length?window.location.href="advanced.html":a():($("#myModalTwo").modal("show").css("width","600px !important"),$(".modal-title").html("Please Try Again"),$(".modal-message").html("Choose at least a Source or use the Search"),n.innerHTML='<h1 class="no-articles" align="center">No Articles Found</h1>',$("button.nextButton").hide(),$("button.prevButton").hide(),$("#totalResultsInfoSearch").hide())}function sourceChange(e){var t=document.getElementById("checklist"),n=[];"many"==e.value&&($("#selectModalTwo").modal("show"),$(".modal-title").html("Choose Multiple Sources"),0==multiple.length&&null!=t&&addPublisher([],function(e){e.forEach(function(e){n.push(`<li class="multiple-item"><label>${e.name}</label><input type="checkbox" id="myCheck" value="${e.id}" onclick="checkBox(this)"></li>`),n.join(""),t.innerHTML=n.join("")})}))}function checkBox(e){var t=e.value;if(e.checked)multiple.push(t);else for(var n=0;n<multiple.length;n++)if(multiple[n]==t){var a=multiple.indexOf(t);multiple.splice(a,1)}}function prevSearch(){var e=document.getElementById("totalResultsInfoSearch");if(currentPageSearch>1){currentPageSearch--;var t=currentPageSizeSearch%100;currentPageSizeSearch-=0!=t?t:100,e.innerHTML="<strong>Results: </strong>"+currentPageSizeSearch+" / "+pageResultSearch,getEverythingInfo("navigation")}}function nextSearch(){var e=document.getElementById("totalResultsInfoSearch");pageResultSearch/100>1&&pageResultSearch>currentPageSizeSearch&&(currentPageSearch++,currentPageSizeSearch+=100,e.innerHTML="<strong>Results: </strong>"+currentPageSizeSearch+" / "+pageResultSearch,getEverythingInfo("navigation"),pageResultSearch-currentPageSizeSearch<0&&(currentPageSizeSearch=pageResultSearch,e.innerHTML="Results: "+currentPageSizeSearch+" / "+pageResultSearch))}function sendThings(e,t){var n,a=`${apiSource}everything?pageSize=100&`;"all"!=e.sources&&e.sources&&(a+=`sources=${e.sources}&`),"all"!=e.language&&e.language&&(a+=`language=${e.language}&`),e.sortBy&&(a+=`sortBy=${e.sortBy}&`),e.q&&(a+=`q=${e.q}&`),e.page>1&&(a+=`page=${e.page}&`),a+=`apiKey=${apiKey}`,(n=new XMLHttpRequest).open("GET",a),n.send(),n.onreadystatechange=function(){4==this.readyState&&200==this.status&&t(JSON.parse(this.responseText))}}function addThings(e,t){sendThings(e,function(e){t(e)})}$(document).ready(function(){document.getElementById("adSearch").value="",document.getElementById("output").innerHTML='<h1 class="no-articles" align="center">Search For Articles</h1>',$("button.nextButton").hide(),$("button.prevButton").hide()});gitPath="/milestone-project-2";function searchHeadline(){window.location.href="index.html"}function advancedSearch(){window.location.href="advanced.html"}$(document).ready(function(){!function(){if(window.location.pathname==gitPath+"/"||window.location.pathname==gitPath+"/index.html")var e=document.getElementById("menuSources");else window.location.pathname==gitPath+"/advanced.html"?e=document.getElementById("menuSourcesAdvanced"):"/"==window.location.pathname||"/index.html"==window.location.pathname?e=document.getElementById("menuSources"):"/advanced.html"==window.location.pathname&&(e=document.getElementById("menuSourcesAdvanced"));var t=[];t.push("<option selected value='all'>All Sources</option>"),t.push("<option value='many'>Multiple Sources</option>"),addPublisher([],function(n){n.forEach(function(n){t.push(`<option value="${n.id}">${n.name}</option>`),e.innerHTML=t.join("")})})}()});