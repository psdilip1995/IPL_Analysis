function teamAnalysisDisplay(){
let teamDataGlobal ={};
d3.select("#left-top").style("height","58%");
d3.select("#left-bottom").style("height","38%");
currentColors = bgColorsTeam["ALL"];
headingColor = currentColors['headingColor'];
textInHeadingColor = currentColors['textInHeadingColor'];
btnMouseoverBGColor = currentColors['btnMouseoverBGColor'];
var teamAnalysisBtn = "teams-menubar-btn-all";
var selectedTeam = "ALL";
let onclickselect = null;
let teamDataAuction = null;
//Generate Map function
function generateMap(){
    var proj = d3.geo.mercator();
    var path = d3.geo.path().projection(proj);
		
    let mapClear = true;
		//console.log(d3.select("#left-top").attr("width"))
    var map = d3.select("#left-top").append("svg:svg")
        .attr("viewBox","30 -30 540 700")
        .call(initialize);

    var india = map.append("svg:g")
        .attr("id", "india");

    d3.json("/static/json/states.json", function (json) {

    var colors = [ "#2152CD", "#F76E0A","#BC1527", "#FEE953", "#19459F","#46007A", "#D7D7D7", "#EA1A85"];
    var teams = [ "MI", "SRH","RCB", "CSK", "DC","KKR", "KXIP", "RR"];

      var div = d3.select("body").append("div") 
                    .attr("class", "tooltip")       
                    .style("opacity", 0)
                    .style("position", "absolute")     
                    .style("text-align", "center")    
                    .attr("width", 60)          
                    .style("height", 20)         
                    .style("padding", 4)       
                    .style("font", 12)    
                    .style("background", "#b3d1ff") 
                    .style("color","#0052cc")
                    .style("border-style","solid")
                    .style("border-radius","30px")
                    .style("border-color","#0052cc")

      var units=india.selectAll("path")
                      .data(json.features)
                      .enter().append("path")  
                      .attr("d", path)
                      .style("fill",function(d){ return d["color"];})
                      .style("stroke","#A9A9A9")
                      .style("stroke-width","0.6px")
                      .style("opacity",function(d){if(d["supportTeam"]!=selectedTeam){if(selectedTeam == "ALL"){return 1;}else{return 0.2;}}else{return 1;}})	               
                      .on("mouseover", function(d) {
                        //console.log(selectedTeam)
                        d3.select(this)
                          .style("opacity",function(d){if(d["supportTeam"]!=selectedTeam){if(selectedTeam == "ALL"){return 0.6;}else{return 0.2;}}else{return 1;}}) 
                        /*Tooltip
                            .html("The exact value of<br>this cell is: " + d.value)
                          div.transition()    
                              .duration(200)    
                              .style("opacity", .9);  */ 
                              if(selectedTeam == "ALL"){
                                  div.style("opacity", .9);
                                  div.html(d["id"]+ "<br/>") 
                                  .style("left", (d3.event.pageX) + "px")   
                                  .style("top", (d3.event.pageY - 28) + "px");
                                  //d3.select("#")
                            }
                            else if(selectedTeam == d["supportTeam"]){
                                div.style("opacity", .9);
                                div.html(d["id"]+ "<br/>") 
                                  .style("left", (d3.event.pageX) + "px")   
                                  .style("top", (d3.event.pageY - 28) + "px");
                            }

                      })
                      .on("mouseout", function(d) {
                        if(selectedTeam == "ALL"){
                            d3.select(this)
                              .style("opacity","1")
                          }
                          div.style("opacity", 0); 
                      })
                      .on("click",function(d){
                        //console.log(selectedTeam);
                        if(selectedTeam == 'ALL'){
                          mapClear = false;
                          onclickselect = d["supportTeam"]
                          let k = d["supportTeam"]
                          india.selectAll("path").style("stroke-width","1px")
                            india.selectAll("path").style("stroke","#A9A9A9")
                          for(var i=0;i<8;i++){
                            //console.log(d["supportTeam"])
                            
                           // console.log(team +"hi")
                           d3.select(this)
                                .style("stroke","black") 
                           d3.select(this)
                                .style("stroke-width","3px") 
                           /* if(teams[i] == k){
                              console.log("hi")
                              d3.select(this)
                                      .style("opacity",function(d){if(d["supportTeam"]==teams[i]){return 1;}})
                            }*/
                            for(t in teams){
                              d3.select("#pie"+teams[t]).style("display","block");
                              d3.select("#pieImg"+teams[t]).style("opacity","1");
                            }
                            for(t in teams){
                              if(teams[t] != onclickselect){
                                d3.select("#pie"+teams[t]).style("display","none");
                                d3.select("#pieImg"+teams[t]).style("opacity","0");
                              }
                            }
                            d3.select("#teams-div-2").selectAll("*").remove();
                            d3.select("#teams-div-3").selectAll("*").remove();
                            d3.select("#teams-div-4").selectAll("*").remove();
                            putDiv2Data(teamDataGlobal);
                            putDiv3Data(teamDataGlobal);
                            putDiv4Data(teamDataGlobal);
                            if(teams[i] != k){
                              //console.log(team)                                                  
                                d3.select("#teams-div-1").select("#svg1").select("#rect"+teams[i]).style("opacity","0");
                                d3.select("#teams-div-1").select("#svg1").select("#text"+teams[i]).style("opacity","0");
                                india.style("stroke-width","1px");
                                india.style("stroke","#A9A9A9");
                                d3.select("#teams-div-1").select("#svg1").select("#rect"+d["supportTeam"]).style("opacity","1");
                                d3.select("#teams-div-1").select("#svg1").select("#text"+d["supportTeam"]).style("opacity","1");
                                //d3.select("#teams-div-2").select("#svg4").select("#rect1"+teams[i]).style("fill","grey").style("opacity","0");
                                //d3.select("#teams-div-2").select("#svg4").select("#rect1"+d["supportTeam"]).style("fill",d["color"]).style("opacity","1");
                                //console.log("hi")
                            }
                          }
                        }
                        //d3.select("#teams-div-1").select("#svg1").select("#rect"+d["supportTeam"]).style("fill",function(d){console.log(d);return "red"})//.selectAll(".bar").style("fill","red")
                        //console.log(d)
                      });

      function clearMapBrush(){
        india.selectAll("path").style("stroke-width","1px");
        india.selectAll("path").style("stroke","#A9A9A9");
        for(t in teams){
          d3.select("#pie"+teams[t]).style("display","block");
          d3.select("#pieImg"+teams[t]).style("opacity","1");
        }
        d3.select("#teams-div-2").selectAll("*").remove();
        d3.select("#teams-div-3").selectAll("*").remove();
        d3.select("#teams-div-4").selectAll("*").remove();
        onclickselect = null;
        putDiv1Data(teamDataGlobal);
        putDiv2Data(teamDataGlobal);
        putDiv3Data(teamDataGlobal);
        putDiv4Data(teamDataGlobal);
        //d3.select("#teams-div-1").select("#svg1").selectAll("rect").style("opacity","1");
      };

      map.on("click",function(){
        if(mapClear)
          clearMapBrush();
        mapClear = true;
      });

      for(var j = 1;j <= 8;j++){
            india.append('rect')
                .attr("x",450)
                .attr("y",300+(j*27))
                .attr("width",13)
                .attr("height",13)
                .style("fill",function(d){ return colors[j-1]});

           india.append('text')
                .attr("x",480)
                .attr("y",310+(j*27))
                .attr("width",13)
                .attr("height",13)
                .attr("font-size","16px")
                .text(teams[j-1]);
          }

          india.append('text')
                .attr("x",100)
                .attr("y",0)
                .attr("width",30)
                .attr("height",30)
                .attr("font-size","18px")
                .attr("font-weight","bold")
                .text("India Fandom Map showing State Wide supporting team");

    });

    function initialize() {
      proj.scale(6700);
      proj.translate([-1240, 720]);
    }
};

//Draw pie function
function drawPie(){
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    //var radius = Math.min(width, height) / 2 - margin
    var radius = 110;
    var logoXY = {
      "MI"  :[115,55], //[105,45],
      "SRH" :[-55,-20],
      "RCB" :[-35,94],//[-35,80],
      "CSK" :[40,120],//[37,98],
      "DC"  :[-20,-55],//[-30,-60],
      "KKR" :[83,-50],//[75,-50],
      "KXIP":[-65,35],//[-65,30],
      "RR"  :[12,-68]//[5,-70]
    };

    var svg = d3.select("#left-bottom")
      .append("svg")
      .attr("id","svg2")
      .attr("width", 400)
      .attr("height", 300)
      .append("g")
      .attr("transform", "translate(130,130)");


    $.post("/getPieData", {'data': 'received'}, function(data_pie){

      var pie = d3.pie()
        .value(function(d) {return d.value; })
      var data_ready = pie(d3.entries(data_pie['Likes ( In Millions )']))
      //console.log(data_pie['color'])

      var sum = data_pie['Likes ( In Millions )'].reduce(function(a, b){
        return a + b;
        }, 0);

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      var arc=d3.arc()
          .innerRadius(0)
          .outerRadius(radius)

       var en_arc=d3.arc()
          .innerRadius(0)
          .outerRadius(radius*1.15)

      var div = d3.select("body").append("div") 
                    .attr("class", "tooltip")       
                    .style("opacity", 0)
                    .style("position", "absolute")     
                    .style("text-align", "center")    
                    .attr("width", 60)          
                    .style("height", 20)         
                    .style("padding", 4)       
                    .style("font", 12)    
                    .style("background", "#b3d1ff") 
                    .style("color","#0052cc")
                    .style("border-style","solid")
                    .style("border-radius","30px")
                    .style("border-color","#0052cc")

var teams = [ "MI", "SRH","RCB", "CSK", "DC","KKR", "KXIP", "RR"];

      svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr("id",function(d,i){
          return "pie"+teams[i];
        })
        .style('fill', function(d,i){ if(teams[i]=="KXIP"){return "#D7D7D7";}if (i<=7){ return data_pie['color'][i]; }})
        .attr("stroke", "black")
        .style("stroke-width", "0px")
        .on("mouseover", function(d,i) {
                        d3.select(this)
                           .attr("stroke","white")          
			                     .attr("stroke-width","10px")
                           //.transition()
                           //.duration(50)
                           .attr("d", en_arc);

                          div .style("opacity", .9);
                          div.html((((data_pie['Likes ( In Millions )'][i]/sum)*100).toFixed(1))+"%"+ "<br/>") 
                             .style("left", (d3.event.pageX) + "px")   
                             .style("top", (d3.event.pageY - 28) + "px"); 
                        
                      })
                      .on("mouseout", function(d) {
                        d3.select(this)
                          .style("opacity","1")
                          .attr("d",arc)
                          div.style("opacity", 0); 
                      });


     svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('image')
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr("transform", function(d,i) {
          return "translate("+logoXY[data_pie['Team'][i]][0]+","+logoXY[data_pie['Team'][i]][1]+")"; 
        })
        .attr("x","-40")
        .attr("y","-40")
        .attr("id",function(d){ return "pieImg"+teams[d['data']['key']];})
        .attr('width', 25)
        .attr('height', 25)
        .attr("xlink:href", function(d,i){ return "/static/images/"+data_pie['Team'][i]+".png"});

        for(var j = 1;j <= 8;j++){
            svg.append('rect')
                .attr("x",180)
                .attr("y",-80+(j*20))
                .attr("width",10)
                .attr("height",10)
                .style("fill",data_pie['color'][j-1]);
          }

          for(var j = 1;j <= 8;j++){
            svg.append('text')
                .attr("x",205)
                .attr("y",-71+(j*20))
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","12px")
                .text(data_pie['Team'][j-1]);
          }

          svg.append('text')
                .attr("x",-70)
                .attr("y",140)
                .attr("width",30)
                .attr("height",30)
                .attr("font-size","16px")
                .attr("font-weight","bold")
                .text("Pie chart for audience likes to each team");

   });
};


function changeBGColorsByTeam(team){
  //console.log('selected team is '+team);
  currentColors = bgColorsTeam[team];
  //console.log(currentColors);
  headingColor = currentColors['headingColor'];
  textInHeadingColor = currentColors['textInHeadingColor'];
  btnMouseoverBGColor = currentColors['btnMouseoverBGColor'];
  d3.select("body").style("background-color",currentColors['bodyBackgroundColor']);
  d3.select("#heading").style("background-color",currentColors['headingColor']).style("color",currentColors['textInHeadingColor']);
  d3.select("#left-top").style("border-color",currentColors['headingColor']).style("box-shadow","3px 3px "+currentColors['boxShadowColor']);
  d3.select("#left-bottom").style("border-color",currentColors['headingColor']).style("box-shadow","3px 3px "+currentColors['boxShadowColor']);
  d3.select("#menubar-label").style("color",currentColors['headingColor']);
  d3.select("#menubar-search-txt").style("border-color",currentColors['headingColor']).style("color",currentColors['headingColor']);
  d3.select("#menubar-search-btn").style("color",currentColors['headingColor']);
  d3.selectAll(".menubar-btn").style("border-color",currentColors['headingColor']);
  d3.selectAll(".teams-menubar-btn").style("border-color",currentColors['headingColor']);
  d3.select("#teams-div-1").style("border-color",headingColor).style("box-shadow","3px 3px"+currentColors['boxShadowColor']);
  d3.select("#teams-div-2").style("border-color",headingColor).style("box-shadow","3px 3px"+currentColors['boxShadowColor']);
  d3.select("#teams-div-3").style("border-color",headingColor).style("box-shadow","3px 3px"+currentColors['boxShadowColor']);
  d3.select("#teams-div-4").style("border-color",headingColor).style("box-shadow","3px 3px"+currentColors['boxShadowColor']);
  d3.select("#teams-div-5").style("border-color",headingColor).style("box-shadow","3px 3px"+currentColors['boxShadowColor']);
  //changeAnalysisByButtonColor(analysisby);
  changeTeamAnalysisButtonColor(teamAnalysisBtn);
  teamChange();

  d3.selectAll(".menubar-btn")
    .style("background-color","transparent")
    .style("color",headingColor);
  //console.log(btn);
  d3.select("#"+analysisby).style("background-color",headingColor).style("color",textInHeadingColor);  

};

function changeTeamAnalysisButtonColor(btn){
  d3.selectAll(".teams-menubar-btn")
    .style("background-color","transparent")
    .style("color",headingColor);
  d3.select("#"+btn).style("background-color",headingColor).style("color",textInHeadingColor);
};

d3.select("#right")
  .append("div")
  .attr("id","team-right-div")
  .style("width","100%")
  .style("height","88%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-menubar")
  .style("width","100%")
  .style("height","6%")
  .style("background-color","transparent")
  .style("float","left");

const team_menubar_btn_width = "9%";

// Button 1
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-all")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    selectedTeam = selectedTeam[3].toUpperCase();
    changeBGColorsByTeam(selectedTeam);
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-all")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-all")
  .append("span")
  .text("All")
  .style("margin-top","10%")
  .style("font-size","1.25em");


