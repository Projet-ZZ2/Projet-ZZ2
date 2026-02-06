import { Component } from '@angular/core';
import { Rule } from '../../model/rulesQuLiceModel';
import { VALIDATION_RULES } from '../../model/rulesQuLice'; 
import { OnInit } from '@angular/core';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qulicegame',
  standalone: true,  
  imports: [CommonModule], 
  templateUrl: './qulicegame.html',
  styleUrl: './qulicegame.css',
})
export class Qulicegame implements OnInit {
  validationRules: Rule[] = VALIDATION_RULES;

  ngOnInit(): void {
    // Combiner toutes les règles si besoin
    this.validationRules = [...this.validationRules];
  }
}
