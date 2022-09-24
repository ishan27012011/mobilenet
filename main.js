previous_result= ""
function setup() {
  canvas = createCanvas(400, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet', modelLoaded)
}

function draw() {
image(video, 0, 0 ,400, 300) 
classifier.classify(video, gotResult) 
}

function modelLoaded() {
console.log("Mobile Net Has been loaded")
}

function gotResult(error, results) {
if (error) {
console.error(error)
}
else {if ((results[0].confidence> 0.5)&& (previous_result!=results[0].label))
{console.log(results)
previous_result=results[0].label;
synth= window.speechSynthesis;
speak_data= 'Object Dectected Is' + results[0].label;
utterThis= new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);

document.getElementById("result_object_name").innerHTML=results[0].label;
document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
}
}
}
