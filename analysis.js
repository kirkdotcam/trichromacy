const data = require('./dataWrangle.js');
var tf = require('@tensorflow/tfjs');

const a = tf.variable(tf.scalar(1))
const b = tf.variable(tf.scalar(1))
const c = tf.variable(tf.scalar(1))
//change these to appropriate shape and predict to matMul for projection

function predict(x, y, z) {
  return tf.tidy(() => {
    return a.mul(x)
    .add(b.mul(y))
    .add(c.mul(z));

  })
};

function loss(prediction, labels) {
  const err = prediction.sub(labels).square().mean();
  err.print()
  return err;
}

var numIterations = 200;
var learningRate = 0.01;
var optimizer = tf.train.sgd(learningRate);

function train(xs, ys, zs, solns, numIterations) {
  for (var i = 0; i < numIterations; i++) {
    optimizer.minimize(function () {
      var pred = predict(xs, ys, zs);
      return loss(pred, solns);
    })
  }
}

const reds = tf.tensor2d(data.colors.red);
const blues = tf.tensor2d(data.colors.blue);
const greens = tf.tensor2d(data.colors.green);
let corrects = tf.tensor2d(data.answers).transpose(); //wrong shape

function learning() {
  train(reds, greens, blues, corrects, numIterations);
}
learning();

// console.log(data);
