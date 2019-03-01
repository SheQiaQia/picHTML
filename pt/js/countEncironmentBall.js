$(function() {

	var main = $("#main");
	var circles = $("#main div");
	var st = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
	var json = [],
		arr = [],
		color = [];
	var maxW = 0;
	var maxH = 0;
	var cwidth = circles[0].offsetWidth;
	var cheight = circles[0].offsetHeight;

	//根据浏览器窗口的大小自动调节小球的运动空间
	window.onresize = function() {
		var main = document.getElementById('main');
		maxW = 750 - circles[0].clientWidth;
		maxH = 500 - circles[0].clientHeight;
		main.style.width = '750px';
		main.style.height = '500px';

	}
	onresize();
	//数组对象的初始化
	for(var i = 0; i < circles.length; i++) {
		arr = [];
		for(var j = 0; j < 6; j++) {
			color[j] = st[Math.floor(Math.random() * 16)];
		}
		arr.x = Math.floor(Math.random() * (maxW + 1)); //初始x坐标
		arr.y = Math.floor(Math.random() * (maxH + 1)); //初始y坐标
		arr.cx = arr.x + circles[0].offsetWidth / 2; //圆心x坐标
		arr.cy = arr.y + circles[0].offsetHeight / 2; //圆心y坐标
		arr.movex = Math.floor(Math.random() * 2); //x轴移动方向
		arr.movey = Math.floor(Math.random() * 2); //y轴移动方向
		arr.bgolor = '#' + color.join(''); //随机生成一个6位字符串
		arr.speed = 1+Math.floor(Math.random()*2);
		//随机生成一个2~6之间的移动速度（如果设置的改变速度太大，容易造成小球碰撞时两个小球之间有重合，也有可能小球会出界）
		arr.timer = null; //计时器
		arr.index = i; //索引值
		json.push(arr);
		circles[i].style.left = arr.x + 'px'; //小球位置初始化
		circles[i].style.top = arr.y + 'px'; //小球位置初始化
		
//		circles[i].style.backgroundColor = arr.bgolor; //小球背景颜色初始化
	}
	//碰撞函数
	function crash(a) {
		var ball1x = json[a].cx;
		var ball1y = json[a].cy;
		for(var i = 0; i < json.length; i++) {
			if(i != a) {
				var ball2x = json[i].cx;
				var ball2y = json[i].cy;
				//圆心距离的平方
				var len = (ball1x - ball2x) * (ball1x - ball2x) + (ball1y - ball2y) * (ball1y - ball2y);
				if(len <= cwidth * cwidth) {
					//小球位置的判断，发生碰撞反应
					if(ball1x > ball2x) {
						if(ball1y > ball2y) {
							json[a].movex = 1;
							json[a].movey = 1;
						} else if(ball1y < ball2y) {
							json[a].movex = 1;
							json[a].movey = 0;
						} else {
							json[a].movex = 1;
						}
					} else if(ball1x < ball2x) {
						if(ball1y > ball2y) {
							json[a].movex = 0;
							json[a].movey = 0;
						} else if(ball1y < ball2y) {
							json[a].movex = 0;
							json[a].movey = 1;
						} else {
							json[a].movex = 0;
						}
					} else {
						if(ball1y > ball2y) {
							json[a].movey = 1;
						} else if(ball1y < ball2y) {
							json[a].movey = 0;
						}
					}
				}
			}

		}
	}
	//移动函数
	function move(circle) {
		circle.timer = setInterval(function() {
			if(circle.movex == 1) {
				circle.x += circle.speed;
				if(circle.x + circle.speed >= maxW) { //防止小球出界
					circle.x = maxW;
					circle.movex = 0; //小球运动方向发生改变
				}
			} else {
				circle.x -= circle.speed;
				if(circle.x - circle.speed <= 0) {
					circle.x = 0;
					circle.movex = 1;
				}
			}
			if(circle.movey == 1) {
				circle.y += circle.speed;
				if(circle.y + circle.speed >= maxH) {
					circle.y = maxH;
					circle.movey = 0;
				}
			} else {
				circle.y -= circle.speed;
				if(circle.y - circle.speed <= 0) {
					circle.y = 0;
					circle.movey = 1;
				}
			}
			circle.cx = circle.x + circles[0].offsetWidth / 2; //小球每一次运动圆心都会发生改变
			circle.cy = circle.y + circles[0].offsetHeight / 2;
			circles[circle.index].style.left = circle.x + 'px'; //小球位置重定位
			circles[circle.index].style.top = circle.y + 'px';
			/*console.log('x'+circle.cx+'y'+circle.cy);*/
			crash(circle.index);
		}, 15);
	}
	//对每一个小球绑定计时器，让小球动起来
	for(var i = 0; i < circles.length; i++) {
		move(json[i]);
	}
})