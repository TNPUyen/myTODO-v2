import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pickedDate: Date = new Date();

  newTodoContent: string = '';
  owner!: string | null;
  todoDate: Date = new Date();

  selectedOption = 0;
  selectedTab = 0;
  
  labelsTodo=[
    {id: 0, label: 'All'},
    {id: 1, label: 'To do'},
    {id: 2, label: 'Done'},
  ]

  tabOptions = [
    {
      title: 'Personal',
      icon: 'archive-outline',
      link: 'personal',
    },
    {
      title: 'Official',
      icon: 'clipboard-outline',
      link: 'official',
    },
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.selectedTab);
    this.tabOptions.find(tab => {
      if (tab.link === this.router.url || this.router.url.includes(tab.link)) {
        this.selectedTab = this.tabOptions.indexOf(tab);
      }
    })
  }

  selectTab(index: number) {
    this.selectedTab = index;
    this.router.navigate([`dashboard/${this.tabOptions[index].link}`])
  }

  selectedOptionChange(index: number) {
    this.selectedOption = index;
  }

}
