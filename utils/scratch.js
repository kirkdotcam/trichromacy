let tf = require('@tensorflow/tfjs');
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


const undata = tf.randomNormal([19,3,3]);
const labels = tf.randomNormal([19,3,1]);

model
        // .fit(tf.stack(Xs),tf.stack(ys),{
        .fit(undata,labels,{
            epochs:5,
            batchSize:6
        })
        .catch(err => console.log("my error",err))
        .then((info)=>{
            console.log(info.history)
            // let newdata =[tf.tensor([[31,83,163],[138,77,157],[199,131,60]])]
            // console.log(tf.tensor(newdata));
            
            // model.predict(tf.tensor(newdata,[1,2])).print()
        })