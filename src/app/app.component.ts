import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { posts } from './book';
import { BookService } from './book.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // [x: string]: any;
  title = 'newPro';
  // controls!:FormControl;
  dataSaved = false;
  public allBooks!: Observable<posts[]>
  public bookForm!: FormGroup;
  bookiToUpdate: any;
  // book!:Book;
  // bookService: any;
  // formbuilder!:FormBuilder;

  // softBooks!: Observable<Book[]>;
  constructor(public bookservice: BookService,
    public formbuilder: FormBuilder) { }
  // bookForm = new FormGroup({
  //   name:new FormControl(''),
  //   email:new FormControl(''),
  //   contact:new FormControl('')

  // })
  // getsOfBooks(){
  //   // 
  //   this.allBooks=this.bookservice.getBooksFromStore();

  // }
  ngOnInit() {
    this.bookForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required]]
    });
    this.getsOfBooks();
    
    this.bookservice.postAPIData().subscribe((response)=>{
      console.log('response from post data is ', response);
    },(error)=>{
      console.log('error during post is ', error)
    });
  }
  onFormSubmit() {
    
    this.dataSaved = false;
    // this.allBooks = this.bookForm.value;
    let book=this.bookForm.value;
    // this.allBooks = of(this.bookForm.value);
    this.Createbook(book);
    this.bookForm.reset();
  }
  

  Createbook(book: posts) {
    // this.bookservice.Createbook(book).subscribe(book => {
    //      this.dataSaved = true;
    //        this.getsOfBooks();
    //    });
    if (this.bookiToUpdate == null) {
      this.bookservice.Createbook(book).subscribe(book => {
        this.dataSaved = true;
        this.getsOfBooks();
      }
      );
    } else {
      book.id = this.bookiToUpdate;
      this.bookservice.Updatebooks(book).subscribe(book => {
        this.dataSaved = true;
        this.getsOfBooks();
        this.bookiToUpdate = null;
      });
    }

      }
  
      booktoEdit(bookid:any){
    this.bookservice.getbookbyid(bookid).subscribe(book=>{
      this.bookiToUpdate=bookid;
      
      this.bookForm.controls['name'].setValue(book.name);
      this.bookForm.controls['email'].setValue(book.email);
      this.bookForm.controls['contact'].setValue(book.contact);
    });
  }
  booktoDelete(bookid:any){
    this.bookservice.Deletebook(bookid).subscribe(book=>{
      this.getsOfBooks();
    });
  }
  getsOfBooks() {
    this.allBooks = this.bookservice.getBooksFromStore();
    // this.bookService.getBooksFromStore().subscribe(books)=>this.softBooks=books);
  }
  
} 

