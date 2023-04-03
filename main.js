function setup() {
  canvas = createCanvas
    (300, 300);
  
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
  }
  
  function modelLoaded() {
      console.log('Model Loaded!');
  }
  
  function draw() {
    image(video, 0, 0, 300, 300);
    //Coloque o código 'video' e 'gotResult' para classificar o vídeo por meio da função gotResult
    classifier.classify(video, gotResult);
  }
  var previousResult = '';
  
  function gotResult(error, results) {
    //Se um erro acontecer, mostre esse erro no console
    if (error) {
      console.error(error);

    //Use o código 'senão' em javascript
    } else {

      if((results[0].confidence > 0.5) && (previousResult != results[0].label)){
        
        previousResult = results[0].label;
        var synth = window.speechSynthesis;

        speakData = 'O objeto detectado é - '+results[0].label;
        var utterThis = new SpeechSynthesisUtterance(speakData);
        synth.speak(utterThis);
  //Utilize o código 'innerHTML' para alterar o conteúdo HTML
        document.getElementById("resultObjectName").innerHTML = results[0].label;
        document.getElementById("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(3);
      }
    }
  }
  