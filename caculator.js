var action,//已经记录但尚未运算的动作
	in_reset = 1,//是否全部清零重置
	in_number = 0,//是否在输入数字中
	result,
	n,//记录最后一位数字
	in_operate = 0;

$(".number").click(function(){
	n = $(this).text();
	n = String(n)
	
	//初次输入
	if( in_reset == 1 ){
		$(".small").text('');
		in_reset = 0;
		in_number = 1;
	}else{
		//是否处在数字输入状态中
		if( in_number == 0 ){
			in_number = 1;
		}else{
			n = $(".big").text() + n;
		}
	}
	
	$(".big").text(n);
	
});

$(".action").click(function(){
	n = Number(n);
	
	if( in_reset == 1 ){
		in_reset = 0;
	}
	
	if( in_operate == 0 ){ //是否初次输入操作符
	
		action = $(this).data("action");//记录下这一步的操作
		
		$(".small").text(n + $(this).text());
		
		result = n;
		
		in_operate = 1;
		
	}else{
		if( in_number != 0 ){
			result = caculationAction(result, n, action);//执行上一步记录的操作
			
			$(".big").text(result);//显示操作结果
			
			var o = $(".small").text();
			
			$(".small").text(o + n + $(this).text());
			
			action = $(this).data("action");
		}else{
			if( $(this).data("action") != action ){
				action = $(this).data("action")
				var o = $(".small").text().slice(0,-1) + $(this).text();
				 $(".small").text(o);
			}
		}
	}
	in_number = 0;
});

$("#res").click(function(){
	
	//立即运算并显示结果
	result = caculationAction(result, n, action);
	$(".big").text(result);
	$(".small").text('');
	
	//重置
	in_reset = 1;
	in_number = 0;
	in_operate = 0;
});

//全部清除重置
$("#reset").click(function(){
	in_reset = 1;
	in_operate = 0;
	in_number = 0;
	$(".small").text('');
	$(".big").text(0);
});

//后退
$("#back").click(function(){
	if(in_number > 0){
		var o = $(".big").text()
		$(".big").text(o.slice(0,-1));
	}
});


function caculationAction(number1, number2, a){
	var result;
	
	//检验是否有小数点
	
	var n1 = number1.toString();
	var n2 = number2.toString();
	var f1,f2,f;
	
	if( n1.indexOf('.') > 0 ){
		f1 = n1.split(".")[1].length; 
		n1 = n1.split(".")[0] + n1.split(".")[1];
	}else{
		f1 = 0;
	}
	
	if( n2.indexOf('.') > 0 ){
		f2 = n2.split(".")[1].length;
		n2 = n2.split(".")[0] + n2.split(".")[1];
	}else{
		f2 = 0;
	}
	
	if (f1 >= 0 && f2 >= 0){

		//判断出最大的小数点位数，并赋值给f
		if( f1 > f2){
			f = f1;
			n2 = n2 * (Math.pow(10,f1-f2));
			
		}else{
			f = f2;
			n1 = n1 * (Math.pow(10,f2-f1));
		}	
		
		result = Caculate(n1, n2, a, f);
		
	}else{
				
		//没有小数点，直接计算
		result = Caculate(n1, n2, a);
		
	}
	
	return result;
}

function Caculate(number1,number2,a,f){
	var result
	var n1 = Number(number1);
	var n2 = Number(number2);
	if( f ){
		f = Math.pow(10,f);
		
	}
	switch(a){
		case "plus":
			result = n1 + n2;
			if(f){
				result = result / f;
			}
			break;
		case "minus" : 
			result = n1 - n2;
			if(f){
				result = result / f;
			}
			break;
		case "mutiply" :
			result = n1 * n2;
			if(f){
				result = result / Math.pow(f,2);
			}
			break;
		case "except" :
			result = n1 / n2
			break;
	}
	return result;	
}