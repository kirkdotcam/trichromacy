// let tf = require('@tensorflow/tfjs-node-gpu');
let tf = require('@tensorflow/tfjs');
let mongojs = require('mongojs')
// model setup
let model = tf.sequential();

model.add(tf.layers.dense({
    inputShape:[2],
    units:6,
    activation:'relu'
}))

model.add(tf.layers.dense({
    units:6,
    activation:'relu'
}))

model.add(tf.layers.dense({
    units:1,
    activation:'relu'
}))

model.compile({
    optimizer: 'sgd',
    loss:'meanSquaredError',
    metrics:['accuracy']
})
// model.summary();

// retrieve data through mongo
let db=mongojs('colors',['submissions'])

db.on('connect',()=> console.log("database connected"));
db.on('error', (err) => console.error(err));

let submissionCollection = db.collection('submissions');

submissionCollection.find(function(err, docs){
    // console.log(docs);
    let data = docs.map((doc) => [tf.tensor(doc.choices),tf.tensor(doc.bias), tf.tensor1d([+doc.correct])]);

    let Xs = data.map((observation) => [observation[0], observation[1]]);
    let ys = data.map((observation) => observation[2]);
    console.log(Xs[0])
    
    
    model
        .fit(tf.stack(Xs),tf.stack(ys),{
            batchSize:2
        })
        .catch(err => console.log(err))
        .then(()=>{

            let newdata =[tf.tensor([[31,83,163],[138,77,157],[199,131,60]]),tf.tensor([6,9,13])]
            console.log(tf.tensor(newdata,[1,2]));
            
            model.predict(tf.tensor(newdata,[1,2])).print()
        })

})