var div_count=0;

//original
var color_sad_five_sd = "#093057";
var color_sad_four_sd = "#0d5167";
var color_sad_three_sd = "#107878";
var color_sad_two_sd = "#14896a";
var color_sad_one_sd = "#189a57";
var color_neutral = "#1cab3d";
var color_happy_one_sd = "#25bb21";
var color_happy_two_sd = "#55cc26";
var color_happy_three_sd = "#8bdd2b";
var color_happy_four_sd = "#c7ee31";
var color_happy_five_sd = "#fff438";

/* lighter colors
var color_sad_five_sd = "#036baa";
var color_sad_four_sd = "#0b9bb3";
var color_sad_three_sd = "#14bbad";
var color_sad_two_sd = "#1ec48f";
var color_sad_one_sd = "#29cc72";
var color_neutral = "#34d557";
var color_happy_one_sd = "#43dd41";
var color_happy_two_sd = "#73e54e";
var color_happy_three_sd = "#a1ee5c";
var color_happy_four_sd = "#cdf66a";
var color_happy_five_sd = "#f7ff79";
*/

var color_cloud_background = "#34d557";
var color_countries = color_neutral;

function setcolor(score) {
	var color;
	
	switch(true) {
		case (score<=five_sd_sad):
			//color='#093057';
			color = color_sad_five_sd;
			break;
		
		case (score<=four_sd_sad):
			//color='#0d5167';
			color = color_sad_four_sd;
			break;	
		
		case (score<=three_sd_sad):	
			//color='#107878';
			color = color_sad_three_sd;
			break;			
	
		case (score<=two_sd_sad):
			//color='#14896a';
			color = color_sad_two_sd;
			break;			
		
		case (score<=one_sd_sad):
			//color='#189a57';
			color = color_sad_one_sd;
			break;			
		
		case (score<=median):
			//color='#1cab3d';
			color = color_neutral;	
			break;			
		
		case (score<=one_sd_happy):
			//color='#25bb21';
			color = color_happy_one_sd;
			break;		
		
		case (score<=two_sd_happy):	
			//color='#55cc26';
			color = color_happy_two_sd;
			break;		
		
		case (score<=three_sd_happy):	
			//color='#8bdd2b';
			color = color_happy_three_sd;
			break;	
		
		case (score<=four_sd_happy):	
			//color='#c7ee31';
			color = color_happy_four_sd;
			break;	
		
		case (score>five_sd_happy):	
			//color='#fff428';
			color = color_happy_five_sd;
			break;
	}
	return color;		
}

function initalizebinmatrix() {
	datahaschanged = false;
	for (i=0; i<128; i++) {
		binmatrix[i] = Array.apply(null, new Array(256)).map(Number.prototype.valueOf,0);
	}
		binmatrix[127] = Array.apply(null, new Array(256)).map(Number.prototype.valueOf,0);
}


