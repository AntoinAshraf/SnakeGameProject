function setCookie(cookieName, cookieValue, daysToExpire) {
    var date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    document.cookie = cookieName + "=" + cookieValue + ";expires=" + date.toUTCString();
}

function getCookie(cookieName) {
    var dataReturn = "";
    var cookiesStrings = document.cookie.split("; ");
    cookiesStrings.forEach(function(cookiePart){
        var nameAndValue = cookiePart.split("=");
        if(nameAndValue[0] == cookieName){
            dataReturn = nameAndValue[1];
        }
    });
    return dataReturn;
}

function updateCookie(cookieName, cookieValue, daysToExpire){
    if(hasCookie(cookieName)){
        var date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        document.cookie = cookieName + "=" + cookieValue + ";expires=" + date.toUTCString();
        return true;
    }
    return false;
}

//delete a cookie with key name
function deleteCookie(cookieName){
    var cookieValue = getCookie(cookieName);
    if(cookieName == ""){
        return false;
    }
    var date = new Date(0);
    setCookie(cookieName, cookieValue, date);
    return true;
}

//get all cookies in 2D Array key and value
function allCookiesList(){
    var cookiesStrings = document.cookie.split("; ");
    var cookies2D = [];
    var counter = 0;
    cookiesStrings.forEach(function(cookieItem){
        var cookieNameAndValue = cookieItem.split("=");
        cookies2D[counter] = {
            cookieKey: cookieNameAndValue[0], 
            cookieValue: cookieNameAndValue[1]
        };
        counter++;
    });
    return cookies2D;
}

//return true if the cookie is exist
function hasCookie(cookieName){
    var allCookies2D = allCookiesList();
    for(i = 0; i < allCookies2D.length; i++){
        if(allCookies2D[i]['cookieKey'] == cookieName){
            return true;
        }
    }
    return false;
}