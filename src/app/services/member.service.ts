import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../class/member';
import { Position } from '../class/position';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private apiUrl = environment.urlBack + '/member/member';
  private apiUrluser = environment.urlBack + '/member/member/user';

  private getMemberUrl = environment.urlBack +'/member';

  private id = localStorage.getItem('userId');
  userId = Number(this.id);


  constructor(private httpClient: HttpClient) {}

  createMember(member: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/create`, member);
  }
  ajoutMember(member: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/ajoutMember`, member);
  }
  getMemberList(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.apiUrl}/members`)
      //.pipe(map((response) => response));
  }
  getTutorMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.apiUrl);
  }
  addNotification(notification: Notification): Observable<Notification> {
    return this.httpClient.post<Notification>(`${this.apiUrl}/create`, notification);
  }
  getById(memberId: any): Observable<Object> {
    return this.httpClient.get(`${this.getMemberUrl}/${memberId}`);
  }
  deleteMember(memberId: any) {
    return this.httpClient.delete(`${this.apiUrl}/delete/` + memberId);
  }
  getMemberById(memberId: number): Observable<Member> {
    return this.httpClient.get<Member>(`${this.apiUrl}/${memberId}`);
  }

  getMemberByUserId(userId: number): Observable<Member> {
    return this.httpClient.get<Member>(`${this.apiUrluser}/` + userId);
   
  }
  // testing

  createM(member: Member, file: File): Observable<any> {
    //return this.httpClient.post(`${this.createMuRL}`,member);

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('firstName', member.firstName.toString());
    formData.append('lastName', member.lastName.toString());
    formData.append('email', member.email.toString());
    formData.append('password', member.password.toString());
    formData.append('finalNote', '0.0');
    formData.append('gitLink', member.gitLink.toString());
    formData.append('driveLink', member.driveLink.toString());

    const req = new HttpRequest('POST', `${this.apiUrl}/addM`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.httpClient.request(req);
  }

  getApprenantMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(
      `${this.apiUrl}/apprenant`
    );
  }

  countnombreApprenantt(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/count/apprenant`);
  }
  getTuteurAcademique(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.apiUrl}/tuteuracademique` );
}
updateMember(memberId: any, member : Member): Observable<Object>{
  return this.httpClient.put(`${this.apiUrl}/${memberId}`, member);
}
getPositionmemberbycode(code :any): Observable<Member[]> {
  return this.httpClient.get<Member[]>(`${this.apiUrl}/${code}/members`);
}
getPositionmemberapprenantAide(): Observable<Position[]> {
  return this.httpClient.get<Position[]>(`${this.apiUrl}/apprenantPositionAide` );
}
getPositionmemberapprenantVerif(): Observable<Position[]> {
  return this.httpClient.get<Position[]>(`${this.apiUrl}/apprenantPositionVerif` );
}

getPositionmembertuteur(code :any): Observable<Position[]> {
  return this.httpClient.get<Position[]>(`${this.apiUrl}/${code}/tuteurPosition` );
}

}
