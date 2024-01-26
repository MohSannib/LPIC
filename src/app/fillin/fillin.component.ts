import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Question {
  frage: string;
  antworten: Answer[];
  selectedAnswer?: Answer | null;
  showAnswer: boolean;
}

interface Answer {
  option: string;
  istRichtig: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-fillin',
  templateUrl: './fillin.component.html',
  styleUrls: ['./fillin.component.css']
})
export class FillinComponent {
  questions: Question[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('assets/fragenfillin.json').subscribe(data => {
      this.questions = data.map((question: any) => ({
        frage: question.frage,
        antworten: [{ option: question.antwort, istRichtig: true, selected: false }],
        selectedAnswer: null,
        showAnswer: false
      }));
    });
  }

  toggleAnswer(event: MouseEvent, index: number): void {
    const question = this.questions[index];
    question.showAnswer = true;
    question.selectedAnswer = question.antworten.find(answer => answer.istRichtig) || null;
    event.stopPropagation();
  }
}