// Button 2
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-srh")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    selectedTeam = selectedTeam[3].toUpperCase();
    changeBGColorsByTeam(selectedTeam);
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-srh")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-srh")
  .append("span")
  .text("SRH")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 3
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-dc")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    selectedTeam = selectedTeam[3].toUpperCase();
    changeBGColorsByTeam(selectedTeam);
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-dc")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-dc")
  .append("span")
  .text("DC")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 4
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-rr")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    selectedTeam = selectedTeam[3].toUpperCase();
    changeBGColorsByTeam(selectedTeam);
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-rr")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-rr")
  .append("span")
  .text("RR")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 5
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-kkr")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    selectedTeam = selectedTeam[3].toUpperCase();
    changeBGColorsByTeam(selectedTeam);
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-kkr")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-kkr")
  .append("span")
  .text("KKR")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 6
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-mi")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    selectedTeam = selectedTeam[3].toUpperCase();
    changeBGColorsByTeam(selectedTeam);
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-mi")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-mi")
  .append("span")
  .text("MI")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 7
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-csk")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    selectedTeam = selectedTeam[3].toUpperCase();
    changeBGColorsByTeam(selectedTeam);
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-csk")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-csk")
  .append("span")
  .text("CSK")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 8
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-rcb")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    selectedTeam = selectedTeam[3].toUpperCase();
    changeBGColorsByTeam(selectedTeam);
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-rcb")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-rcb")
  .append("span")
  .text("RCB")
  .style("margin-top","10%")
  .style("font-size","1.25em");

  // Button 9
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-kxip")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    selectedTeam = selectedTeam[3].toUpperCase();
    changeBGColorsByTeam(selectedTeam);
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-kxip")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-kxip")
  .append("span")
  .text("KXIP")
  .style("margin-top","10%")
  .style("font-size","1.25em");

