
let token = "dbb1c99b9f0942b9b15491f324dd32ce";
let baseUrl = "https://api.football-data.org/v4/competitions/2000";

// For standings 
function getStandings(){
    let url = `${baseUrl}/standings`
    axios.get(url, {
        headers:{
            "X-Auth-Token":token
        }
    })
    .then((response) => {
        document.getElementById("standing-groups").innerHTML = ``;
        let standings = response.data.standings;
        for(standing of standings){
            
            let tableContent = ``;
            for (row of standing.table){
                tableContent += `
                    <li class="list-group-item p-0">
                        <div class="row m-0" style= " padding: 5px;">
                            <div class="col-sm-4 text-center d-flex justify-content-center align-items-center">
                                <span id="flag" style="border-radius: 50%; border: 1px solid #333;"><img src=${row.team.crest == "https://crests.football-data.org/762.png" ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png': row.team.crest} alt="" class=""
                                        style="width: 35px; height: 35px;  object-fit: cover;  border-radius: 50%;"></span>
                                <h5 style="margin: auto 0 auto 5px; width: 45px; font-weight: normal;">${row.team.tla}</h5>
                            </div>
                            <div class="col-sm-2 text-center d-flex justify-content-center align-items-center">${row.won}
                            </div>
                            <div class="col-sm-2 text-center d-flex justify-content-center align-items-center">${row.draw}
                            </div>
                            <div class="col-sm-2 text-center d-flex justify-content-center align-items-center">${row.lost}
                            </div>
                            <div class="col-sm-2 text-center d-flex justify-content-center align-items-center">
                                <b>${row.points}</b></div>
                        </div>
                    </li>
                `
                
            }
            let content = `
            <div class="col-sm-6">
            <div class="card shadow">
                <div class="card-header text-center bg-primary">
                    <b>${standing.group}</b>
                </div>
                <div class="row bg-secondery m-0">
                    <div class="col-sm-4 text-center">Team</div>
                    <div class="col-sm-2 text-center">W</div>
                    <div class="col-sm-2 text-center">D</div>
                    <div class="col-sm-2 text-center">L</div>
                    <div class="col-sm-2 text-center">PTS</div>
                </div>
                <ul class="list-group list-group-flush">
                    ${tableContent}
                </ul>
            </div>
            </div>
            `
            document.getElementById("standing-groups").innerHTML += content;
        }
        
        
    })
    
}

// For matches 
function getMatches(){
    let url = `${baseUrl}/matches`
    axios.get(url, {
        headers:{
            "X-Auth-Token":token
        }
    })
    .then((response) => {
        document.getElementById("matches-list").innerHTML = ``;
        let matches = response.data.matches;
        for(match of matches){

            // matches time 
            const dateUtc = match.utcDate
            const matchTime = new Date(dateUtc)
            const dateString = matchTime.getUTCFullYear() +"/"+ (matchTime.getUTCMonth()+1) +"/"+ matchTime.getUTCDate() + " " + matchTime.getUTCHours() + ":" + matchTime.getUTCMinutes();
            // || matches time ||

            // remove null matches
            if (match.homeTeam.tla == null || match.awayTeam.tla == null){
                continue;
            }


            let content = `
            <!-- MATCH COL -->
            <div class="col-lg-12" >

                <div class="card shadow rounded-pill mt-5" style="overflow: hidden">
                    
                    <!-- MATCH CARD -->
                    <div class="card-body p-0">
                        <div class="row">

                            <!-- FIRST TEAM COL -->
                            <div class="col-lg-3 bg-primary d-flex flex-direction-column justify-content-center align-items-center" style="border-right: solid 5px #5b0d25;">
                                <div class="d-flex align-items-center justify-content-center" style="text-align: center; margin: auto 0">
                                
                                    <div>
                                        <div class="flag">
                                            <img 
                                                class="rounded-circle border border-2" 
                                                src=${match.homeTeam.crest == "https://crests.football-data.org/762.png" ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png': match.homeTeam.crest} 
                                                alt=""
                                                style="width: 40px; height: 40px; object-fit:cover; "
                                            >
                                        </div>
                                        <h5 style="margin:auto 4px">${match.homeTeam.tla}</h5>
                                    </div>
                                </div>
                            </div>
                            <!--// FIRST TEAM COL //-->

                            <!-- VERSUS COL -->
                            <div class="col-lg-6" style="text-align: center">
                                <div class="row">
                                    <div class="col-sm-4" style="display: flex; justify-content: center; align-items: center;">
                                        <h1>${match.score.fullTime.home ?? "-"}</h1>
                                    </div>
                                    <div class="col-sm-4">
                                        <h6>${match.group ?? match.stage}</h6>
                                        <h1>X</h1>                                        
                                        <h6>${dateString}</h6>
                                    </div>
                                    <div class="col-sm-4" style="display: flex; justify-content: center; align-items: center;">
                                        <h1>${match.score.fullTime.away ?? "-"}</h1>
                                    </div>
                                </div>
                                
                            </div>
                            <!--// VERSUS COL //-->


                            <!-- SECOND TEAM COL -->
                            <div class="col-lg-3 bg-primary d-flex flex-direction-column justify-content-center align-items-center" style="border-left: solid 5px #5b0d25;">
                                <div class="d-flex align-items-center justify-content-center" style="text-align: center; margin: auto 0">
                                
                                    <div>
                                        <div class="flag">
                                            <img 
                                                class="rounded-circle border border-2" 
                                                src=${match.awayTeam.crest == "https://crests.football-data.org/762.png" ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png': match.awayTeam.crest} 
                                                alt=""
                                                style="width: 40px; height: 40px; object-fit: cover;"
                                            >
                                        </div>
                                        <h5 style="margin:auto 4px">${match.awayTeam.tla}</h5>
                                    </div>
                                </div>
                            </div>
                            <!--// SECOND TEAM COL //-->
                        </div>
                    </div>
                    <!--// MATCH CARD //-->

                    
                </div>

                
            </div>
            <!--// MATCH COL //-->
            `

            document.getElementById("matches-list").innerHTML += content;
        }
        
    })
    
}

// scroll to top button
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


//=====================================================================================
// main: 
getStandings();
getMatches();