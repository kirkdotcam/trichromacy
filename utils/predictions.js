// let tf = require('@tensorflow/tfjs-node-gpu');
let tf = require('@tensorflow/tfjs');
let mongojs = require('mongojs')
// model setup
let model = tf.sequential();

model.add(tf.layers.dense({
    inputShape:[3,3],
    batchSize:19, //number of samples to use?
    units:6,
    activation:'linear'
}))

model.add(tf.layers.dense({
    units:6,
    activation:'linear'
}))

model.add(tf.layers.dense({
    units:1,
    activation:'linear'
}))

model.compile({
    optimizer: 'sgd',
    loss:'meanSquaredError',
    metrics:['accuracy']
})
model.summary();

// retrieve data through mongo
let db=mongojs('colors',['submissions'])

db.on('connect',()=> console.log("database connected"));
db.on('error', (err) => console.error(err));

let submissionCollection = db.collection('submissions');

submissionCollection.find(function(err, docs){
    // console.log(docs);
    // TODO: Let's vectorize each individual choice (or color) instead of keeping all one tensor

    let data = docs.map((doc) => [doc.choices,+doc.correct]);
    let Xs = tf.tensor(data.map((observation) => observation[0]));
    let ys = tf.tensor(data.map((observation) => observation[1]));
    Xs.print()
    ys.print()
    // tf.stack(Xs).print()
 

    model
        .fit(Xs,ys,{
        // .fit(undata,labels,{
            batchSize:19
        })
        .catch(err => console.log("my error",err))
        .then((info)=>{
            console.log(info.history);
            
            // let newdata =[tf.tensor([[31,83,163],[138,77,157],[199,131,60]])]
            // console.log(tf.tensor(newdata));
            
            // model.predict(tf.tensor(newdata,[1,2])).print()
        })

})