const money = [
  { level: '15', amount: '1,000,000' },
  { level: '14', amount: '500,000' },
  { level: '13', amount: '250,000' },
  { level: '12', amount: '100,000' },
  { level: '11', amount: '50,000' },
  { level: '10', amount: '25,000' },
  { level: '9', amount: '16,000' },
  { level: '8', amount: '8,000' },
  { level: '7', amount: '4,000' },
  { level: '6', amount: '2,000' },
  { level: '5', amount: '1,000' },
  { level: '4', amount: '500' },
  { level: '3', amount: '300' },
  { level: '2', amount: '200' },
  { level: '1', amount: '100' },
];

new Vue({
  el: "#app",
  data: {
    money: money,
    questions: [],
    question: "",
    answers: [],
    index: 0
  },
  created: async function() {
    await fetch("https://opentdb.com/api.php?amount=15")
      .then(res => res.json())
      .then(data => this.questions = data.results);
    this.index = Math.floor(Math.random()*this.questions.length);
    this.question = this.questions[this.index];
    this.answers.push(this.question.correct_answer);
    this.answers.push(...this.question.incorrect_answers);
    //Apparently this is a way to shuffle arrays:
    this.answers.sort(() => Math.random() - 0.5);
    //Replace all quote words with an actual quote
    this.question.question = this.question.question.replace(/&quot;/g,"\"");
    this.question.question = this.question.question.replace(/&#039;/g,"'");
    this.answers = this.answers.map(arr => arr.replace(/&quot;/g,"\""));
    this.answers = this.answers.map(arr => arr.replace(/&#039;/g,"'"));
  }
});
