import { Component} from '@angular/core';
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
  correctAnswers: number = 0;
  wrongAnswers: number = 0;

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
    const currentQuestion = this.currentQuestion;
    if (currentQuestion) {
        const userEnteredAnswer = this.userAnswer.trim();
        const correctAnswer = currentQuestion.antworten[0].option.trim();
        if (userEnteredAnswer === correctAnswer) {
            this.userAnswerBorder = '2px solid green'; 
            this.correctAnswers++;
        } else {
            this.userAnswerBorder = '2px solid red'; 
            this.wrongAnswers++;
        }
        currentQuestion.showAnswer = true;
    }
  }

  showResults(): void {
    this.message = `Correct Answers: ${this.correctAnswers}\nWrong Answers: ${this.wrongAnswers}`;
  }
}
