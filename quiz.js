var answers = [];
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, chE;
var questions = [
  ["Cómo se llama un modo de transportación con cuatro ruedas?", "Coche", "Auto", "Carro", ""],
  ["Cómo se llama algo que lleva cuando hace frio?", "Campera", "Casca", "Saco", "Chaqueta"],
  ["Cómo se llama el aparato donde uno pone comida?", "Nevera", "Heladera", "Refrigerador", "Refrigeradora"],
  ["Cómo se llama al postre que se come en fiestas?", "Pastel", "Queque", "Ponqué", "Torta"],
  ["Cómo se llama una enfermedad con estornudos y secreción nasal?", "Gripa", "Resfrío", "Resfriado", "Gripe"]
];

var rioplat_questions = [
  ["Cómo se llama granos de maíz inflados?", "Pochoclo", "Pop", "Pororó", "Canchita"],
];
var norte_questions = [
  ["Cómo se llama granos de maíz inflados?", "Cotufas", "Crispetas", "Maíz pira", "Gallitos"],
];
var centro_questions = [
  ["Cómo se llama granos de maíz inflados?", "Canchita", "Pipoca", "Pororó", "Canguil"]
];
var chile_questions = [
  ["Chile, no?", "Sí", "No", "Es posible", ""]
];

questions_dict = {
  'Argentina': rioplat_questions,
  'Paraguay': rioplat_questions,
  'Uruguay': rioplat_questions,
  'Colombia': norte_questions,
  'Venezuela': norte_questions,
  'Peru': centro_questions,
  'Ecuador': centro_questions,
  'Bolivia': centro_questions,
  'Chile': chile_questions,
};

sort_dict = {
  'Argentina': 'rioplat',
  'Paraguay': 'rioplat',
  'Uruguay': 'rioplat',
  'Colombia': 'norte',
  'Venezuela': 'norte',
  'Peru': 'centro',
  'Ecuador': 'centro',
  'Bolivia': 'centro',
  'Chile': 'chile',
};

function finalcalc(region, answers){
  if (region == 'rioplat') {
    if (answers == 'A'){
      return 'Argentina'
    }
    else if (answers == 'B') {
      return 'Uruguay'
    }
    else if (answers == 'C') {
      return 'Uruguay'
    }
    else {
      return 'Paraguay'
    }
  }
  if (region == 'centro') {
    if (answers == 'A'){
      return 'Peru'
    }
    else if (answers == 'B') {
      return 'Bolivia'
    }
    else if (answers == 'C') {
      return 'Bolivia'
    }
    else {
      return 'Ecuador'
    }
  }
  if (region == 'norte') {
    if (answers == 'A'){
      return 'Venezuela'
    }
    else if (answers == 'B') {
      return 'Colombia'
    }
    else if (answers == 'C') {
      return 'Colombia'
    }
    else {
      return 'Venezuela'
    }
  }
  if (region == 'chile') {
    return 'Chile'
  }
}

function _(x) {
  return document.getElementById(x);
}
function calculateRegion(answers){
  var argentina = [{A:0, B:3, C:0}, {A:4, B:0, C:0, D:0}, {A:0, B:3, C:0, D:0}, {A:0, B:0, C:0, D:1},
     {A:0, B:4, C:0, D:2}];

  var paraguay = [{A:0, B:3, C:0}, {A:4, B:0, C:0, D:0}, {A:0, B:3, C:0, D:0}, {A:0, B:0, C:0, D:1},
     {A:0, B:0, C:0, D:3}];
  var uruguay = [{A:0, B:3, C:0}, {A:4, B:0, C:0, D:0}, {A:0, B:3, C:0, D:0}, {A:0, B:0, C:0, D:1},
     {A:0, B:3, C:0, D:3}];

  var chile = [{A:0, B:3, C:0}, {A:0, B:0, C:2, D:2}, {A:0, B:0, C:3, D:0}, {A:0, B:0, C:0, D:1},
     {A:0, B:3, C:2, D:0}];

  var bolivia = [{A:0, B:0, C:3}, {A:0, B:0, C:2, D:2}, {A:0, B:3, C:0, D:0}, {A:0, B:4, C:0, D:0},
     {A:0, B:4, C:2, D:0}];
  var ecuador = [{A:0, B:0, C:3}, {A:0, B:0, C:2, D:2}, {A:2, B:0, C:2, D:4}, {A:0, B:0, C:0, D:1},
     {A:0, B:0, C:0, D:3}];
  var peru = [{A:0, B:0, C:3}, {A:0, B:4, C:0, D:0}, {A:0, B:0, C:3, D:0}, {A:0, B:4, C:0, D:1},
     {A:0, B:0, C:1, D:3}];

  var venezuela = [{A:0, B:0, C:3}, {A:0, B:0, C:2, D:2}, {A:3, B:0, C:0, D:0}, {A:0, B:0, C:0, D:1},
     {A:0, B:0, C:0, D:3}];
  var colombia = [{A:0, B:0, C:3}, {A:0, B:0, C:2, D:2}, {A:3, B:0, C:0, D:0}, {A:0, B:0, C:4, D:1},
     {A:4, B:0, C:0, D:1}];

  var my_list = [argentina, paraguay, uruguay, chile, bolivia, ecuador, peru, venezuela, colombia];
  var my_names = ['Argentina', 'Paraguay', 'Uruguay', 'Chile', 'Bolivia', 'Ecuador', 'Peru', 'Venezuela', 'Colombia'];

  var greatest = 0;

  for (i=0; i < my_list.length; i++) {
    var counter = 0
    var region = my_list[i];
    for (j=0; j < 5; j++) {
      //console.log(region[j])
      //console.log(answers)
      counter += region[j][answers[j]]
    }
    if (counter >= greatest){
      greatest = counter
      return_number = i
    }
  }
  return (my_names[return_number])
}

