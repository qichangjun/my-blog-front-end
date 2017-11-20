import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { ShareModule } from '../share/share.module'
import { MainRoutingModule } from './main-routing.module';
import { CreateArticleDialogComponent } from './main/dialog/create-article-dialog/create-article-dialog.component';
import { MainService } from './main/main.service';
import { DeleteArticleDialogComponent } from './main/dialog/delete-article-dialog/delete-article-dialog.component';
import { TopicComponent } from './main/topic/topic.component';
import { ListComponent } from './main/list/list.component';
import { DeleteReplyDialogComponent } from './main/dialog/delete-reply-dialog/delete-reply-dialog.component';
import { TopicService } from './main/topic/topic.service';
import { UserComponent } from './main/user/user.component';
import { CreateArtComponent } from './main/create-art/create-art.component';
import { BlogManageComponent } from './main/blog-manage/blog-manage.component';
import { EditArticleComponent } from './main/edit-article/edit-article.component';
@NgModule({
  imports: [
    MainRoutingModule,
    ShareModule
  ],
  declarations: [MainComponent, CreateArticleDialogComponent, DeleteArticleDialogComponent, TopicComponent, ListComponent, DeleteReplyDialogComponent, UserComponent, CreateArtComponent, BlogManageComponent, EditArticleComponent],
  entryComponents:[CreateArticleDialogComponent,DeleteArticleDialogComponent,DeleteReplyDialogComponent],
  providers:[MainService,TopicService]
})
export class MainModule { }
