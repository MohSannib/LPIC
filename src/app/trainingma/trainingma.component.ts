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
  selector: 'app-trainingma',
  templateUrl: './trainingma.component.html',
  styleUrls: ['./trainingma.component.css']
})
export class TrainingmaComponent {
  
  questions: Question[] = [];
  currentIndex: number = 0;
  dataLoaded: boolean = false;
  userAnswer: string = '';
  userAnswerBorder: string = 'inherit';
  message: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('assets/fragenfillin.json').subscribe(data => {
      this.questions = data.map((question: any) => ({
        frage: question.frage,
        antworten: [{ option: question.antwort, istRichtig: true, selected: false }],
        selectedAnswer: null,
        showAnswer: false
      }));
      this.dataLoaded = true;
    });
  }

  get currentQuestion(): Question | undefined {
    return this.questions[this.currentIndex];
  }

  toggleAnswer(event: MouseEvent, index: number): void {
    const question = this.questions[index];
    question.showAnswer = true;
    question.selectedAnswer = question.antworten.find(answer => answer.istRichtig) || null;
    event.stopPropagation();
  }

  nextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.userAnswer = '';
      this.userAnswerBorder = 'inherit';
      this.currentIndex++;
    }
  }
  
  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.userAnswer = ''; 
      this.userAnswerBorder = 'inherit'; 
      this.currentIndex--;
    }
  }

  checkAnswer(): void {
    const currentQuestion = this.questions[this.currentIndex];
    const correctAnswer = currentQuestion.antworten.find(answer => answer.istRichtig)?.option.toLowerCase();

    if (this.userAnswer.toLowerCase() === correctAnswer) {
      this.userAnswerBorder = 'green';
      this.message = 'Correct Answer!';
    } else {
      this.userAnswerBorder = 'red';
      this.message = 'Wrong Answer!';
    }
  }

  showResults(): void {
    let correctAnswers = 0;
    let wrongAnswers = 0;

    for (const question of this.questions) {
      const correctAnswer = question.antworten.find(answer => answer.istRichtig)?.option.toLowerCase();
      if (this.userAnswer.toLowerCase() === correctAnswer) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    }

    this.message = `Correct Answers: ${correctAnswers}\nWrong Answers: ${wrongAnswers}`;
  }
}
