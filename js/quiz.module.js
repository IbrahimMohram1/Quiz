export class Quiz {
  constructor(category, difficulty, amount) {
    this.category = category;
    this.difficulty = difficulty;
    this.amount = amount;
    this.score = 0;
  }

  async getQuizData() {
    let res = await fetch(
      `https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}`
    );

    let data = await res.json();
    console.log(data.results);

    return data.results;
  }
}