//function call 
changeTeamAnalysisButtonColor(teamAnalysisBtn);

d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-div-1")
  .style("width","55%")
  .style("height","46%")
  .style("margin-top","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-radius","30px")
  .style("box-shadow","3px 3px "+boxShadowColor)
  .style("float","left");

d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-div-2")
  .style("width","42%")
  .style("height","46%")
  .style("margin-top","1%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-radius","30px")
  .style("box-shadow","3px 3px "+boxShadowColor)
  .style("float","left");

d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-div-3")
  .style("width","55%")
  .style("height","43%")
  .style("margin-top","1%")
  .style("margin-left","0%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-radius","30px")
  .style("box-shadow","3px 3px "+boxShadowColor)
  .style("float","left");

d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-div-4")
  .style("width","42%")
  .style("height","43%")
  .style("margin-top","1%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-radius","30px")
  .style("box-shadow","3px 3px "+boxShadowColor)
  .style("float","left");

/*d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-div-5")
  .style("width","32%")
  .style("height","43%")
  .style("margin-top","1%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-radius","30px")
  .style("box-shadow","3px 3px "+boxShadowColor)
  .style("float","left");*/

function drawTeamWinPie(tdata){
 //console.log(tdata[0])
  tdata1 = {}
  tdata1['losses'] = tdata['losses']
  tdata1['totalMatches'] = tdata['totalMatches']
  tdata1['opponentData'] = tdata['opponentData']
  tdata1['wins'] = tdata['wins']
  d3.select("#left-bottom").selectAll("*").remove();
  var svg = d3.select("#left-bottom")
      .append("svg")
      .attr("width", 400)
      .attr("height", 300)
      .append("g")
      .attr("transform", "translate(130,130)");



  var pie = d3.pie()
        .value(function(d) {if(d.key != 'totalMatches'){return d.value;} })
     var tdata_pie = pie(d3.entries(tdata1))
     //console.log(tdata1);
  var arc=d3.arc()
          .innerRadius(0)
          .outerRadius(110)
  var en_arc=d3.arc()
          .innerRadius(0)
          .outerRadius(110*1.07)

  var div = d3.select("body").append("div") 
                    .attr("class", "tooltip")       
                    .style("opacity", 0)
                    .style("position", "absolute")     
                    .style("text-align", "center")    
                    .attr("width", 60)          
                    .style("height", 20)         
                    .style("padding", 4)       
                    .style("font", 12)    
                    .style("background", btnMouseoverBGColor) 
                    .style("color","black")
                    .style("border-style","solid")
                    .style("border-radius","30px")
                    .style("border-color",headingColor)

  svg.selectAll('whatever')
        .data(tdata_pie)
        .enter()
        .append('path')
        .attr('d', arc)
        .style('fill', function(d,i){if(i==0){ return textInHeadingColor; }else{return headingColor;}})
        .attr("stroke", currentColors['headingColor'])
        .style("stroke-width", "2px")
        .on("mouseover", function(d,i) {
                        d3.select(this)
                           .attr("d", en_arc);
                           var percent= (d.value * 100)/tdata["totalMatches"]

                         div .style("opacity", .9);
                         div.html( percent.toFixed(1)+"%"+"<br/>") 
                            .style("left", (d3.event.pageX) + "px")   
                            .style("top", (d3.event.pageY - 28) + "px"); 
                        
        })
        .on("mouseout", function(d) {
                        d3.select(this)
                          .style("opacity","1")
                          .attr("d",arc)
                          div.style("opacity", 0); 
        });

  svg.append('text')
                .attr("x",-70)
                .attr("y",140)
                .attr("width",30)
                .attr("height",30)
                .style("color",textInHeadingColor)
                .attr("font-size","14px")
                .attr("font-weight" ,"bold")
                .text(selectedTeam+" MATCHES WIN AND LOSE PERCENTAGE");

  svg.append('rect')
                .attr("x",130)
                .attr("y",-20)
                .attr("width",10)
                .attr("height",10)
                .style("fill",headingColor);
  svg.append('rect')
                .attr("x",130)
                .attr("y",10)
                .attr("width",10)
                .attr("height",10)
                .attr("stroke", currentColors['headingColor'])
                .style("stroke-width", "2px")
                .style("fill",textInHeadingColor);

  svg.append('text')
                .attr("x",155)
                .attr("y",-11)
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Matches Won : "+tdata["wins"] );
  svg.append('text')
                .attr("x",155)
                .attr("y",21)
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Matches Lost : "+tdata["losses"]);

  svg.append('text')
                .attr("x",145)
                .attr("y",-41)
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Total Matches : "+tdata["totalMatches"]);
};

