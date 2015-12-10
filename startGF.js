inlets	=3;
outlets	=3;

var currentPoint		= new Array(2);
var lastPoint			= new Array(2);//for calculating the speed
var startPoint			= new Array(2);//for calculating the relative position
var relativePosition	= new Array(2);


var isSending 			= 0;
var distanceThreshold	= 20;

function list()
{
	if ( input==0 )
	{
		currentPoint[0]		= arguments[0];
		currentPoint[1] 	= arguments[1];
	
		//check the distance between current list and last list
		distance 	= norm(x - lastPoint[0], y - lastPoint[1]);
		
		if (distance > distanceThreshold )
		{
			if ( isSending == 0 )
			{
				isSending 	= 1;
				startPoint	= currentPoint;
				outlet(2,1);
				
				startTiming();//after a period, stop sending messages
				sendRelativePosition( x,y );
				lastPoint
			}
			else
			{
				sendRelativePosition( x,y );
			}
		}
		else 
		{
			isSending == 1;
			sendRelativePosition( x,y );
		}
	}
}

// detect the speed
function norm( x, y ){
		return Math.sqrt(x*x+y*y);
}

function sendRelativePosition( x,y ){
	position[0] 	= x-startPoint[0];
	position[1] 	= y-startPoint[1];
	outlet(0,position);
}

function startTiming()
{
	outlet(1,1);
}

function msg_int()
{
	if ( input==1 && arguments[0]==0 )
	{
		isSending = 0;
		outlet(2,0);
	}
}
