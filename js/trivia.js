let mainForm = document.getElementById("send_question");
let containerQuestion = document.getElementById("question_container");
let div_btn_contain = document.getElementById("button_contain");
let paragraph = document.getElementById("text_question");
let BtnNextQ = document.getElementById("Btn_next_question");
let score_container = document.getElementById("score_container");
let question = [];
let Arraydisorder = [];
let answers = [];
let incorrect_answers = [];
let q = 0;
let score = 0 ;
let correct_value;
let number_question;
const urlAPI = e =>{
    e.preventDefault();
    let amount = document.getElementById("amount").value;
    number_question=amount;
    let category = document.getElementById("category").value;
    let difficulty = document.getElementById("difficulty").value;
    let type = document.getElementById("type").value;
    const API = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    fetchAPI(API);
}

const fetchAPI = async (urlAPI) =>{
    const response = await fetch(urlAPI);
    const result = await response.json();
    fillQuestions(result.results);
} 


const fillQuestions = (questionsAPI) =>{
    for (const key in questionsAPI) {
       question.push(questionsAPI[key].question)
       answers.push((questionsAPI[key].correct_answer));
       incorrect_answers.push(questionsAPI[key].incorrect_answers);
    }
    ocultar();
    showQuestion();
}

function ocultar(){
    document.getElementById("div_form").style.display = 'none';
}



const showQuestion = () => {
    let newArray = [];
    const div_question = document.createElement("div");
    const p_text_question = document.createElement("p");
    div_question.appendChild(p_text_question);
    p_text_question.innerText = question[q];
    p_text_question.classList.add("question_styles");
    p_text_question.classList.add("display_flex");
    p_text_question.classList.add("justify_content_center");
    p_text_question.classList.add("align_item_center");
    containerQuestion.appendChild(div_question);
    newArray.push(answers[q]);
    correct_value = answers[q];
    for (const key in incorrect_answers[q]) {
        newArray.push(incorrect_answers[q][key]);
    }
    Arraydisorder = desordenar(newArray);
    function desordenar(array){
        array = array.sort(function() {return Math.random() - 0.5});
        return array;
    }
    if(newArray.length === 4){  
        const option_1 = document.createElement("button");
        option_1.classList.add("button_position");
        option_1.classList.add("option_1_styles");
        option_1.classList.add("col-6");
        const option_2 = document.createElement("button");
        option_2.classList.add("button_position");
        option_2.classList.add("option_2_styles");
        option_2.classList.add("col-6");
        const option_3 = document.createElement("button");
        option_3.classList.add("button_position");
        option_3.classList.add("option_3_styles");
        option_3.classList.add("col-6");
        const option_4 = document.createElement("button");
        option_4.classList.add("button_position");
        option_4.classList.add("option_4_styles");
        option_4.classList.add("col-6");
        option_1.innerText = newArray[0];
        option_2.innerText = newArray[1];
        option_3.innerText = newArray[2];
        option_4.innerText = newArray[3];
        containerQuestion.appendChild(option_1);
        containerQuestion.appendChild(option_2);
        containerQuestion.appendChild(option_3);
        containerQuestion.appendChild(option_4);
        option_1.onclick = counter_score_1;
        option_2.onclick = counter_score_2;
        option_3.onclick = counter_score_3;
        option_4.onclick = counter_score_4;
    }else {
        const option_1 = document.createElement("button");
        option_1.classList.add("button_position");
        option_1.classList.add("option_1_styles_true_false");
        const option_2 = document.createElement("button");
        option_2.classList.add("button_position");
        option_2.classList.add("option_2_styles_true_false");
        option_1.innerText = newArray[0];
        option_2.innerText = newArray[1];
        containerQuestion.appendChild(option_1);
        containerQuestion.appendChild(option_2);
        option_1.onclick = counter_score_1;
        option_2.onclick = counter_score_2;
    }

    // BtnNextQ.classList.remove("display_none");
    // BtnNextQ.classList.add("button_position");
    // BtnNextQ.classList.add("buttonNexQ_styles");
    q++;
    if(q <= question.length){
        BtnNextQ.onclick = handleNextQuestion;
    }
    else{
        BtnNextQ.classList.add("display_none");
        showScore();
    }
}

const showScore = () =>{
    containerQuestion.classList.add("display_none");
    let final_result = (score/number_question)*100;
    if ( final_result >= 60 && final_result<100){
        score_container.innerHTML = 
        `<div class="display_flex justify_content_center align_items_center z_index size ">
            <h1 class="score_styles">SCORE: ${final_result}% &#128170</h1>
        </div>`
    }
    else if ( final_result === 100){
        score_container.innerHTML = 
        `<div class="display_flex justify_content_center align_items_center z_index size ">
            <h1 class="score_styles">SCORE: ${final_result}% &#127882</h1>
        </div>`
    }
    else{
        score_container.innerHTML = 
        `<div class="display_flex justify_content_center align_items_center z_index size ">
            <h1 class="score_styles">SCORE: ${final_result}% &#128553</h1>
        </div>`
    }
    
}

const counter_score_1 = () =>{
    if(correct_value === Arraydisorder[0]){
        score++
    }
    handleNextQuestion();
}
const counter_score_2 = () =>{
    if(correct_value === Arraydisorder[1]){
        score++
    }
    handleNextQuestion();
}
const counter_score_3 = () =>{
    if(correct_value === Arraydisorder[2]){
        score++
    }
    handleNextQuestion();
}
const counter_score_4 = () =>{
    if(correct_value === Arraydisorder[3]){
        score++
    }
    handleNextQuestion();
}

const handleNextQuestion = () =>{
    containerQuestion.innerHTML = " ";
    showQuestion();
}

mainForm.onsubmit = urlAPI;
