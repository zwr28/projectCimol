// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
// create our questions
let questions = [
    {
        question : "Jika pelanggan mengeluhkan untuk kendala transaksi NGRS dan tidak muncul di aplikasi NGRS. Apa yang CHO lakukan?",
        imgSrc : "img/html.png",
        choiceA : "CHO melakukan eskalasi ke IT",
        choiceB : "CHO akan closing tiket langsung",
        choiceC : "CHO membiarkan case tersebut",
        correct : "A"
    },{
        question : "Apa yang dilakukan CHO ketika case network sinyal lemah tidak stabil sudah ada hasil dari tim Network ?",
        imgSrc : "img/css.png",
        choiceA : "Langsung menutup case tanpa konfirmasi ke pelanggan",
        choiceB : "Membiarkan case tersebut",
        choiceC : "Melakukan Callback untuk menginfokan hasil dari tim network",
        correct : "C"
    },{
        question : "Siapa yang menerima laporan koordinasi ketika ada case migrasi belum aktif ?",
        imgSrc : "img/js.png",
        choiceA : "OBC",
        choiceB : "Tim Network",
        choiceC : "IT",
        correct : "A"
    },{
        question : "CHO menggunakan aplikasi apa untuk melakukan ekseskusi refund <11k ?",
        imgSrc : "img/js.png",
        choiceA : "SPLUNK",
        choiceB : "INDIRA",
        choiceC : "DSC",
        correct : "C"
    },{
        question : "Ketika kondisi apa CHO melakukan koordinasi ke grapari mengenai case ganti kartu ?",
        imgSrc : "img/js.png",
        choiceA : "Jika pelanggan dianggap tidak valid untuk ganti kartu oleh CHO",
        choiceB : "Jika pelanggan sudah dianggap valid untuk ganti kartu oleh CHO",
        choiceC : "Jika CHO sudah menerima laporan dari agent ecare / IBC",
        correct : "B"
    },{
        question : "Kenapa CHO melakukan ekseskusi refund <11k ketika ada anomali sistem ?",
        imgSrc : "img/js.png",
        choiceA : "Karena di SPLUNK pilihannya ada Rp 11.000 saja",
        choiceB : "Karena sesuai SOP. Batas wewenang untuk eksekusi refund CHO Rp. 11.000",
        choiceC : "Karena di DSC tertera maksimal refund Rp. 11.000",
        correct : "B"
    },{
        question : "Apa kepanjangan dari CIMOL ?",
        imgSrc : "img/js.png",
        choiceA : "Complaint handlIng fOr Minimalis sOLution",
        choiceB : "Complaint handlIng fOr Minimum sOLution",
        choiceC : "Complaint handlIng fOr Maximum sOLution",
        correct : "C"
    },{
        question : "Penyanyi luar negeri yang suka sepeda’an ?",
        imgSrc : "img/js.png",
        choiceA : "Selena Gowes",
        choiceB : "Justin Bieber",
        choiceC : "Rihanna",
        correct : "A"
    },{
        question : "Buah apa yang paling kaya?",
        imgSrc : "img/js.png",
        choiceA : "Mangga",
        choiceB : "Mangga",
        choiceC : "Sri Kaya",
        correct : "C"
    },{
        question : "Siapa nama lengkap SPV CHO?",
        imgSrc : "img/js.png",
        choiceA : "Anjar Kesumaraharjo",
        choiceB : "Anjar Kusumaraharjo",
        choiceC : "Anjar Kesuma Raharjo",
        correct : "A"
    }
];
// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
start.addEventListener("click",startQuiz);
// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}
// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}
// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
// checkAnwer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}
// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/3.png" :
              (scorePerCent >= 50) ? "img/1.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
