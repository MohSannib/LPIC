import { Component } from '@angular/core';
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
  selector: 'app-trainingmu',
  templateUrl: './trainingmu.component.html',
  styleUrls: ['./trainingmu.component.css']
})
export class TrainingmuComponent {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  showResult: boolean = false;
  correctAnswers: number = 0;
  wrongAnswers: number = 0;
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('assets/fragenmc.json').subscribe(data => {
      this.questions = data;
      this.initializeSelectedAnswers();
    });
  }

  initializeSelectedAnswers(): void {
    this.questions.forEach(question => {
      question.antworten.forEach(answer => answer.selected = false);
    });
  }

  showAnswer(question: Question, index: number): void {
    // Reset selected property for all answers in all questions
    this.initializeSelectedAnswers();

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

  showNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  showPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  endTest(): void {
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
  
    this.questions.forEach(question => {
      const correctAnswers = question.antworten.filter(answer => answer.istRichtig).length;
      const selectedCorrectAnswers = question.antworten.filter(answer => answer.selected && answer.istRichtig).length;
      const selectedWrongAnswers = question.antworten.filter(answer => answer.selected && !answer.istRichtig).length;
  
      if (selectedCorrectAnswers === correctAnswers && selectedWrongAnswers === 0) {
        this.correctAnswers++;
      } else if (selectedWrongAnswers > 0 || (selectedCorrectAnswers !== correctAnswers && selectedCorrectAnswers > 0)) {
        this.wrongAnswers++;
      }
    });
  
    this.showResult = true;
  }
}