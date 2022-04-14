import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { posts } from './book'
@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookUrl = "http://localhost:3000/posts";

  constructor(private http: HttpClient) { }


  getbookbyid(bookid: string) {
    return this.http.get<posts>(this.bookUrl + "/" + bookid);
  }
  Createbook(book: posts): Observable<posts> {
    let httpheader = new HttpHeaders()
      .set('Content-Type', 'application/Json');
    let options = { headers: httpheader };
    return this.http.post<posts>(this.bookUrl, book, options);
  };
  Updatebooks(book: posts): Observable<number> {
    let httpheader = new HttpHeaders()
      .set('Content-Type', 'application/Json');
    let options = { headers: httpheader };
    return this.http.put<number>(this.bookUrl + "/" + book.id, book, options);
  };
  Deletebook(bookid: any): Observable<number> {
    let httpheader = new HttpHeaders()
      .set('Content-Type', 'application/Json');
    let options = { headers: httpheader };
    return this.http.delete<number>(this.bookUrl + "/" + bookid, options);
  };
  getBooksFromStore(): Observable<posts[]> {
    return this.http.get<posts[]>(this.bookUrl);
  }
  postAPIData(){
    return this.http.post('http://localhost:3000/posts', {"name" :"throughNode","email":"admin2@gmail.com","contact":12345678})
  }
}