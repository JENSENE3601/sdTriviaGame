//GLOBAL VARIABLES
//===========================================
var trivia = {
  initialScreen: "",
  correctCounter: 0,
  inCorrectCounter: 0,
  unAnsweredCounter: 0,
  clickSound: new Audio("assets/sounds/button-click.mp3"),
  gameHTML: "",
  questionsArray: [
                  "In what year was South Dakota incorperated into the Union?", "What is the name of the highest mountains east of the Rockies located in SD?", "What is the largest city in South Dakota?", "The world's largest sculpture located in the Black Hills is?", "What is the population of South Dakota?", "What is South Dakota's state Flower?", "What city was second in voting to Pierre to become the state capital in 1889?", "What number State was South Dakota admitted to the Union?"],
  answerArray: [
                ["1880", "1869", "1902", "1889"], ["Appalachian", "Smokey", "Black Hills", "Sierra Nevada"], ["Rapid City", "Sioux Falls", "Sioux CIty", "Pierre"], ["Crazy Horse", "Mount Rushmore", "Devil's Tower", "Stone Mountain"], ["1.7 Million", "860,000", "950,000", "1.1 Million"], ["Geranium","Morning Glory","Phlox", "Pasque Flower"], ["Mitchell", "Yankton", "Sioux Falls", "Huron"], ["38th", "39th", "40th", "41st"]],
  correctAnswers: [
                  "D. 1889", "C. Black Hills", "B. Sioux Falls", "A. Crazy Horse", "B. 860,000", "D. Pasque Flower", "A. Mitchell", "C. 40th"],
  imageArray: [
              "<img class='center-block img-right' src='assets/images/1889.jpg'>", "<img class='center-block img-right' src='assets/images/2.jpg'>", "<img class='center-block img-right' src='assets/images/3.jpg'>", "<img class='center-block img-right' src='assets/images/4.jpg'>", "<img class='center-block img-right' src='assets/images/5.png'>", "<img class='center-block img-right' src='assets/images/6.jpg'>", "<img class='center-block img-right' src='assets/images/7.jpg'>", "<img class='center-block img-right' src='assets/images/8.jpg'>"],
  clock: "",
  questionCounter: 0,
  timeCounter: 20,
};


function startScreen(){
  trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Start!</a></p>";
  $(".main-area").html(trivia.initialScreen);
};

function timer(){
  trivia.clock = setInterval(twentySeconds, 1000);
  function twentySeconds(){
    if(trivia.timeCounter === 0){
      timeOutLoss();
      clearInterval(trivia.clock);
    }
    if(trivia.timeCounter > 0) {
      trivia.timeCounter --;
    }
    $(".timer").html(trivia.timeCounter);
  }
};

function wait(){
  if(trivia.questionCounter < 7) {
    trivia.questionCounter ++;
    generateHTML();
    trivia.timeCounter = 20;
    timer();
  }
  else {
    finalScreen();
  }
};

function win(){
  trivia.correctCounter ++;
  trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
  $(".main-area").html(trivia.gameHTML);
  setTimeout(wait, 4000);
};

function loss(){
  trivia.inCorrectCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 4000);
};

function timeOutLoss(){
  trivia.unAnsweredCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 4000);
};

function finalScreen(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".main-area").html(trivia.gameHTML);
};

function resetGame(){
  trivia.questionCounter = 0;
  trivia.correctCounter = 0;
  trivia.inCorrectCounter = 0;
  trivia.unAnsweredCounter = 0;
  trivia.timeCounter = 20;
  generateHTML();
  timer();
};

function generateHTML(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
  $(".main-area").html(trivia.gameHTML);
}


startScreen();

$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	trivia.clickSound.play();
	generateHTML();

	timer();
});

$("body").on("click", ".answer", function(event){
	trivia.clickSound.play();
  selectedAnswer = $(this).text();
	if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {

		clearInterval(trivia.clock);
		win();
	}
	else {

		clearInterval(trivia.clock);
		loss();
	}
}); 
$("body").on("click", ".reset-button", function(event){
	trivia.clickSound.play();
	resetGame();
});