import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/class/publication';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  publications: Publication[] = [];
  currentPage: number = 1;
  pageSize: number = 3;
  totalItems: number = 0;
  selectedPublication: Publication | null = null;
  isCreating: boolean = false;
  isEditing: boolean = false;
  commentText: string = '';
  commentForm: FormGroup;
  lstComments: any[] = [];
  showAddComment:boolean =false;
  likedPublications: number[] = [];
  likedComments: number[] = [];
  isLiked: { [key: number]: boolean } = {};






  constructor(private publicationService: PublicationService,     private formBuilder: FormBuilder
    ) {
      this.commentForm = this.formBuilder.group({
        commentText: ['', Validators.required]
      });

     }

  ngOnInit(): void {
    this.loadPublications();
    this.initCommentForm();

  }

  loadPublications() {
    this.publicationService.getPub()
      .subscribe(publications => {
        this.publications = publications;
        this.totalItems = publications.length;
        for(let i=0 ; i<publications.length; i++){
          this.publicationService.getPublicationsByParentId(publications[i].id)
          .subscribe((data:any) => {
            publications[i].lstComments= data
          });

        }
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadPublications();
  }
  
  initCommentForm() {
    this.commentForm = this.formBuilder.group({
      commentText: ['', Validators.required]
    });
  }
  

  

  

  createPublication(publication: Publication) {
    publication.datePublication = new Date();
    this.publicationService.createPublication(publication)
      .subscribe(createdPublication => {
        if (createdPublication) {
          this.publications.unshift(createdPublication);
        }
        this.isCreating = false;
      });
  }

  addCommentaire(publication: Publication , parent:any) {
    publication.datePublication = new Date();

    publication.parentId=parent.id
    publication.parent=parent
    this.publicationService.createPublication(publication)
      .subscribe(createdPublication => {
        if (createdPublication) {
          this.publications.unshift(createdPublication);
        }
        this.showAddComment = false;
        this.loadPublications()
      });

      
  }

  onAddComment(){
    this.showAddComment=true
  }

  

  updatePublication(publication: Publication) {
    if (this.selectedPublication) {
      this.publicationService.updatePublication(publication)
        .subscribe(updatedPublication => {
          const index = this.publications.findIndex(p => p.id === updatedPublication.id);
          if (index !== -1) {
            this.publications[index] = updatedPublication;
          }
          this.selectedPublication = null;
          this.isEditing = false;
          this.loadPublications()

        });
    }
  }

  // updatePublication(publication: Publication) {
  //   if (this.selectedPublication) {
  //     const username: string | null = localStorage.getItem('username');
  //           console.log("username" , username);
  //           console.log("auteur", this.selectedPublication.auteur);

  //     if (this.selectedPublication.auteur === username) { 
  //       this.publicationService.updatePublication(publication)
  //         .subscribe(updatedPublication => {
  //           const index = this.publications.findIndex(p => p.id === updatedPublication.id);
  //           if (index !== -1) {
  //             this.publications[index] = updatedPublication;
  //           }
  //           this.selectedPublication = null;
  //           this.isEditing = false;
  //           this.loadPublications();
  //         });
  //     } else {
  //       console.log("seul l auteur ...");
  //     }
  //   }
  // }
  
  

  addComment(publicationId: number) {
    const commentText = this.commentForm.get('commentText')?.value;
    if (commentText) {
      this.publicationService.addComment(publicationId, commentText)
        .subscribe((updatedPublication) => {
          const publicationIndex = this.publications.findIndex(p => p.id === publicationId);
          if (publicationIndex !== -1) {
            this.publications[publicationIndex] = updatedPublication;
            this.commentForm.reset();
          }
        });
    }
  }

  
  
  showComments(publicationId: number) {
    this.publicationService.getPublicationsByParentId(publicationId)
      .subscribe((data:any) => {
        this.lstComments= data
      });
  }
  
  
  

  deletePublication(publicationId: number) {
    this.publicationService.deletePublication(publicationId)
      .subscribe(() => {
        this.publications = this.publications.filter(p => p.id !== publicationId);

      });


  }

  isCurrentUserAuthor(auteurId: string): boolean {
    const currentUser = localStorage.getItem('userId');
    return currentUser === auteurId;
  }
  
  likePublication(publicationId: number) {
    const userId = localStorage.getItem('userId');
    const likedPublications: number[] = this.publicationService.getLikedPublications();
  
    if (likedPublications.includes(publicationId)) {
      this.unlikePublication(publicationId);
      return;
    }
  
    this.publicationService.likePublication(publicationId, userId)
      .subscribe(() => {
        console.log('Publication ...');
        this.isLiked[publicationId] = true;
        const publication = this.publications.find(p => p.id === publicationId);
        if (publication) {
          publication.likes++;
        }
        
      
      
        this.publicationService.storeLikedPublication([publicationId]);
      }, (error) => {
        console.error('erreur', error);
      });
  }
  
  unlikePublication(publicationId: number) {
    const userId = localStorage.getItem('userId');
    const likedPublications: number[] = this.publicationService.getLikedPublications();
    
  
    if (!likedPublications.includes(publicationId)) {
      console.log('Publication non.');
      return;
    }
  
    this.publicationService.unlikePublication(publicationId, userId)
      .subscribe(() => {
        console.log('Publication ..');
        this.isLiked[publicationId] = false;
        const publication = this.publications.find(p => p.id === publicationId);
        if (publication && publication.likes > 0) {
          publication.likes--;
        }
        this.publicationService.removeLikedPublication(publicationId);
      }, (error) => {
        console.error('erreur :', error);
      });
  }
  
  
// likeComment(publicationId: number) {
  //   if (this.likedComments.includes(publicationId)) {
  //     this.unlikePublication(publicationId);
  //   } else {
  //     this.publicationService.likePublication(publicationId)
  //       .subscribe(() => {
  //         const comment = this.publications.find(p => p.id === publicationId);
  //         if (comment) {
  //           comment.likes++;
  //         }
  //         this.likedComments.push(publicationId);
  //       });
  //   }
  // }

  // unlikeComment(publicationId: number) {
  //   this.publicationService.unlikeComment(publicationId)
  //     .subscribe(() => {
  //       const comment = this.publications.find(p => p.id === publicationId);
  //       if (comment) {
  //         comment.likes--;
  //       }
  //       this.likedComments = this.likedComments.filter(id => id !== publicationId);
  //     });
  // }
  

  toggleCreateMode() {
    this.selectedPublication = null;
    this.isCreating = !this.isCreating;
  }

  toggleEditMode(publication: Publication) {
    this.selectedPublication = { ...publication };
    this.isEditing = true;
  }

  cancelEdit() {
    this.selectedPublication = null;
    this.isEditing = false;
  }
}
