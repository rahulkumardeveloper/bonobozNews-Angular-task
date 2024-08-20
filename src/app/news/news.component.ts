import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  newList: any[] = [];
  isShowSpinner: boolean = true;
  searchTerm: string = '';
  filteredList: any[] = [];
  isModalOpen = false; // Controls the modal visibility
  formGroup: FormGroup;
  page: number = 1;
  pageSize: number = 4;
  countryName: string = 'in';
  date: string = '2024-08-19';
  constructor(private newsService: AppService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      countryName: ['', Validators.required],
      // fromdate: ['', Validators.required],
      todate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadTopHeadlines(
      this.countryName,
      this.date,
      this.page,
      this.pageSize
    );
  }
  loadTopHeadlines(
    country: any,
    dateTime: string,
    page: number,
    pageSize: number
  ) {
    this.isShowSpinner = true;
    this.newsService
      .getTopHeadlines(country, dateTime, page, pageSize)
      .subscribe((data) => {
        this.isShowSpinner = false;
        this.newList = data.articles;
        this.filteredList = this.newList;
        console.log('data', this.newList);
      });
  }

  onSearch(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredList = this.newList.filter((article) =>
      article.title.toLowerCase().includes(searchTermLower)
    );
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  onSubmit() {
    if (this.formGroup.valid) {
      (this.countryName = this.formGroup.value.countryName),
        (this.date = this.formGroup.value.todate),
        this.closeModal(); // Close the modal after form submission
      this.loadTopHeadlines(
        this.countryName,
        this.date,
        this.page,
        this.pageSize
      );
    }
  }
  onChanges(event: any) {
    console.log(event.target.value);
    this.filteredList = this.newList.filter((element: any) => {
      return element.title.toLowerCase().includes(event.target.value);
    });
  }
  onPrev() {
    this.isShowSpinner = true;
    this.page -= 1;
    this.loadTopHeadlines(
      this.countryName,
      this.date,
      this.page,
      this.pageSize
    );
  }
  onNext() {
    this.isShowSpinner = false;
    this.page += 1;
    this.loadTopHeadlines(
      this.countryName,
      this.date,
      this.page,
      this.pageSize
    );
  }
}
