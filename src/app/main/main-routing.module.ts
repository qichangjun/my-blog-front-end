import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { TopicComponent } from './main/topic/topic.component';
import { ListComponent } from './main/list/list.component';
import { UserComponent } from './main/user/user.component';
import { CreateArtComponent } from './main/create-art/create-art.component';
import { BlogManageComponent } from './main/blog-manage/blog-manage.component';
import { EditArticleComponent } from './main/edit-article/edit-article.component';

const routes:Routes = [
  // { path:'',redirectTo:'list',pathMatch:'full'},
  { path:'',component:MainComponent,children:[
    { path:'topic/:id',component:TopicComponent},
    { path:'list',component:ListComponent},
    { path:'createArt',component:CreateArtComponent},
    { path:'user/:userName',component:UserComponent},
    { path:'blogManage',component:BlogManageComponent},
    { path:'editArticle/:id',component:EditArticleComponent},
    { path:'',redirectTo:'list',component:ListComponent}
  ]},    
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class MainRoutingModule { }
