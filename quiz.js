const quizData = [
  {
    question: "다음 중 우리나라 생명윤리법상 금지되는 행위가 아닌 것은?",
    type: "multiple",
    options: ["복제인간 생산", "유전자치료","인간유전정보 이용","체세포 핵이식"],
    answer: 1,
    explanation: "생명윤리법 제49조에 따르면 유전자 치료는 허용되고 있습니다."
  },


  {
    question: "유전자치료를 하고자 하는 의료기관은 법 제48조에 따라 보건복지부장관에게 신고하여야 합니다. 이와 관련된 법적 근거는 무엇인가요?",
    type: "multiple",
    options: [
      "의료법",
      "생명윤리 및 안전에 관한 법률",
      "보건의료서비스법",
      "실험동물보호법"
    ],
    answer: 1,
    explanation: "유전자치료에 대한 의료기관의 신고는 생명윤리 및 안전에 관한 법률 제48조에 따라 보건복지부장관에게 이루어져야 합니다."
  },
  
{
question: "한국에서 배아연구기관을 등록은 누구에게 등록해야하나요?",
type: "multiple",
options: ["보건복지부장관에게", "과학기술부장관에게", "식품의약품안전처장에게", "국회에"],
answer: 0,
explanation: "생명윤리법 제29조제2항에 따르면 잔여배아를 연구하려는 자는 보건복지부장관에게 배아연구기관으로 등록해야 합니다."
},

{
  question: "배아연구계획서의 승인 절차 중 세번째 절차는?",
  type: "multiple",
  options: [ "보건복지부장관의 승인","배아연구기관의 기관위원회 심의", "배아생성의료기관 기관위원회의 제공의향 확인", "배아생성의료기관 기관위원회의 제공심의에 의한 잔여배아 제공"],
  answer: 0,
  explanation: "배아연구계획서의 승인 절차는 배아연구기관의 기관위원회 심의, 배아생성의료기관 기관위원회의 제공의향 확인, 보건복지부장관의 승인, 배아생성의료기관 기관위원회의 제공심의에 의한 잔여배아 제공 순서로 이루어집니다."
  }
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;

function generateQuiz() {
  const currentQuestionData = quizData[currentQuestionIndex];
  quizContainer.innerHTML = '';

  const questionElement = document.createElement('div');
  questionElement.classList.add('quiz-question');
  questionElement.innerHTML = `<p>질문 ${currentQuestionIndex + 1}: ${currentQuestionData.question}</p>`;

  if (currentQuestionData.type === "multiple") {
    const optionsElement = document.createElement('div');
    optionsElement.classList.add('quiz-options');

    currentQuestionData.options.forEach((option, optionIndex) => {
      const optionLabel = document.createElement('label');
      optionLabel.innerHTML = `<input type="radio" name="question${currentQuestionIndex}" value="${optionIndex}"> ${option}`;
      optionsElement.appendChild(optionLabel);
    });

    questionElement.appendChild(optionsElement);
  } else if (currentQuestionData.type === "essay") {
    const essayInput = document.createElement('textarea');
    essayInput.setAttribute('rows', '4');
    essayInput.setAttribute('cols', '50');
    essayInput.setAttribute('placeholder', 'Write your answer here...');
    questionElement.appendChild(essayInput);
  }

  const submitButton = document.createElement('button');
  submitButton.classList.add('quiz-submit');
  submitButton.innerText = '정답 확인';
  submitButton.addEventListener('click', submitAnswer);
  questionElement.appendChild(submitButton);

  quizContainer.appendChild(questionElement);
}
function submitAnswer() {
  const currentQuestionData = quizData[currentQuestionIndex];

  if (currentQuestionData.type === "multiple") {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (selectedOption !== null) {
      const isCorrect = parseInt(selectedOption.value) === currentQuestionData.answer;
      if (isCorrect) {
        score++;
        showCorrectAnswer();
      } else {
        showIncorrectAnswer();
      }
    }
  }

  const explanationElement = document.createElement('div');
  explanationElement.classList.add('quiz-explanation');
  explanationElement.innerHTML = `<p> ${currentQuestionData.explanation}</p>`;
  quizContainer.appendChild(explanationElement);

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    const nextButton = document.createElement('button');
    nextButton.classList.add('quiz-next');
    nextButton.innerText = '다음 질문';
    nextButton.addEventListener('click', generateQuiz);
    quizContainer.appendChild(nextButton);
  } else {
    showResult();
  }
}

function showCorrectAnswer() {
  const correctAnswerElement = document.createElement('div');
  correctAnswerElement.classList.add('quiz-correct');
  correctAnswerElement.textContent = '정답!';
  quizContainer.appendChild(correctAnswerElement);
}

function showIncorrectAnswer() {
  const incorrectAnswerElement = document.createElement('div');
  incorrectAnswerElement.classList.add('quiz-incorrect');
  incorrectAnswerElement.textContent = '오답';
  quizContainer.appendChild(incorrectAnswerElement);
}


function showResult() {
  quizContainer.innerHTML = '';

  const resultElement = document.createElement('div');
  resultElement.classList.add('quiz-result');
  resultElement.innerHTML = `<p>당신의 점수는 총 ${quizData.length}점 중 ${score}점입니다.</p>`;
  quizContainer.appendChild(resultElement);

  const restartButton = document.createElement('button');
  restartButton.classList.add('quiz-restart');
  restartButton.innerText = '다시 시작하기';
  restartButton.addEventListener('click', restartQuiz);
  quizContainer.appendChild(restartButton);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  generateQuiz();
}

window.addEventListener('load', generateQuiz);