var div2select = 'sixes';

function putDiv4Data(teamData){
  let svg = d3.select("#teams-div-4")
              .append("svg")
              .attr("width","100%")
              .attr("height","100%")
              .style("background-color","transparent");

  let teams = ['SRH','DC','RR','KKR','MI','CSK','RCB','KXIP'];
  if(onclickselect)
    teams = [onclickselect];
  let teamColors = {'SRH':'#F76E0A','DC':'#19459F','RR':'#EA1A85','KKR':'#46007A','MI':'#2152CD','CSK':'#FEE953','RCB':'#BC1527','KXIP':'#D7D7D7'};
  let years = [2013,2014,2015,2016,2017,2018,2019];

  let x_domain = years;
  let y_domain = [350,850];

  let x_scale = d3.scaleBand().domain(x_domain).range([50,400]);
  let y_scale = d3.scaleLinear().domain(y_domain).range([340,100]);

  let xAxis = d3.axisBottom().scale(x_scale);
  let yAxis = d3.axisLeft().scale(y_scale);

  let x_axis = svg.append('g')
              .attr('transform','translate('+[0,260]+')')
              .call(xAxis);
  let y_axis = svg.append('g')
            .attr('transform','translate('+[50,-80]+')')
            .call(yAxis);

  svg.append('text')
                .attr("x",x_scale(2015)+27)
                .attr("y",y_scale(450))
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Year of Auction");

 svg.append('text')
                .attr("x",x_scale(2013)-280)
                .attr("y",y_scale(1027))
                .attr("transform", "rotate(-90)")
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Auction Amount ( In Millions )");

  function plotLineDiv4(lineData,t){
    svg.append("path")
        .datum(years)
        .attr("fill", "none")
        .attr("stroke", teamColors[t])
        .attr("stroke-width", 2.5)
        .attr("d", d3.line()
          .x(function(d) { return x_scale(d)+27; })
          .y(function(d) { return y_scale(lineData[d]/1000000)-80; })
        );

    svg.selectAll(".dot")
        .data(years)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("fill", teamColors[t])
        .attr("cx", function(d) { return x_scale(d)+27; })
        .attr("cy", function(d) { return y_scale(lineData[d]/1000000)-80; })
        .attr("r", 3);
  };
  //let lineData = teamData['auction']['CSK'];
  console.log(selectedTeam);
  if(selectedTeam=='ALL'){
    for(var team in teams){
      //console.log(teams[team]);
      //console.log(teamData['auction'][teams[team]]);
      plotLineDiv4(teamData['auction'][teams[team]],teams[team]);
    }
  }else{
    plotLineDiv4(teamDataAuction['auction'][selectedTeam],selectedTeam);
  }
};

