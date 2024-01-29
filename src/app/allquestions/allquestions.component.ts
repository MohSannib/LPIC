import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type QuestionType = 'short' | 'checkbox' | 'radio' | 'manual';

interface Question {
  frage: string;
  antworten?: Answer[]; 
  selectedAnswers?: Answer[];
  selectedAnswer?: Answer | null; 
  type: QuestionType;
  userAnswer?: string;
  showAnswer?: boolean;
}

interface Answer {
  option: string;
  istRichtig: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-allquestions',
  templateUrl: './allquestions.component.html',
  styleUrls: ['./allquestions.component.css']
})
export class AllquestionsComponent {
  questions: Question[] = [];
  currentIndex: number = 0;
  dataLoaded: boolean = false;
  userAnswer: string = '';
  userAnswerBorder: string = 'inherit';
  message: string = '';
  correctAnswers: number = 0;
  wrongAnswers: number = 0;

  constructor(private http: HttpClient) { }

  toggleAnswer(event: MouseEvent, index: number): void {
    const question = this.questions[index];
    question.showAnswer = true;
    if (question.antworten) {
      question.selectedAnswer = question.antworten.find(answer => answer.istRichtig) || null; // Make sure to allow null as a value
    }
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.http.get<any>('assets/fragenall.json').subscribe(data => {
      this.questions = data.map((question: any) => {
        const type: QuestionType = question.type;
        return {
          frage: question.frage,
          antworten: question.antworten,
          selectedAnswer: null,
          type: type,
          userAnswer: '',
          showAnswer: false
        };
      });
      this.dataLoaded = true;
    });
  }

  get currentQuestion(): Question | undefined {
    return this.questions[this.currentIndex];
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
      this.checkAnswer(); // تحقق من الإجابة قبل الانتقال
      this.userAnswer = ''; 
      this.userAnswerBorder = 'inherit'; 
      this.currentIndex--;
    }
  }
  
  checkAnswer(): void {
    const currentQuestion = this.questions[this.currentIndex];
    if (currentQuestion.selectedAnswer !== undefined) {
      if (currentQuestion.selectedAnswer && currentQuestion.selectedAnswer.istRichtig) {
        this.correctAnswers++;
      } else {
        this.wrongAnswers++;
      }
    }
  }

  getCorrectAnswer(question: Question): string {
    const correctAnswer = question.antworten?.find(answer => answer.istRichtig); 
    return correctAnswer ? correctAnswer.option : '';
  }

  showResults(): void {
    this.checkAnswer(); // تحقق من الإجابة الأخيرة قبل عرض النتيجة النهائية
    this.message = `Correct Answers: ${this.correctAnswers}\nWrong Answers: ${this.wrongAnswers}`;
  }
 
  calculateResults(): void {
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
  
    this.questions.forEach(question => {
      if (question.type === 'manual') {
        if (question.userAnswer?.trim() !== '') {
          this.correctAnswers++;
        } else {
          this.wrongAnswers++;
        }
      } else if (question.type === 'checkbox') {
        if (question.antworten?.some(answer => answer.selected && answer.istRichtig)) {
          this.correctAnswers++;
        } else {
          this.wrongAnswers++;
        }
      } else if (question.type === 'radio') {
        if (question.selectedAnswer?.istRichtig) {
          this.correctAnswers++;
        } else {
          this.wrongAnswers++;
        }
      }
    });
  }
  

  submitAnswer(): void {
    const currentQuestion = this.currentQuestion;
    let userAnswerTemp: string = ''; // استخدام القيمة الافتراضية
  
    if (currentQuestion) {
      // حفظ جواب المستخدم في المتغير المؤقت
      userAnswerTemp = currentQuestion.userAnswer || ''; // استخدام القيمة الافتراضية في حالة عدم توفر قيمة
  
      if (currentQuestion.type === 'manual') {
        currentQuestion.userAnswer = this.userAnswer;
      } else if (currentQuestion.type === 'checkbox') {
        currentQuestion.antworten?.forEach(answer => answer.selected = answer.selected);
      }
  
      // Check the answer immediately upon submission
      this.checkAnswer();
  
      // إعادة تعيين قيمة جواب المستخدم بعد التحديث
      currentQuestion.userAnswer = userAnswerTemp;
    }
  }
  
  
  
}