// function calculateCityARG(answers){
//   var buenos_aires = [{A:4, B:0, C:0, D:0}];
//   var cordoba = [{A:3, B:0, C:0, D:0}];
//   var mendoza = [{A:3, B:0, C:0, D:0}];
//
//
//   var my_list = [buenos_aires, cordoba, mendoza];
//   var my_names = ['Buenos Aires', 'Córdoba', 'Mendoza'];
//
//   var greatest = 0;
//
//   for (i=0; i < my_list.length; i++) {
//     var counter = 0
//     var region = my_list[i];
//     for (j=0; j < region.length; j++) {
//       console.log(region[j])
//       console.log(answers)
//       counter += region[j][answers[j]]
//     }
//     if (counter >= greatest){
//       greatest = counter
//       return_number = i
//     }
//   }
//   return (my_names[return_number])
// }

function renderQuestion(quests, poss){
  test = _("test");
  _("test_status").innerHTML = "Question " + (pos + 1) + " of 6";
  //console.log('here')
  question = quests[poss][0];
  //console.log(question)
  chA = quests[poss][1];
  chB = quests[poss][2];
  chC = quests[poss][3];
  chD = quests[poss][4];
  test.innerHTML = "<h3>" + (question) + "</h3>";
  test.innerHTML += "<input type='radio' name='choices' value='A'> " + chA + "<br>";
  test.innerHTML += "<input type='radio' name='choices' value='B'> " + chB + "<br>";
  test.innerHTML += "<input type='radio' name='choices' value='C'> " + chC + "<br>";
  if (chD != ""){
    test.innerHTML += "<input type='radio' name='choices' value='D'> " + chD + "<br>";
  }
  test.innerHTML += "<br><button onclick='checkAnswer()'> Submit Answer </button>"
  //console.log('finished')
}

function examineRegionQuestion(poss, region){
  test = _("test");
  _("test_status").innerHTML = "Question " + (pos + 1) + " of " + 6;
  //console.log('here')

  new_pos = poss-5
  quests = questions_dict[region]
  question = quests[new_pos][0];
  //console.log(question)
  chA = quests[new_pos][1];
  chB = quests[new_pos][2];
  chC = quests[new_pos][3];
  chD = quests[new_pos][4];
  test.innerHTML = "<h3>" + (question) + "</h3>";
  test.innerHTML += "<input type='radio' name='choices' value='A'> " + chA + "<br>";
  test.innerHTML += "<input type='radio' name='choices' value='B'> " + chB + "<br>";
  test.innerHTML += "<input type='radio' name='choices' value='C'> " + chC + "<br>";
  if (chD != ""){
    test.innerHTML += "<input type='radio' name='choices' value='D'> " + chD + "<br>";
  }
  test.innerHTML += "<br><button onclick='checkAnswer()'> Submit Answer </button>"
  //console.log('finished')
}

function finalize_quiz(country) {
  test = _("test");
  _("test_status").innerHTML = "Hablas más similar a alguien de " + country + ".";
  test.innerHTML = "Gracias por tomar el quiz!"
}

function checkAnswer() {
  //alert("Ok, will do")
  choices = document.getElementsByName("choices");
  for (var i = 0; i < choices.length; i++){
    if (choices[i].checked) {
      //console.log('checked')
      choice = choices[i].value;
      //console.log('yooo')
      //console.log(choice)
    }
  }
  answers.push(choice)
  //console.log('answers')
  //console.log(answers)
  pos ++;
  if(pos == 5){
    var region = calculateRegion(answers);
    //alert('quiz over' + region)
    examineRegionQuestion(pos, region);
  }
  else if (pos == 6){
    //console.log('HERE')
    var region = calculateRegion(answers);
    region = sort_dict[region];
    //alert(region)
    city = finalcalc(region, answers.slice(5,));
    //console.log(answers.slice(5,))
    //alert('quiz actually over' + city)
    finalize_quiz(city);
    //alert('quiz over' + region)
    //examineRegionQuestion();
  }
  else {
    renderQuestion(questions, pos);
  }
}
window.addEventListener("load", function(){renderQuestion(questions, pos)}, false);