function putDiv3Data(teamData){

let teamColors = {'SRH':'#F76E0A','DC':'#19459F','RR':'#EA1A85','KKR':'#46007A','MI':'#2152CD','CSK':'#FEE953','RCB':'#BC1527','KXIP':'#D7D7D7'};
if(selectedTeam == 'ALL'){
        let svg123 = d3.select("#teams-div-3")
                      .append("svg")
                      .attr("id","svg3")
                      .attr("width","100%")
                      .attr("height","100%")
                      .style("background-color","transparent");

          let x_scale = d3.scaleLinear().domain([0,60]).range([50,400]);
          let y_scale = d3.scaleLinear().domain([-1,50]).range([340,100]);

          let xAxis = d3.axisBottom().scale(x_scale);
          let yAxis = d3.axisLeft().scale(y_scale);

          let x_axis = svg123.append('g')
                      .attr('transform','translate('+[0,260]+')')
                      .call(xAxis);
          let y_axis = svg123.append('g')
                    .attr('transform','translate('+[50,-80]+')')
                    .call(yAxis);


          data123 = teamData['Bat_Bowl']
          playerTeam = teamData['playerTeam']
          //console.log(data123);
          //console.log(playerTeam);
          //console.log(onclickselect);
         // x.domain(d3.extent(data, function(d) { return d.Bat_avg; })).nice();
         // y.domain(d3.extent(data, function(d) { return d.Bowl_avg; })).nice();
         var map=d3.map(data123);
         //console.log(map.values()[0]['Bat_avg']);
         svg123.selectAll("myCircle")
                .data(Object.keys(data123))
                .enter()
                .append("circle")
                 /*.style("fill", function(d) {
                  if (((data123[d]['Bat_avg'] >  52) && (data123[d]['Bowl_avg'] == 0)) || ((data123[d]['Bat_avg'] ==  0) && (data123[d]['Bowl_avg'] > 44)) ){return "red"}
                  if(data123[d]['Bat_avg'] >  40 && data123[d]['Bowl_avg'] > 40) {return "green"}
                      else  { return teamColors[playerTeam[d]]; }})*/
                  .style("fill",function(d){return teamColors[playerTeam[d]];})
                  .attr("stroke", function(d) {
                    if (((data123[d]['Bat_avg'] >  52) && (data123[d]['Bowl_avg'] == 0)) || ((data123[d]['Bat_avg'] ==  0) && (data123[d]['Bowl_avg'] > 44)) ){return "black"}
                    if(data123[d]['Bat_avg'] >  40 && data123[d]['Bowl_avg'] > 40) {return "black"}
                  })
                  .style("stroke-width", "2px")
                  .attr("cx", function(d,i) {  return x_scale(data123[d]['Bat_avg'])+20 })
                  .attr("cy", function(d,i) {  return y_scale(data123[d]['Bowl_avg'])-80 })
                  .attr("r", function(d){
                    if(onclickselect){
                      if(playerTeam[d]==onclickselect)
                        return 5;
                      else
                        return 0;
                    }else{
                      return 5;
                    }
                  });
          
          if(onclickselect==null){
            svg123.selectAll("myText").data(Object.keys(data123))
              .enter().append('text')
                      .attr("x",function(d) {
                            if ((data123[d]['Bat_avg'] >  52) && (data123[d]['Bowl_avg'] == 0)){
                              return 370;
                            } if((data123[d]['Bat_avg'] ==  0) && (data123[d]['Bowl_avg'] > 44)){return  60;}
                            if(data123[d]['Bat_avg'] >  40 && data123[d]['Bowl_avg'] > 40) {return 330;}
                      })
                      .attr("y",function(d) {
                            if ((data123[d]['Bat_avg'] >  52) && (data123[d]['Bowl_avg'] == 0)){
                              return 250;
                            } if((data123[d]['Bat_avg'] ==  0) && (data123[d]['Bowl_avg'] > 44)){return  30;}
                            if(data123[d]['Bat_avg'] >  40 && data123[d]['Bowl_avg'] > 40) {return 70;}
                      })
                      .style("fill",currentColors['headingColor'])
                      .attr("width",10)
                      .attr("height",10)
                      .attr("font-size","16px")
                      .attr("id","scatterPlotPlayerLabels")
                      .text(function(d) {
                          if (((data123[d]['Bat_avg'] >  52) && (data123[d]['Bowl_avg'] == 0)) || ((data123[d]['Bat_avg'] ==  0) && (data123[d]['Bowl_avg'] > 44)) ){return d;}
                          if(data123[d]['Bat_avg'] >  40 && data123[d]['Bowl_avg'] > 40) {return d;}
                      });

            }

            svg123.append('text')
                .attr("x",380)
                .attr("y",290)
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Batting Average")

           svg123.append('text')
                .attr("x",-110)
                .attr("y",20)
                .attr("transform", "rotate(-90)")
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Bowling Average");

            svg123.append('text')
                .attr("x",165)
                .attr("y",20)
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","16px")
                .attr("font-weight","bold")
                .text("Batting Average and Bowling average of all players")

    }
    else{

          //console.log("I am comming")
          let svg = d3.select("#teams-div-3")
                      .append("svg")
                      .attr("width","100%")
                      .attr("height","100%")
                      .style("background-color","transparent");

          let x_scale = d3.scaleBand().range([50,300]);
          let x1_scale = d3.scaleBand().range([50,300]);
          let y_scale = d3.scaleLinear().domain([0,45]).range([338,100]);

          

          data = teamData['tossData'][selectedTeam]
          //console.log(teamData)
          var tossDec = Object.keys(data);
          var matchDec = Object.keys(d3.values(data)[0])

          total_matches =data['TossWin']['MatchWin']+data['TossWin']['MatchLose']+data['TossLose']['MatchWin']+data['TossLose']['MatchLose']

          x_scale.domain(tossDec)
          x1_scale.domain(matchDec).range([0, x_scale.bandwidth()-70])//.rangeRoundBands([0, x1_scale.rangeBand()]);

            var color = d3.scaleOrdinal()
                          .domain(matchDec)
                          .range([currentColors['textInHeadingColor'],currentColors['headingColor']])

          let xAxis = d3.axisBottom().scale(x_scale);
          let yAxis = d3.axisLeft().scale(y_scale);

          let x_axis = svg.append('g')
                      .attr('transform','translate('+[0,260]+')')
                      .call(xAxis);
          let y_axis = svg.append('g')
                    .attr('transform','translate('+[50,-80]+')')
                    .call(yAxis);

          
       svg.append("g")
          .selectAll("g")
          // Enter in data = loop group per group
          .data(Object.keys(data))
          .enter()
          .append("g")
          .attr("transform", function(d) { return "translate(" + x_scale(d) + ",0)"; })
          .selectAll("rect")
          .data(function(d) {return matchDec.map(function(key) { return {key: key, value: data[d][key]}; }); })
          .enter().append("rect")
            .attr("x", function(d,i) { return x1_scale(d.key)+40; })
            .attr("y", function(d) { return y_scale(d.value)-80; })
            .attr("width", "25")
            .attr("stroke", currentColors['headingColor'])
            .style("stroke-width", "2px")
            .attr("height", function(d) { return 340 - y_scale(d.value); })
            .attr("fill", function(d) { return color(d.key); })
            /*.on("mouseover", function(d,i) {
          //console.log(d);
              svg
                    .append("text")
                    .attr("transform","translate(" + x_scale(d) + ",0)")
                    .attr("id","val")
                    .style("fill","black")
                    .attr("font-size","14px")
                    .attr("font-weight","bold")
                    .attr("x",x1_scale(d.key)+115)
                    .attr("y",y_scale(d.value)-90)
                    .text(d.value)
            })
                  .on("mouseout",function(d){
                    svg.selectAll('#val').remove();
            });*/



          svg.append("text")
                    .style("fill","black")
                    .attr("font-size","14px")
                    .attr("font-weight","bold")
                    .attr("x","100")
                    .attr("y","25")
                    .text("Number of Matches Won/Lose by "+selectedTeam+" based on Toss Win/Lose")

          svg.selectAll(".label")
              .data(Object.keys(data))
              .enter()
              .append("text")
              .style("text-anchor", "start")
              .attr("class","label")
              .attr("x",320)
              .attr("y",function(d,i){return 180+i*20})
              .attr("font-size","12px")
              .text(function(d){return "Total Match Wins When "+" "+d+"  : "+((data[d]['MatchWin']/total_matches)*100).toFixed(1) +" %"});

          svg.selectAll(".l2")
              .data(Object.keys(data))
              .enter()
              .append("text")
              .style("text-anchor", "start")
              .attr("font-size","12px")
              .attr("x",320)
              .attr("y",function(d,i){return 220+i*20})
              .text(function(d){return "Total Match losses When "+" "+d+"  : "+((data[d]['MatchLose']/total_matches)*100).toFixed(1)+" %"});

            svg.append('rect')
                .attr("x",370)
                .attr("y",70)
                .attr("width",10)
                .attr("height",10)
                .style("fill",headingColor);
            svg.append('rect')
                          .attr("x",370)
                          .attr("y",90)
                          .attr("width",10)
                          .attr("height",10)
                          .attr("stroke", currentColors['headingColor'])
                          .style("stroke-width", "2px")
                          .style("fill",textInHeadingColor);

            svg.append('text')
                          .attr("x",410)
                          .attr("y",80)
                          .attr("width",10)
                          .attr("height",10)
                          .attr("font-size","14px")
                          .text("Matches Won ");
            svg.append('text')
                          .attr("x",410)
                          .attr("y",100)
                          .attr("width",10)
                          .attr("height",10)
                          .attr("font-size","14px")
                          .text("Matches Lost ");

            svg.append('text')
                          .attr("x",-200)
                          .attr("y",16)
                          .attr("transform", "rotate(-90)")
                          .attr("width",10)
                          .attr("height",10)
                          .attr("font-size","14px")
                          .text("Number of Matches");
    }
}

