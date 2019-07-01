let tf = require('@tensorflow/tfjs');
let mongojs = require('mongojs')


// model setup
let model = tf.sequential();

model.add(tf.layers.dense({
    units:6,
    inputShape:[3],
    activation:'relu'
}))

model.add(tf.layers.dense({
    units:6,
    activation:'relu'
}))

model.compile({
    optimizer: 'sgd',
    loss:'categoricalCrossentropy',
    metrics:['accuracy']
})


// retrieve data through mongo
db=mongojs('colors',['submissions'])

db.on('connect',()=> console.log("database connected"));
db.on('error', (err) => console.error(err));

let submissionCollection = db.collection('submissions');

submissionCollection.find(function(err, docs){
    // console.log(docs);
    data = docs.map((doc) => [tf.tensor(doc.choices), doc.bias, doc.correct])
    console.log(data);
    // model.fit
    // print accuracy
})