inlets	=3;
outlets	=5

var lastX	= 0;//initialization
var lastY 	= 0;
 
function list(){
	
	x	= arguments[0];
	y 	= arguments[1];
	
	//check the distance between current list and last list
	distance 	= norm(x - lastX, y - lastY);
	
	outlet(0,norm(x,y));
}

// detect the speed
function norm( x, y )
{
		return Math.sqrt(x*x+y*y);
}