function putDiv2Data(teamData){

  div2select = 'sixes';

  let options = ['sixes','fours','wickets','extras'];
  let teamColors = {'SRH':'#F76E0A','DC':'#19459F','RR':'#EA1A85','KKR':'#46007A','MI':'#2152CD','CSK':'#FEE953','RCB':'#BC1527','KXIP':'#DCDCDC'};

  let div2top = d3.select("#teams-div-2")
                  .append("div")
                  .attr("id","div2top")
                  .style("width","100%")
                  .style("height","10%")
                  //.style("background-color","red")
                  .style("text-align","center");

  let div2dropdown = d3.select("#div2top")
                        .append("select")
                        .style("margin-top","3%")
                        .style("width","30%")
                        .style("height","50%")
                        .on("change",div2optionchange);
  let div2dropdownOptions = div2dropdown.selectAll("option").data(options);
  div2dropdownOptions.enter().append("option").text(function(d){return d});

  let svg = d3.select("#teams-div-2")
        .append("svg")
        .attr("id","svg4")
        .attr("width","100%")
        .attr("height","90%")
        .style("background-color","transparent");

  function div2optionchange(){
    //console.log("changed to "+options[div2dropdown.property("selectedIndex")]);
    svg.selectAll("*").remove();
   //if(selectedTeam == 'ALL'){
    let teams = ['SRH','DC','RR','KKR','MI','CSK','RCB','KXIP'];

  //console.log(onclickselect)
    if(onclickselect){
      teams=[onclickselect]
    }

    let selectedOption = options[div2dropdown.property("selectedIndex")];

    //console.log(teamData)
    let barData = teamData[selectedOption];

    let max = 0;
    for(var t in barData){
      if(barData[t] > max)
        max = (barData[t]/100)*100+100;
    }

    let x_domain = teams;
    if(selectedTeam !='ALL'){
      x_domain.splice(x_domain.indexOf(selectedTeam),1);
      svg.append('text')
                .attr("x",90)
                .attr("y",20)
                .attr("width",30)
                .attr("height",30)
                .attr("font-size","15px")
                .attr("font-weight" ,"bold")
                .text("Numbers of "+selectedOption+" by "+selectedTeam+" against other team");
    }

    let y_domain = [0,max];

    let x_scale = d3.scaleBand().domain(x_domain).range([50,400]);
    let y_scale = d3.scaleLinear().domain(y_domain).range([340,100]);

    let xAxis = d3.axisBottom().scale(x_scale);
    let yAxis = d3.axisLeft().scale(y_scale);

    let x_axis = svg.append('g')
                .attr('transform','translate('+[0,260]+')')
                .call(xAxis);
    let y_axis = svg.append('g')
              .attr('transform','translate('+[50,-80]+')')
              .call(yAxis);

    if(selectedTeam == "ALL"){
    svg.append('text')
                .attr("x",130)
                .attr("y",20)
                .attr("width",30)
                .attr("height",30)
                .attr("font-size","15px")
                .attr("font-weight" ,"bold")
                .text("Numbers of "+selectedOption+" by each team");
    }

    svg.append('text')
                .attr("x",220)
                .attr("y",285)
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Team");

    svg.append('text')
                .attr("x",-200)
                .attr("y",16)
                .attr("transform", "rotate(-90)")
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Number of "+selectedOption);

    svg.selectAll(".bar")
        .data(teams)
        .enter()
        .append("rect")
        .attr("id",function(d,i){return "rect1"+teams[i]})
        .style("fill",function(d){ return teamColors[d]})
        .attr("x",function(d){ return x_scale(d)+10;})
        .attr("width",25)
        .attr("y",function(d){ return y_scale(barData[d])-80;})
        .attr("height",function(d){ return 340-y_scale(barData[d]); })
        .on("mouseover", function(d) {
          //console.log(d);
    svg
          .append("text")
          .attr("id","val")
          .style("text-anchor", "start")
          .attr("class","label")
          .style("fill","black")
          .attr("font-size","14px")
          .attr("font-weight","bold")
          .attr("x",x_scale(d)+10)
          .attr("y",y_scale(barData[d])-86)
          .text(barData[d])
        })
        .on("mouseout",function(d){
          svg.selectAll('#val').remove();
        });
  //}
};
  div2optionchange();

};

