inlets	=3;
outlets	=6;

var currentPoint		= [ 0,0 ];
var lastPoint			= [ 0,0 ];//for calculating the speed
var startPoint			= [ 0,0 ];//for calculating the relative position
var relativePosition	= [ 0,0 ];


var isSending 			= 0;
var distanceThreshold	= 20;

function list()
{
	if ( inlet==0 && arguments.length==2)
	{
		currentPoint[0]		= arguments[0];
		currentPoint[1] 	= arguments[1];
		outlet(4,currentPoint);
		outlet(3,lastPoint);
	
		//check the distance between current list and last list
		distance 	= norm(currentPoint[0] - lastPoint[0], currentPoint[1] - lastPoint[1]);
		
		if (distance > distanceThreshold )
		{
			if ( isSending == 0 )//not sending?
			{
				isSending 	= 1; //send data
				
				startPoint	= currentPoint;// let current point be the start point
				outlet(2,1);//start gesture following
				startTiming();//after a period, stop sending messages
				sendRelativePosition( currentPoint[0],currentPoint[1] );
				lastPoint[0] 	= currentPoint[0];
				lastPoint[1] 	= currentPoint[1];
				
				
			}
			else
			{
			//	sendRelativePosition( currentPoint[0],currentPoint[1] );
			//	lastPoint[0] 	= currentPoint[0];
			//	lastPoint[1] 	= currentPoint[1];
			}
			
		}
		else 
		{
			if ( isSending == 1 )
			{
				sendRelativePosition( currentPoint[0],currentPoint[1] );
				lastPoint[0] 	= currentPoint[0];
				lastPoint[1] 	= currentPoint[1];
			}
		}
	}
}

// detect the speed
function norm( x, y ){
		return Math.sqrt(x*x+y*y);
}

function sendRelativePosition( x,y ){
	relativePosition[0] 	= x - startPoint[0];
	relativePosition[1] 	= y - startPoint[1];
	outlet(0,relativePosition);
}

function startTiming()
{
	outlet(1,1);
}

function msg_int()
{
	if ( inlet==1 && arguments[0]==0 )
	{
		isSending = 0;
		initialize();
		outlet(2,0);
	}
}

function initialize()
{
	currentPoint		= [ 0,0 ];
	lastPoint			= [ 0,0 ];//for calculating the speed
	startPoint			= [ 0,0 ];//for calculating the relative position
	relativePosition	= [ 0,0 ];
	isSending 			= 0;
}
