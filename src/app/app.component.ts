import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NewsService } from './service/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit,OnInit{
  title = 'NewsAppAngular';
  public sources : any = [];
  public articles : any = [];
  public selectedNewsChannel:string="Top 10 trending news!"
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  constructor(private observer: BreakpointObserver,private cdr:ChangeDetectorRef,private newsService : NewsService) {}
  ngOnInit(): void {
this.newsService.getAllArticles()
.subscribe((res:any)=>{
  console.log(res);
  this.articles =  res.articles;
});
this.newsService.getAllSources()
.subscribe((res:any)=>{
  console.log(res);
  this.sources = res.sources;
})
  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true;

    this.observer.observe(['(max-width:787px)']).subscribe((res) => {
      if (res?.matches) {
        this.sideNav.mode = 'over';
        this.sideNav.close();
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    });
    this.cdr.detectChanges();
  }
  getSouces()
  {

  }

  searchSource(source:any)
  {
this.newsService.getArticlesById(source.id)
.subscribe((res:any)=>{
  this.articles = res.articles;
this.selectedNewsChannel = source.name;

})
  }
}
