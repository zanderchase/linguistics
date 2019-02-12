from flask import Flask, render_template, request
from flask_bootstrap import Bootstrap
import random, copy

app = Flask(__name__)
Bootstrap(app)

original_qs = {
 #Format is 'question':[options]
 'Taj Mahal':['Agra','New Delhi','Mumbai','Chennai'],
 'Great Wall of China':['China','Beijing','Shanghai','Tianjin'],
 'Petra':['Ma\'an Governorate','Amman','Zarqa','Jerash'],
 'Machu Picchu':['Cuzco Region','Lima','Piura','Tacna'],
 'Egypt Pyramids':['Giza','Suez','Luxor','Tanta'],
 'Colosseum':['Rome','Milan','Bari','Bologna'],
 'Christ the Redeemer':['Rio de Janeiro','Natal','Olinda','Betim']
}

qs = copy.deepcopy(original_qs)


def shuffle(q):
 """
 This function is for shuffling
 the dictionary elements.
 """
 selected_keys = []
 i = 0
 while i < len(q):
  current_selection = list(q.keys())[i]
  if current_selection not in selected_keys:
   selected_keys.append(current_selection)
   i = i+1
 return selected_keys



@app.route('/')
def questions():
     qs_shuffled = shuffle(qs)
     for i in qs.keys():
         random.shuffle(qs[i])
     return render_template('linguistics.html', q = qs_shuffled, o = qs)

@app.route('/questions', methods=['POST'])
def question_answers():
    correct = 0
    for i in qs.keys():
        answered = request.form[i]
        if original_qs[i][0] == answered:
            correct = correct+1
    qs_shuffled = shuffle(qs)
    for i in qs.keys():
        random.shuffle(qs[i])
    return render_template('linguistics.html', q = qs_shuffled, o = qs)
 #return '<h1>Correct Answers: <u>'+str(correct)+'</u></h1>'

if __name__ == '__main__':

    app.run(debug=True)
