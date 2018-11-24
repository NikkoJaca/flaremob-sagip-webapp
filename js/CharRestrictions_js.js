//the block of codes below are for iput field character restrictions
 
var regEx;
function CharRestriction(Type,TheObj){
    if(Type==0){ //allows 'space character' and alphabet characters from a-z/A-Z
        regEx=/[^a-z ]/gi;
    }else if(Type==1){ //allows 'space character', numbers, and alphabet characters from a-z/A-Z
        regEx=/[^a-z0-9 ]/gi;
    }else if(Type==2){ //allows 'space,&,minus,single quote characters', numbers, and characters from a-z/A-Z
        regEx=/[^a-z0-9-'\& ]/gi;
    }else if(Type==3){ //allows 'space,minus,single quote characters', and characters from a-z/A-Z
        regEx=/[^a-z-' ]/gi;
    }else if(Type==4){ //allows '@,dot characters', number and alphabet characters from a-z
        regEx=/[^a-z0-9.\@]/;
    }else if(Type==5){ //allows '! @ # $ % ^ & * - characters',number and alphabet characters from a-z
        regEx=/[^a-z0-9\!\@\#\$\%\^\&\*\-]/gi;
    }else if(Type==6){ //allows 'space character', numbers, and alphabet characters from A-Z
        regEx=/[^A-Z0-9\-]/;
    }else if(Type==7){ //allows 'space,&,minus,single quote,dot,comma characters', numbers, and characters from a-z/A-Z
        regEx=/[^a-z0-9-',.\& ]/gi;
    }else if(Type==8){ //allows number characters only
        regEx=/[^0-9]/gi;
    }
    
    TheObj.value=TheObj.value.replace(regEx,"");
}

//allows 'space character', numbers, and characters from a-z/A-Z
function CharRest_Az09Space(TheObj){
    var regEx=/[^a-z^0-9 ]/gi;
    TheObj.value=TheObj.value.replace(regEx,"");
}