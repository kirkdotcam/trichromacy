let tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node-gpu');

let mongojs = require('mongojs');
// model setup
let model = tf.sequential();

// retrieve data through mongo
let db = mongojs('colors',['submissions'])
let submissionCollection = db.collection('submissions');

db.on('connect',()=> console.log("database connected"));
db.on('error', (err) => console.error(err));



submissionCollection.find(function(err, docs){
    modelsetup(docs.length)
    // console.log(docs);
    
    let data = docs.map((doc) => [doc.choices, Number(doc.correct)]);
    console.log("test1")
    let Xs = tf.tensor(data.map((observation) => observation[0]));
    let ys = tf.tensor(data.map((observation) => [[observation[1]],[observation[1]],[observation[1]]]));
    // let ys = tf.randomNormal([19,3,1])
    // Xs.print()
    // ys.print()

    console.log("premodel")
    model
        .fit(Xs,ys,{
            batchSize:docs.length
        })
        .then((info)=>{
            console.log("postfit");
            
            // console.log(info.history);
            
            let newdata =tf.tensor([[[31,83,163],[138,77,157],[199,131,60]]]);
            // console.log(newdata);
            
            console.log("newprediction");
            
            model.predict(newdata).print()
        })
        .catch(err => console.log("my error",err))
        .then(()=>{
            model.save("file://./box") // should change this to hook into mongo/storage on a server route.
            .catch((err)=>{
                console.log(err);
                process.exit();
            });
            process.exit();
        })

})

function modelsetup(batchSize) {

    model.add(tf.layers.dense({
        inputShape:[3,3],
        batchSize:batchSize, //number of samples to use?
        units:3,
        activation:'softmax'
    }))
    
    model.add(tf.layers.dense({
        units:3,
        activation:'sigmoid'
    }))
    
    model.add(tf.layers.dense({
        units:1,
        activation:"sigmoid"
    }))
    
    model.compile({
        optimizer: 'sgd',
        loss:'meanSquaredError',
        metrics:['accuracy']
    })
    model.summary();

}