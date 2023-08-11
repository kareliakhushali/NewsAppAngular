import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
 api_key ="ffc49b407b8a4429a44e71ee69a23371";

constructor(private http:HttpClient) { }

getAllSources()
{
  return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key);
}
getArticlesById(source:string)
{
  return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.api_key)

}
getAllArticles()
{
  return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.api_key);
}

}
