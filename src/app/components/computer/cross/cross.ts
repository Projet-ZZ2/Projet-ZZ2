import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cross',
  imports: [],
  templateUrl: './cross.html',
  styleUrl: './cross.css',
})
export class Cross {
  constructor(private router: Router) {}

  close(): void {
    this.router.navigate(['/desktop']);
  }
}