function putDiv1Data(teamData){
  //selectedTeam = teamAnalysisBtn.split("-");
  //selectedTeam = selectedTeam[3].toUpperCase();
  imagefile = selectedTeam;
  if(selectedTeam=='ALL')
    imagefile = 'iplcup';
  d3.select('#teams-div-1').selectAll("*").remove();
  d3.select('#teams-div-1')
        .append('img')
        .attr("width","150")
        .attr("height","150")
        .attr("src", "/static/images/"+imagefile+".png")
        .style("margin-left","1%")
        .style("margin-top","1%")
        .style("float","left");

  let svg = d3.select("#teams-div-1")
        .append("svg")
        .attr("id","svg1")
        .attr("width","70%")
        .attr("height","90%")
        .style("background-color","transparent");

  let teams = ['SRH','DC','RR','KKR','MI','CSK','RCB','KXIP'];
  let teamColors = {'SRH':'#F76E0A','DC':'#19459F','RR':'#EA1A85','KKR':'#46007A','MI':'#2152CD','CSK':'#FEE953','RCB':'#BC1527','KXIP':'#D7D7D7'};

  let x_domain = teams;
  let y_domain = [0,5];
  let y_vals = teamData['cupWins'];
  let wins_years = teamData['teamWinYear'];
  //console.log(y_vals);
  //console.log(selectedTeam);
  if(selectedTeam != 'ALL'){
    let index = x_domain.indexOf(selectedTeam);
    x_domain.splice(index,1);
    y_domain = [0,10];
    y_vals = teamData['opponentData'];

    svg.append('text')
                .attr("x",50)
                .attr("y",285)
                .attr("width",30)
                .attr("height",30)
                .attr("font-size","15px")
                .attr("font-weight" ,"bold")
                .text("Numbers of matches "+selectedTeam+" won against other teams");

         svg.append('text')
                .attr("x",-100)
                .attr("y",15)
                .attr("transform", "rotate(-90)")
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Teams");
  }
  //console.log(y_vals);
  //var x_scale = d3.scaleBand().domain(x_domain).range([50,400]);
  //var y_scale = d3.scaleLinear().domain(y_domain).range([340,100]);

  let y_scale = d3.scaleBand().domain(x_domain).range([340,100]);
  let x_scale = d3.scaleLinear().domain(y_domain).range([50,400]);

  let xAxis = d3.axisBottom().scale(x_scale);
  let yAxis = d3.axisLeft().scale(y_scale);

  //var x_axis = svg.append('g')
  //            .attr('transform','translate('+[0,260]+')')
  //            .call(xAxis);
  let y_axis = svg.append('g')
            .attr('transform','translate('+[50,-80]+')')
            .call(yAxis);
  
  svg.selectAll(".bar")
        .data(teams)
        .enter()
        .append("rect")
        .attr("id",function(d,i){ return "rect"+d})
        .style("fill",function(d){ return teamColors[d];})
        //.attr("x",function(d){ return x_scale(d)+10;})
        .attr("x",52)
        .attr("width",function(d){
          if(selectedTeam == 'ALL')
            return y_vals[d]*70;
          return y_vals[d]['wins']*25;
        })
        .attr("y",function(d){ return y_scale(d)-78;})
        .attr("height",25)
        .on("mouseover", function(d) {
          //console.log(d);
          if(selectedTeam=='ALL'){
                svg.append("text")
                    .attr("id","textYear")
                    .style("text-anchor", "start")
                    .attr("class","label")
                    .style("fill","white")
                    .attr("font-size","14px")
                    .attr("font-weight","bold")
                    .attr("x",70)
                    .attr("y",y_scale(d)-60)
                    .text(wins_years[d])
              }
        })
        .on("mouseout",function(d){
          if(selectedTeam=='ALL'){
              svg.selectAll('#textYear').remove();
           }
        });

  svg.selectAll(".label")
        .data(teams)
        .enter()
        .append("text")
        .attr("id",function(d,i){ return "text"+d})
        .style("text-anchor", "start")
        .attr("class","label")
        .attr("x",function(d){
          if(y_vals[d] != undefined){
            if(selectedTeam == 'ALL')
              return (y_vals[d]*70)+55;
            return (y_vals[d]['wins']*25)+25;
          }else
            return 55;
          
        })
        .attr("y",function(d){return y_scale(d)-63})
        .text(function(d){ 
          if(y_vals[d] != undefined){
            if(selectedTeam == 'ALL')
              return y_vals[d];
            return y_vals[d]['wins'];
          }else
            return 0;
        });
        /*.attr("y",function(d){ 
          if(y_vals[d] != undefined){
            if(selectedTeam == 'ALL')
              return y_scale(y_vals[d])-80;
            return y_scale(y_vals[d]['wins'])-80;
          }else{
            return y_scale(0)-80;
          } 
        })
        .attr("height", function(d){
         if(y_vals[d] != undefined){
          if(selectedTeam=='ALL')
            return 340-y_scale(y_vals[d]);
          return 340-y_scale(y_vals[d]['wins']);
         }else{
          return 340-y_scale(0);
         } 
        });*/

        if(selectedTeam == "ALL"){
                svg.append('text')
                        .attr("x",60)
                        .attr("y",285)
                        .attr("width",30)
                        .attr("height",30)
                        .attr("font-size","15px")
                        .attr("font-weight" ,"bold")
                        .text("Numbers of times each team won IPL Trophy");

                 svg.append('text')
                        .attr("x",-100)
                        .attr("y",15)
                        .attr("transform", "rotate(-90)")
                        .attr("width",10)
                        .attr("height",10)
                        .attr("font-size","14px")
                        .text("Teams");
          }

};

function teamChange(){
  var teamData = {};
  //selectedTeam = teamAnalysisBtn.split("-");
  d3.select("#left-bottom").selectAll("*").remove();
  d3.select("#left-top").selectAll("*").remove();
  d3.select('#teams-div-1').selectAll("*").remove();
  d3.select('#teams-div-2').selectAll("*").remove();
  d3.select('#teams-div-3').selectAll("*").remove();
  d3.select('#teams-div-4').selectAll("*").remove();
  //console.log(teamData);
  generateMap();
  //if(teamAnalysisBtn != 'teams-menubar-btn-all'){
    $.post("/getTeamData", {'team': selectedTeam}, function(data){
        console.log(data);
        teamData = data;
        teamDataGlobal = data;
        if(teamDataAuction==null)
          teamDataAuction = data;
        if(selectedTeam=='ALL'){
          drawPie();
        }else{
          drawTeamWinPie(teamData); 
        }
        putDiv1Data(teamData);
        putDiv2Data(teamData);
        putDiv3Data(teamData);
        putDiv4Data(teamData);
    });
  //}else{
  //}
};
teamChange();
};