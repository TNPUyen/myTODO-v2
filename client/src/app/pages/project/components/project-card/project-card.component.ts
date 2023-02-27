import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuBag, NbMenuItem, NbMenuService, NB_WINDOW } from '@nebular/theme';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  items: NbMenuItem[] = [
    { title: 'Edit', icon: 'edit-outline' },
    { title: 'View detail', icon: 'info-outline' },
    { title: 'Delete', icon: 'trash-2-outline' },
  ]

  isPinned: boolean = false;

  constructor(private nbMenuService: NbMenuService, private router: Router) { }

  ngOnInit(): void {
    this.nbMenuService.onItemClick().subscribe((data: NbMenuBag) => {
      if (data.item.title === 'Edit') {
        this.openEditProjectDialog()
      } else if (data.item.title === 'View detail') {
        this.openViewDetailDialog();
      } else {
        this.openDeleteProjectDialog();
      }
    })
  }

  onPinned() {
    this.isPinned = !this.isPinned;
  }

  openEditProjectDialog() {

  }

  openViewDetailDialog() {
    this.router.navigate([`project/1/board`]);
  }

  openDeleteProjectDialog() {

  }
}