function marchingsquares(i, k) {

	var score=0;
	var ld=0;
	var ru=0;
	var rd=0;
	var scoreFull = binmatrix[i][k];
	var ldFull = binmatrix[i+1][k];
	var ruFull = binmatrix[i][k+1];
	var rdFull = binmatrix[i+1][k+1];	
	
	var shape=0;	
	
	if((scoreFull<cloud_threshold)&&(scoreFull!=0)){
		score = -1;
	}
	if(scoreFull >0){
		score = 1;	
	}
	
	if((ldFull<cloud_threshold)&&(ldFull!=0)){
		ld = -1;
	}
	if(ldFull >0){
		ld = 1;	
	}
	
	
	if((ruFull<cloud_threshold)&&(ruFull!=0)){
		ru = -1;
	}
	if(ruFull >0){
		ru = 1;	
	}
	
	if((rdFull<cloud_threshold)&&(rdFull!=0)){
		rd = -1;
	}
	if(rdFull > 0){
		rd = 1;	
	}
	
	
		
	/////////////////////////
	// find case for happy //
	/////////////////////////	
	
	//case 0
	var imageHappy = "0/case0.png";
	var imageSad = "0/case0.png";	
	
	/*
	switch(true) {		
		case (scoreFull>=four_sd_happy):	
			imageHappy='4.png';
			break;	
			
		case (scoreFull>=three_sd_happy):	
			imageHappy='3.png';
			break;
			
		case (scoreFull>=two_sd_happy):	
			imageHappy='2.png';
			break;
			
		case (scoreFull>=one_sd_happy):
			imageHappy='1.png';
			break;		
	}*/
	
	//case 1
	if (score==1 && ru!=1 && rd!=1 && ld!=1) {
		imageHappy = "1/case1h";
		if (scoreFull >= five_sd_happy) {
			imageHappy = imageHappy + "_sun";
		}		
		else if (scoreFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}	
		else {
			imageHappy = imageHappy + "_reg";
		}
		
		imageHappy = imageHappy + ".png";
	}
	//case 2
	else if (score!=1 && ru==1 && rd!=1 && ld!=1) {
		imageHappy = "2/case2h";
		if (ruFull >= five_sd_happy) {
			imageHappy = imageHappy + "_sun";
		}				
		else if (ruFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}	
		else {
			imageHappy = imageHappy + "_reg";
		}
		
		imageHappy = imageHappy + ".png";
	}
	//case 3
	else if (score==1 && ru==1 && rd!=1 && ld!=1) {
		imageHappy = "3/case3h";
		if(scoreFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}	
		else if (scoreFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(ruFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}	
		else if (ruFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		imageHappy = imageHappy + ".png";
	}
	//case 4
	else if (score!=1 && ru!=1 && rd==1 && ld!=1) {
		imageHappy = "4/case4h";
		if (rdFull >= five_sd_happy) {
			imageHappy = imageHappy + "_sun";
		}		
		else if (rdFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";
		}
		
		imageHappy = imageHappy + ".png";
	}
	//case 5
	else if (score==1 && ru!=1 && rd==1 && ld!=1) {
		imageHappy = "5/case5h";
		if(scoreFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}
		else if (scoreFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(rdFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}
		else if (rdFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		imageHappy = imageHappy + ".png";
	}
	//case 6
	else if (score!=1 && ru==1 && rd==1 && ld!=1) {
		imageHappy = "6/case6h";
		if(ruFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}
		else if (ruFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(rdFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}
		else if (rdFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		imageHappy = imageHappy + ".png";
	}
	//case 7
	else if (score==1 && ru==1 && rd==1 && ld!=1) {
		imageHappy = "7/case7h";
		if (scoreFull >= five_sd_happy) {
			imageHappy = imageHappy + "_sun";
		}
		else if (scoreFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}	
		else {
			imageHappy = imageHappy + "_reg";		
		}	
		if (ruFull >= five_sd_happy) {
			imageHappy = imageHappy + "_sun";
		}
		else if (ruFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}	
		else {
			imageHappy = imageHappy + "_reg";		
		}	
		if (rdFull >= five_sd_happy) {
			imageHappy = imageHappy + "_sun";
		}	
		else if (rdFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}	
		
		imageHappy = imageHappy + ".png";
	}
	//case 8
	else if (score!=1 && ru!=1 && rd!=1 && ld==1) {
		imageHappy = "8/case8h";
		if (ldFull >= five_sd_happy) {
			imageHappy = imageHappy + "_sun";
		}		
		else if (ldFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}	
		else {
			imageHappy = imageHappy + "_reg";		
		}
		
		imageHappy = imageHappy + ".png";
	}
	//case 9
	else if (score==1 && ru!=1 && rd!=1 && ld==1) {
		imageHappy = "9/case9h";
		if(scoreFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}		
		else if (scoreFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(ldFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}		
		else if (ldFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		imageHappy = imageHappy + ".png";	
	}
	//case 10
	else if (score!=1 && ru==1 && rd!=1 && ld==1) {
		imageHappy = "10/case10h";
		if(ruFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}	
		else if (ruFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(ldFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}	
		else if (ldFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		imageHappy = imageHappy + ".png";
	}
	//case 11
	else if (score==1 && ru==1 && rd!=1 && ld==1) {
		imageHappy = "11/case11h";
		if (scoreFull >= five_sd_happy) {
			imageHappy = imageHappy + "_sun";
		}		
		else if (scoreFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}	
		if (ruFull >= five_sd_happy) {
			imageHappy = imageHappy + "_sun";
		}	
		else if (ruFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}	
		else {
			imageHappy = imageHappy + "_reg";		
		}	
		if (ldFull >= five_sd_happy) {
			imageHappy = imageHappy + "_sun";
		}	
		else if (ldFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}	
		else {
			imageHappy = imageHappy + "_reg";		
		}	
		
		imageHappy = imageHappy + ".png";
	}
	//case 12
	else if (score!=1 && ru!=1 && rd==1 && ld==1) {
		imageHappy = "12/case12h";
		if(rdFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}	
		else if (rdFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(ldFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}	
		else if (ldFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		imageHappy = imageHappy + ".png";
	}
	//case 13
	else if (score==1 && ru!=1 && rd==1 && ld==1) {
		imageHappy = "13/case13h";
		if(scoreFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}	
		else if (scoreFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(rdFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}	
		else if (rdFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(ldFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}	
		else if (ldFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		imageHappy = imageHappy + ".png";
	}
	//case 14
	else if (score!=1 && ru==1 && rd==1 && ld==1) {
		imageHappy = "14/case14h";
		if(ruFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}
		else if (ruFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(rdFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}
		else if (rdFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(ldFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}
		else if (ldFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		imageHappy = imageHappy + ".png";
	}
	//case 15
	else if (score==1 && ru==1 && rd==1 && ld==1) {
		imageHappy = "15/case15h";
		if(scoreFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}
		else if (scoreFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(ruFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}
		else if (ruFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(rdFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}
		else if (rdFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		if(ldFull>=five_sd_happy){
			imageHappy = imageHappy + "_sun";		
		}
		else if (ldFull >= three_sd_happy) {
			imageHappy = imageHappy + "_flo";
		}
		else {
			imageHappy = imageHappy + "_reg";		
		}
		imageHappy = imageHappy + ".png";
	}
	
	
	
	///////////////////////
	// find case for sad //
	///////////////////////	

		
	
	//case 1
	if (score==-1 && ru!=-1 && rd!=-1 && ld!=-1){
		shape = 1;
		imageSad = "1/case1s";
		if(colorScheme_gradient){
			if(scoreFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";					
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}	
		else {
			if (scoreFull <= five_sd_sad) {
				imageSad = imageSad + "_lightning";			
			}
			else if (scoreFull <= three_sd_sad){
				imageSad = imageSad + "_rain";	
			}
			else{
				var rand = Math.random()*(1 - 0) + 0;
				if ( rand < .3) {
					imageSad = imageSad + "_2";
				}
				else {
					imageSad = imageSad + "_1";
				}
			}
		}
		imageSad = imageSad + ".png";							
	}
	//case 2
	else if (score!=-1 && ru==-1 && rd!=-1 && ld!=-1) {
		shape = 2;
		imageSad = "2/case2s";
		if(colorScheme_gradient){
			if(ruFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			var rand = Math.random()*(1 - 0) + 0;
			if ( rand < .3) {
				imageSad = imageSad + "_2";
			}
			else {
				imageSad = imageSad + "_1";
			}
		}
		imageSad = imageSad + ".png";
	}
	//case 3
	else if (score==-1 && ru==-1 && rd!=-1 && ld!=-1) {
		shape = 3;
		imageSad = "3/case3s";
		if(colorScheme_gradient){
			if(scoreFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(ruFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			if (scoreFull <= five_sd_sad) {
				imageSad = imageSad + "_lightning";			
			}
			else if (scoreFull <= three_sd_sad){
				imageSad = imageSad + "_rain";	
			}
			else{
				var rand = Math.random()*(1 - 0) + 0;
				if ( rand < .3) {
					imageSad = imageSad + "_3";
				}
				else if( rand <.6){
					imageSad = imageSad + "_2";
				}
				else {
					imageSad = imageSad + "_1";
				}
			}
		}
		imageSad = imageSad + ".png";
	}
	//case 4
	else if (score!=-1 && ru!=-1 && rd==-1 && ld!=-1) {
		shape = 4;
		imageSad = "4/case4s";
		if(colorScheme_gradient){
			if(rdFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			var rand = Math.random()*(1 - 0) + 0;
			if ( rand < .3) {
				imageSad = imageSad + "_2";
			}
			else {
				imageSad = imageSad + "_1";
			}
		}
		imageSad = imageSad + ".png";
	}
	//case 5
	else if (score==-1 && ru!=-1 && rd==-1 && ld!=-1) {
		shape = 5;
		imageSad = "5/case5s";
		if(colorScheme_gradient){
			if(scoreFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(rdFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			if (scoreFull <= five_sd_sad) {
				imageSad = imageSad + "_lightning";			
			}
			else if (scoreFull <= three_sd_sad){
				imageSad = imageSad + "_rain";	
			}
			else{
				var rand = Math.random()*(1 - 0) + 0;
				if ( rand < .3) {
					imageSad = imageSad + "_2";
				}
				else if(rand <.6){
					imageSad = imageSad + "_3";
				}
				else {
					imageSad = imageSad + "_1";
				}
			}
		}
		imageSad = imageSad + ".png";
	}
	//case 6
	else if (score!=-1 && ru==-1 && rd==-1 && ld!=-1) {
		shape = 6;
		imageSad = "6/case6s";
		if(colorScheme_gradient){
			if(ruFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(rdFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			var rand = Math.random()*(1 - 0) + 0;
			if ( rand < .3) {
				imageSad = imageSad + "_2";
			}
			else if(rand<.6) {
				imageSad = imageSad + "_3";
			}
			else {
				imageSad = imageSad + "_1";
			}
		}
		imageSad = imageSad + ".png";
	}
	//case 7
	else if (score==-1 && ru==-1 && rd==-1 && ld!=-1) {
		shape = 7;
		imageSad = "7/case7s";
		if(colorScheme_gradient){
			if(scoreFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(ruFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(rdFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			if (scoreFull <= five_sd_sad) {
				imageSad = imageSad + "_lightning";			
			}
			else if (scoreFull <= three_sd_sad){
				imageSad = imageSad + "_rain";	
			}
			else{
				var rand = Math.random()*(1 - 0) + 0;
				if ( rand < .3) {
					imageSad = imageSad + "_3";
				}
				else if( rand <.6){
					imageSad = imageSad + "_2";
				}
				else {
					imageSad = imageSad + "_1";
				}
			}
		}
		imageSad = imageSad + ".png";
	}
	//case 8
	else if (score!=-1 && ru!=-1 && rd!=-1 && ld==-1) {
		shape = 8;
		imageSad = "8/case8s";
		if(colorScheme_gradient){
			if(ldFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else{
			var rand = Math.random()*(2 - 0) + 0;
			if(rand < .3){
				imageSad = imageSad + "_3";
			}
			else if ( rand < .6) {
				imageSad = imageSad + "_2";
			}
			else {
				imageSad = imageSad + "_1";
			}
		}	
		imageSad = imageSad + ".png";
	}
	//case 9
	else if (score==-1 && ru!=-1 && rd!=-1 && ld==-1) {
		shape = 9;
		imageSad = "9/case9s";	
		if(colorScheme_gradient){
			if(scoreFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(ldFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			if (scoreFull <= five_sd_sad) {
				imageSad = imageSad + "_lightning";			
			}
			else if (scoreFull <= three_sd_sad){
				imageSad = imageSad + "_rain";	
			}
			else{
				var rand = Math.random()*(1 - 0) + 0;
				if ( rand < .3) {
					imageSad = imageSad + "_3";
				}
				else if( rand <.6){
					imageSad = imageSad + "_2";
				}
				else {
					imageSad = imageSad + "_1";
				}
			}
		}
		imageSad = imageSad + ".png";
	}
	//case 10
	else if (score!=-1 && ru==-1 && rd!=-1 && ld==-1) {
		shape = 10;
		imageSad = "10/case10s";
		if(colorScheme_gradient){
			if(ruFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(ldFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			var rand = Math.random()*(1 - 0) + 0;
			if ( rand < .3) {
				imageSad = imageSad + "_3";
			}
			else if( rand <.6){
				imageSad = imageSad + "_2";
			}
			else {
				imageSad = imageSad + "_1";
			}
		}
		imageSad = imageSad + ".png";
	}
	//case 11
	else if (score==-1 && ru==-1 && rd!=-1 && ld==-1) {
		shape = 11;
		imageSad = "11/case11s";
		if(colorScheme_gradient){
			if(scoreFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(ruFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(ldFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			if (scoreFull <= five_sd_sad) {
				imageSad = imageSad + "_lightning";			
			}
			else if (scoreFull <= three_sd_sad){
				imageSad = imageSad + "_rain";	
			}
			else{
				var rand = Math.random()*(2 - 0) + 0;
				if(rand < .3){
					imageSad = imageSad + "_3";
				}
				else if ( rand < .6) {
					imageSad = imageSad + "_2";
				}
				else {
					imageSad = imageSad + "_1";
				}
			}
		}
		
		imageSad = imageSad + ".png";
	}
	//case 12
	else if(score!=-1 && ru!=-1 && rd==-1 && ld==-1){
		shape = 12;
		imageSad = "12/case12s";
		if(colorScheme_gradient){
			if(rdFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(ldFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			var rand = Math.random()*(1 - 0) + 0;
			if(rand < .3){
				imageSad = imageSad + "_3";
			}
			else if ( rand < .6) {
				imageSad = imageSad + "_2";
			}
			else {
				imageSad = imageSad + "_1";
			}
		}
		imageSad = imageSad + ".png";
	}
	//case 13
	else if(score==-1 && ru!=-1 && rd==-1 && ld==-1){
		shape = 13;
		imageSad = "13/case13s";
		if(colorScheme_gradient){
			if(scoreFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(rdFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(ldFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			if (scoreFull <= five_sd_sad) {
				imageSad = imageSad + "_lightning";			
			}
			else if (scoreFull <= three_sd_sad){
				imageSad = imageSad + "_rain";	
			}
			else{
				var rand = Math.random()*(1 - 0) + 0;
				if(rand < .3){
					imageSad = imageSad + "_2";
				}
				else {
					imageSad = imageSad + "_1";
				}
			}
		}
		imageSad = imageSad + ".png";
	}
	//case 14
	else if (score!=-1 && ru==-1 && rd==-1 && ld==-1){
		shape = 14;
		imageSad = "14/case14s";
		if(colorScheme_gradient){
			if(ruFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(rdFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(ldFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			var rand = Math.random()*(1 - 0) + 0;
			if(rand < .3){
				imageSad = imageSad + "_2";
			}
			else {
				imageSad = imageSad + "_1";
			}
		}
		imageSad = imageSad + ".png";
	}
	//case 15
	else if (score==-1 && ru==-1 && rd==-1 && ld==-1){
		shape = 15;
		imageSad = "15/case15s";
		if(colorScheme_gradient){
			if(scoreFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(ruFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(rdFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
			if(ldFull<gradient_sadthreshold){
				imageSad = imageSad + "_dk";
			}
			else {
				imageSad = imageSad + "_lt";
			}
		}
		else {
			if (scoreFull <= five_sd_sad) {
				imageSad = imageSad + "_lightning";			
			}
			else if (scoreFull <= three_sd_sad){
				imageSad = imageSad + "_rain";	
			}
		}
		imageSad = imageSad + ".png";
	}
	
		
	
	return [imageHappy,imageSad,shape];
}



function drawBins() {
	//draw clouds
	if(cloudMode){
		if(datahaschanged){
			initalizebinmatrix(binmatrix);
		
			for (i=0; i<bins.length; i++) {
				xindex = parseInt(bins[i].x_index);
				yindex = parseInt(bins[i].y_index);
				score = parseFloat(bins[i].affect_score);
				binmatrix[yindex][xindex] = score;
			}
		}
	
		for (i=0; i<128; i++) {
			for (k=0; k<256; k++){
				var x_index = k;		
				var y_index = i;					
				
				var x_gps=0;
				var y_gps=0;
		
				if((x_index>255)||(y_index>127) || (i+1 >= 128) || (k+1 >= 256)){
					continue;
				}
				
				var score = binmatrix[i][k];
				var ld = binmatrix[i+1][k];
				var ru = binmatrix[i][k+1];
				var rd = binmatrix[i+1][k+1];			
						
				if((score!=0)||(ld!=0)||(ru!=0)||(rd!=0)){
					var imageHS = marchingsquares(i,k);

					var imageHappy = imageHS[0];
					var imageSad = imageHS[1];
					var shape = imageHS[2];
					var direc = "2";
					if ((shape==1)||(shape==3)||(shape==5)||(shape==8)||(shape==9)||(shape==11)||(shape==13)||(shape==14)) {								
						direc = "1";
					}
					if (x_index<=128.0) {
						x_gps= (x_index*(360/256)) - 180.0;
					}	
					if (x_index>128.0) {
						x_gps= (x_index-128.0)*(360/256);
					}
					
					if (y_index<=64.0) {
						y_gps= Math.abs((y_index*(180/128))- 90.0);
					}	
					if (y_index>64.0) {
						y_gps= (y_index-64.0)*(180/128);
						y_gps *= -1;
					}		
					//draw happy
					if(imageHappy != "0/case0.png"){
						div_count  = div_count + 1;
						imageHappy = "marchingsq/sparkles/"+imageHappy;
						addsparkle(x_gps,y_gps,imageHappy);
						/*if (score >= five_sd_happy) {
							addrainbow(x_gps,y_gps);
						}*/
					}
					// draw sad
					if(imageSad != "0/case0.png"){
						var cstype;
						if(colorScheme_single){
							imageSad = "marchingsq/single/"+imageSad;
							addcloud(x_gps,y_gps,imageSad,score);
							
							/*if(score<=five_sd_sad){
								addlightning(x_gps,y_gps,direc);							
							}
							else if(score <= three_sd_sad){
								addrain(x_gps,y_gps,direc);							
							}*/
							
						}
						if(colorScheme_gradient){
							imageSad = "marchingsq/gradient/"+imageSad;
							addcloud(x_gps,y_gps,imageSad,score);
						}				
					}
				}
			}
		}
		
		//jQuery('.slideshow').cycle();
		
	}
	
	//draw squares
	else{
		for (i=0; i<bins.length; i++) {
			var x_index= parseFloat(bins[i].x_index);		
			var y_index=parseFloat(bins[i].y_index);
			score=parseFloat(bins[i].affect_score);
			var x_gps=0;
			var y_gps=0;
	
			
			if((x_index>255)||(y_index>127)){
				continue;
			}
			
			
			if (x_index<=128.0) {
				x_gps= (x_index*(360/256)) - 180.0;
			}	
			if (x_index>128.0) {
				x_gps= (x_index-128.0)*(360/256);
			}
			
			if (y_index<=64.0) {
				y_gps= Math.abs((y_index*(180/128))- 90.0);
			}	
			if (y_index>64.0) {
				y_gps= (y_index-64.0)*(180/128);
				y_gps *= -1;
			}	
			
			var color;
			color = setcolor(score);		
			addpoint(x_gps,y_gps,color,score);			
			

		} 
	}
}


function addpoint(lat,lon,color,score){
	var gpoint = g.append("g").attr("class","gpoint");
	var x_coord = projection([lat,lon])[0];
	var y_coord = projection([lat,lon])[1];
	var x_diff = projection([lat+1.4,lon+1.4])[0];
	var y_diff = projection([lat+1.4,lon+1.4])[1];	
	
	if (x_coord==null){
		return;
	}	
	if (y_coord==null){
		return;
	}	
	
	gpoint.append("svg:rect")
			.attr("x",x_coord)
			.attr("y",y_coord)
			.attr("height",Math.abs(y_diff-y_coord)-1)
			.attr("width",Math.abs(x_diff-x_coord)-1)
			.attr("class","point")
			.attr("fill",color)
			.attr("title",score)
			.attr("position","absolute")
         .on('click', function(d){ 
         		if(selection_mode){
         			if(d3.select(this).classed("selected")) {
         				d3.select(this).classed("selected",false);
							d3.select(this).style({stroke: '', 'stroke-width':''});        			
         			} 
         			else {
         				d3.select(this).classed("selected",true);
         				d3.select(this).style({stroke: '#F08C00', 'stroke-width':'0.3px'});
         			}	
         		} 
         	});
         
			//.on('mouseover', function(d){ d3.select(this).style({stroke: '#F08C00', 'stroke-width':'0.3px'});})
         //.on('mouseout', function(d){ d3.select(this).style({stroke: '', 'stroke-width':''}); })

}

function addcloud(lat,lon,image,score){
	var gpoint = g.append("g").attr("class","gpoint");
	var x_coord = projection([lat,lon])[0];
	var y_coord = projection([lat,lon])[1];
	var x_diff = projection([lat+1.4,lon+1.4])[0];
	var y_diff = projection([lat+1.4,lon+1.4])[1];	
	var yheight = 	Math.abs(y_diff-y_coord);
	var xwidth = Math.abs(x_diff-x_coord);
	
	
	if (x_coord==null || isNaN(x_coord) || isNaN(x_diff) || x_diff==null || isNaN(xwidth)){
		return;
	}	
	if (y_coord==null || isNaN(y_coord) || isNaN(y_diff) || y_diff==null || isNaN(yheight)){
		return;
	}	
	var cloud_opacity = .9;
	/*switch(true) {
		case (score<=five_sd_sad):
			cloud_opacity = .9;	
			break;
		
		case (score<=four_sd_sad):
			cloud_opacity = .85;	
			break;	
		
		case (score<=three_sd_sad):	
			cloud_opacity = .8;	
			break;			
	
		case (score<=two_sd_sad):
			cloud_opacity = .75;	
			break;			
		
		case (score<=one_sd_sad):
			cloud_opacity = .7;	
			break;			
		
		case (score<=median):
			cloud_opacity = .65;	
			break;			
	}*/
	gpoint.append("image")
			.attr("xlink:href",image)
			.attr("x",x_coord)
			.attr("y",y_coord)
			.attr("height",yheight)
			.attr("width",xwidth)
			.attr("opacity",cloud_opacity)
			.attr("preserveAspectRatio","none");
}

function addsparkle(lat,lon,image){
	var gpoint = g.append("g").attr("class","gpoint");
	var x_coord = projection([lat,lon])[0];
	var y_coord = projection([lat,lon])[1];
	var x_diff = projection([lat+1.4,lon+1.4])[0];
	var y_diff = projection([lat+1.4,lon+1.4])[1];	
	var yheight = 	Math.abs(y_diff-y_coord);
	var xwidth = Math.abs(x_diff-x_coord);
	
	
	if (x_coord==null || isNaN(x_coord) || isNaN(x_diff) || x_diff==null || isNaN(xwidth)){
		return;
	}	
	if (y_coord==null || isNaN(y_coord) || isNaN(y_diff) || y_diff==null || isNaN(yheight)){
		return;
	}	
	//var div_id = "slideshow"+div_count;

	/*var div_slideshow = gpoint.append("div")
									  .classed("slideshow",true)
									  .attr("id",div_id);
*/
	//div_slideshow.append("image")
	gpoint.append("image")
			.attr("xlink:href",image)
			.attr("x",x_coord)
			.attr("y",y_coord)
			.attr("height",yheight)
			.attr("width",xwidth)
			.attr("opacity",.9)
			.attr("preserveAspectRatio","none");
	/*div_slideshow.append("image")
			.attr("xlink:href","marchingsq/sparkles/1.png")
			.attr("x",x_coord)
			.attr("y",y_coord)
			.attr("height",yheight)
			.attr("width",xwidth)
			.attr("opacity",1)
			.attr("preserveAspectRatio","none");
	div_slideshow.append("image")
			.attr("xlink:href","marchingsq/sparkles/2.png")
			.attr("x",x_coord)
			.attr("y",y_coord)
			.attr("height",yheight)
			.attr("width",xwidth)
			.attr("opacity",1)
			.attr("preserveAspectRatio","none");
		*/	
	//jQuery('#'+div_id).cycle();
			
}

function addlightning(lat,lon,direc){
	var gpoint = g.append("g").attr("class","gpoint");
	var x_coord = projection([lat,lon])[0];
	var y_coord = projection([lat,lon])[1];
	var x_diff = projection([lat+1.4,lon+1.4])[0];
	var y_diff = projection([lat+1.4,lon+1.4])[1];	
	var yheight = 	Math.abs(y_diff-y_coord);
	var xwidth = Math.abs(x_diff-x_coord);
	
	
	if (x_coord==null || isNaN(x_coord) || isNaN(x_diff) || x_diff==null || isNaN(xwidth)){
		return;
	}	
	if (y_coord==null || isNaN(y_coord) || isNaN(y_diff) || y_diff==null || isNaN(yheight)){
		return;
	}	
	var div_id = "slideshow"+div_count;
	gpoint.append("image")
			.attr("xlink:href","marchingsq/single/lightning/"+direc+".png")
			.attr("x",x_coord)
			.attr("y",y_coord)
			.attr("height",yheight)
			.attr("width",xwidth)
			.attr("opacity",1)
			.attr("preserveAspectRatio","none");
}

function addrain(lat,lon,direc){
	var gpoint = g.append("g").attr("class","gpoint");
	var x_coord = projection([lat,lon])[0];
	var y_coord = projection([lat,lon])[1];
	var x_diff = projection([lat+1.4,lon+1.4])[0];
	var y_diff = projection([lat+1.4,lon+1.4])[1];	
	var yheight = 	Math.abs(y_diff-y_coord);
	var xwidth = Math.abs(x_diff-x_coord);
	
	
	if (x_coord==null || isNaN(x_coord) || isNaN(x_diff) || x_diff==null || isNaN(xwidth)){
		return;
	}	
	if (y_coord==null || isNaN(y_coord) || isNaN(y_diff) || y_diff==null || isNaN(yheight)){
		return;
	}	
	var div_id = "slideshow"+div_count;
	gpoint.append("image")
			.attr("xlink:href","marchingsq/single/rain/2.png")
			.attr("x",x_coord)
			.attr("y",y_coord)
			.attr("height",yheight)
			.attr("width",xwidth)
			.attr("opacity",1)
			.attr("preserveAspectRatio","none");
}

function addrainbow(lat,lon) {
	var gpoint = g.append("g").attr("class","gpoint");
	var x_coord = projection([lat,lon])[0];
	var y_coord = projection([lat,lon])[1];
	var x_diff = projection([lat+1.4,lon+1.4])[0];
	var y_diff = projection([lat+1.4,lon+1.4])[1];	
	var yheight = 	Math.abs(y_diff-y_coord);
	var xwidth = Math.abs(x_diff-x_coord);
	
	
	if (x_coord==null || isNaN(x_coord) || isNaN(x_diff) || x_diff==null || isNaN(xwidth)){
		return;
	}	
	if (y_coord==null || isNaN(y_coord) || isNaN(y_diff) || y_diff==null || isNaN(yheight)){
		return;
	}	
	var div_id = "slideshow"+div_count;
	gpoint.append("image")
			.attr("xlink:href","marchingsq/sparkles/rainbows/2.png")
			.attr("x",x_coord)
			.attr("y",y_coord)
			.attr("height",yheight)
			.attr("width",xwidth)
			.attr("opacity",1)
			.attr("preserveAspectRatio","none");
}