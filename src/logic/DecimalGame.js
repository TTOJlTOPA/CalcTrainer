import findAllFactors from './findAllFactors';
import isNumber from './isNumber';
import CountdownTimer from './CountdownTimer';

const defaultMaxSumOperandValue = 20;
const defaultMaxMulOperandValue = 10;
const difficultyMultiplier = 0.1;
const initialTime = 5000;
const defaultTimeBonus = 5000;

class Game {
  constructor() {
    this.timer = new CountdownTimer();
  }

  begin() {
    this.difficulty = 0;
    this.generateInitialQuiz();
    this.timer.begin(initialTime);
  }

  generateInitialQuiz() {
    this.currentResult = Math.round(Math.random() * defaultMaxSumOperandValue);
    this.nextOperand = Math.round(Math.random() * defaultMaxSumOperandValue);
    this.operator = '+';
  }

  generateNextQuiz() {
    let operatorId = Math.random() * 4;

    if (operatorId < 1.0) {
      let factors = findAllFactors(this.currentResult);
      this.nextOperand = factors[Math.round(Math.random() * (factors.length - 1))];
      this.operator = '/';
    } else if (operatorId < 2.0) {
      let operand = Math.round(Math.random() * (1.0 + difficultyMultiplier * this.difficulty) * defaultMaxSumOperandValue);
      this.nextOperand = (this.currentResult - operand > 0) ? operand : this.currentResult;
      this.operator = '-'
    } else if (operatorId < 3.0) {
      this.nextOperand = Math.round(Math.random() * (1.0 + difficultyMultiplier * this.difficulty) * defaultMaxSumOperandValue);
      this.operator = '+';
    } else {
      this.nextOperand = Math.round(Math.random() * defaultMaxMulOperandValue);
      this.operator = '*';
    }
  }

  checkAnswer(answer) {
    if (!isNumber) {
      return false;
    }

    let result;
    switch(this.operator) {
      case '/':
        result = Math.round(this.currentResult / this.nextOperand);
        break;
      case '-':
        result = this.currentResult - this.nextOperand;
        break;
      case '*':
        result = this.currentResult * this.nextOperand;
        break;
      default:
        result = this.currentResult + this.nextOperand;
    }

    if (answer === result) {
      this.currentResult = result;
      this.generateNextQuiz();
      this.timer.addTime(defaultTimeBonus);
    }

    return answer === result;
  }
}

export default Game;