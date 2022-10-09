const rules = document.getElementById("rules");

function showHideRules(){
        rules.classList.toggle("hidden")
    }


function hideShowedRules(){
    if(rules.classList.length == 0){
        rules.classList.toggle("hidden")
    };
};