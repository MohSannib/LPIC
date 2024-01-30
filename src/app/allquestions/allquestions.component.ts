import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type QuestionType = 'short' | 'checkbox' | 'radio' | 'manual';

interface Answer {
  option: string;
  istRichtig: boolean;
  selected: boolean;
}

interface Question {
  frage: string;
  antworten?: Answer[];
  selectedAnswers?: Answer[];
  selectedAnswer: Answer | null;
  type: QuestionType;
  userAnswer: string;
  showAnswer: boolean;
  submitted: boolean; // New property to track submission
}

@Component({
  selector: 'app-allquestions',
  templateUrl: './allquestions.component.html',
  styleUrls: ['./allquestions.component.css']
})
export class AllquestionsComponent {
  questions: Question[] = [];
  currentIndex = 0;
  dataLoaded = false;
  userAnswer = '';
  userAnswerBorder = 'inherit';
  message = '';
  correctAnswers = 0;
  wrongAnswers = 0;

  constructor(private http: HttpClient) {}

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
          showAnswer: false,
          submitted: false // Initialize submitted property
        };
      });
      this.dataLoaded = true;
    });
  }

  toggleAnswer(event: MouseEvent, index: number): void {
    event.stopPropagation();
    const question = this.questions[index];
    question.showAnswer = true;
    if (question.antworten) {
      question.selectedAnswer = question.antworten.find(answer => answer.istRichtig) || null;
    }
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
      this.checkAnswer();
      this.userAnswer = '';
      this.userAnswerBorder = 'inherit';
      this.currentIndex--;
    }
  }

  checkAnswer(): void {
    const currentQuestion = this.currentQuestion;
    if (currentQuestion && currentQuestion.type === 'manual' && !currentQuestion.submitted) {
      const userAnswer = currentQuestion.userAnswer.trim();
      const correctAnswer = currentQuestion.antworten?.find(answer => answer.istRichtig)?.option?.trim(); // Find the correct answer
  
      if (correctAnswer !== undefined) {
        if (userAnswer !== '') { // Check if the user answer is not empty
          if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            this.correctAnswers++;
          } else {
            this.wrongAnswers++;
          }
        } else {
          this.wrongAnswers++; // Count empty user answer as wrong
        }
      }
  
      currentQuestion.submitted = true;
    }
  }
  
  

  getCorrectAnswer(question: Question): string {
    const correctAnswer = question.antworten?.find(answer => answer.istRichtig);
    return correctAnswer ? correctAnswer.option : '';
  }

  showResults(): void {
    this.checkAnswer();
    this.message = `Correct Answers: ${this.correctAnswers}\nWrong Answers: ${this.wrongAnswers}`;
  }

  calculateResults(): void {
    let correctQuestions = 0;
    let wrongQuestions = 0;
  
    this.questions.forEach(question => {
      if (question.type === 'manual') {
        if (question.userAnswer.trim() !== '') {
          correctQuestions++;
        } else {
          wrongQuestions++;
        }
      } else if (question.type === 'checkbox') {
        let allSelectedCorrect = true;
        let anySelected = false;
  
        if (question.selectedAnswers && question.selectedAnswers.length > 0) {
          anySelected = true;
  
          // Loop through selected answers
          for (const selectedAnswer of question.selectedAnswers) {
            const correctAnswer = question.antworten?.find(answer => answer.option === selectedAnswer.option);
            if (!correctAnswer || correctAnswer.istRichtig !== selectedAnswer.selected) {
              allSelectedCorrect = false;
              break; // Stop loop if any selected answer is incorrect
            }
          }
        }
  
        if (anySelected) {
          if (allSelectedCorrect) {
            correctQuestions++;
          } else {
            wrongQuestions++;
          }
        } else {
          wrongQuestions++; // Count unanswered checkbox questions as wrong
        }
      } else if (question.type === 'radio') {
        if (question.selectedAnswer?.istRichtig) {
          correctQuestions++;
        } else {
          wrongQuestions++;
        }
      }
    });
  
    this.correctAnswers = correctQuestions;
    this.wrongAnswers = wrongQuestions;
  }
  

  
  getRemainingQuestionsCount(type: QuestionType): number {
    return this.questions.filter(question => question.type === type && !question.showAnswer).length;
  }

  submitAnswer(): void {
    const currentQuestion = this.currentQuestion;
    let userAnswerTemp = '';

    if (currentQuestion) {
      userAnswerTemp = currentQuestion.userAnswer || '';

      if (currentQuestion.type === 'manual') {
        currentQuestion.userAnswer = this.userAnswer;
      } else if (currentQuestion.type === 'checkbox') {
        currentQuestion.selectedAnswers = currentQuestion.antworten?.filter(answer => answer.selected);
      }

      // Call checkAnswer after updating selectedAnswers
      this.checkAnswer();

      currentQuestion.userAnswer = userAnswerTemp;
    }
  }

  get currentQuestion(): Question | undefined {
    return this.questions[this.currentIndex];
  }
}
