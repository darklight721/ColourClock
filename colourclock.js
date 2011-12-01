
colourClock = function(){

    var mR, mG, mB;
    
    // start of public members *********************************************************
    function init()
    {
        positionControls();
        
        // select first button
        selectButton("button1");
        
        // start clock
        window.setInterval(setClock,1000);
    }
    
    function positionControls()
    {   
        // position container
        var container = document.getElementById("container");
        container.style.left = "5px";
        container.style.top = "5px";       
        container.style.width = window.innerWidth - 12 + "px";
        container.style.height = window.innerHeight - 12 + "px";
        
        // position title
        var title = document.getElementById("title");
        title.style.left = "5px";
        title.style.top = "5px";
        
        // position clock
        var clock = document.getElementById("clock");
        
        // position divider
        var divider = document.getElementById("divider");
        divider.style.width = clock.offsetWidth + "px";
        divider.style.height = "1px";
        
        // position hexClock
        var hexClock = document.getElementById("hexClock");
        hexClock.style.width = divider.offsetWidth + "px";
       
        // position clockPane
        var clockPane = document.getElementById("clockPane");
        clockPane.style.width = clock.offsetWidth + "px";
        clockPane.style.height = clock.offsetHeight + divider.offsetHeight + "px";
        
        // position buttons
        var button1 = document.getElementById("button1");
        button1.style.width = clockPane.offsetWidth / 2 - 5 + "px";
        button1.style.height = "15px";
        button1.style.left = "0px";
        button1.style.top = clockPane.offsetHeight + 10 + "px";
        
        var button2 = document.getElementById("button2");
        button2.style.width = button1.offsetWidth + "px";
        button2.style.height = "15px";
        button2.style.left = button1.offsetWidth + 10 + "px";
        button2.style.top = button1.offsetTop + "px";
        
        // position body
        var body = document.getElementById("body");
        body.style.left = (container.offsetWidth - clockPane.offsetWidth) / 2 + "px";
        body.style.top = (container.offsetHeight - (button1.offsetTop + button1.offsetHeight)) / 2 + "px";
        
        // position footer1
        var footer1 = document.getElementById("footer1");
        footer1.style.left = "5px";
        footer1.style.top = container.offsetHeight - footer1.offsetHeight - 5 + "px";
        
        // position footer2
        var footer2 = document.getElementById("footer2");
        footer2.style.left = container.offsetWidth - footer2.offsetWidth - 7 + "px";
        footer2.style.top = footer1.offsetTop + "px";
    }
    
    function selectButton(buttonID)
    {    
        // reset class of buttons
        var button1 = document.getElementById("button1");
        var button2 = document.getElementById("button2");
        button1.className = "button";
        button2.className = "button";
        
        // get selected button
        var button = document.getElementById(buttonID);
        button.className += " selected";
        
        if (buttonID == "button1")
            showClock();
        else
            showHexClock();
    }
    // end of public members ***********************************************************
    
    function setClock()
    {
        // get current time
        var time = new Date();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        
        var hourElem = document.getElementById("hour");
        var minElem = document.getElementById("minute");
        var secElem = document.getElementById("second");
        
        hourElem.innerHTML = (hours < 10) ? "0" + hours : hours;
		minElem.innerHTML = (minutes < 10) ? "0" + minutes : minutes;
		secElem.innerHTML = (seconds < 10) ? "0" + seconds : seconds;
        
        setBackground(hours,minutes,seconds);
        
        setHexClock();
    }
    
    function setBackground(hour,min,sec)
    {
        mR = Math.floor(hour*(255/24));
        mG = Math.floor(min*(255/60));
        mB = Math.floor(sec*(255/60));
        
        document.body.style.backgroundColor = "rgb("+ mR +","+ mG +","+ mB +")";
    }
    
    function setHexClock()
    {
        var hexClock = document.getElementById("hexClock");
        hexClock.innerHTML = numToHex(mR) + numToHex(mG) + numToHex(mB);
    }
    
    function numToHex(num)
    {
        var hex = ["0","0"];
		var index = 1;
		do
		{
			hex[index] = toHex(num%16);
			num = Math.floor(num / 16);
			index--;
		} while (num > 0 && index >= 0);

		return hex.join("");
    }
    
    function toHex(num)
    {
        var ret = 0;
        switch(num)
        {
            case 10: ret = 'A'; break;
			case 11: ret = 'B'; break;
			case 12: ret = 'C'; break;
			case 13: ret = 'D'; break;
			case 14: ret = 'E'; break;
			case 15: ret = 'F'; break;
			default: ret = num.toString(); break;
        }
        return ret;
    }
    
    function showClock()
    {
        var clock = document.getElementById("clock");
        var divider = document.getElementById("divider");
        var hexClock = document.getElementById("hexClock");
        
        clock.style.top = "0px";
        divider.style.top = clock.offsetHeight + "px";
        hexClock.style.top = clock.offsetHeight + divider.offsetHeight + "px";
    }
    
    function showHexClock()
    {
        var clock = document.getElementById("clock");
        var divider = document.getElementById("divider");
        var hexClock = document.getElementById("hexClock");
        
        clock.style.top = 0 - clock.offsetHeight + "px";
        divider.style.top = "0px";
        hexClock.style.top = "0px";
    }
    
    return {
        init: init,
        positionControls: positionControls,
        selectButton: selectButton
    }
    
}();

document.addEventListener("DOMContentLoaded", function(){
   // initialize colour clock controls
   colourClock.init();
   
   // add event listeners
   window.addEventListener("resize",colourClock.positionControls,false); 
   
   var button1 = document.getElementById("button1");
   button1.addEventListener("click",function(){ colourClock.selectButton("button1") },false);
   
   var button2 = document.getElementById("button2");
   button2.addEventListener("click",function(){ colourClock.selectButton("button2") },false);
   
}, false);
