(function(){
  const p={sound:"#00FF00",language:"#FF0000",vision:"#0000FF"};
  const s=document.documentElement.style;
  s.setProperty("--palette-sound",p.sound);
  s.setProperty("--palette-language",p.language);
  s.setProperty("--palette-vision",p.vision);
  document.documentElement.dataset.palette="tractography-rgb";
})();
