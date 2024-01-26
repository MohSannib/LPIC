import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Question {
  frage: string;
  antworten: Answer[];
  selectedAnswer?: Answer; // Define selectedAnswer property
}

interface Answer {
  option: string;
  istRichtig: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit {

  questions: Question[] = [];
  selectedAnswer: Answer | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('assets/fragenmc.json').subscribe(data => {
      this.questions = data;
      // Initialize selected property for each answer
      this.questions.forEach(question => {
        question.antworten.forEach(answer => answer.selected = false);
      });
    });
  }

  showAnswer(question: Question, index: number): void {
    // Reset selected property for all answers in all questions
    this.questions.forEach((q, i) => {
      if (i !== index) {
        q.antworten.forEach(answer => answer.selected = false);
      }
    });
  
    // Find and mark all correct answers for the current question
    question.antworten.forEach(answer => {
      if (answer.istRichtig) {
        answer.selected = !answer.selected; // Toggle selected property
      }
    });
  }
  
  
  
  

  getAnswerColor(answer: Answer): string {
    return answer.selected ? (answer.istRichtig ? 'green' : 'red') : 'black';
  }
}
