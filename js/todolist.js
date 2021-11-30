$(function(){
	// 思路：把输入框的内容存到本地存储中，刷新或者关闭页面数据不会丢失
	//改变数据时从本地取出数据进行操作，操作完成后在存入到本地存储
	//从本地存储中取数据渲染到页面中
	
	
	//页面开始先加载数据
	load();
	//给输入框绑定键按下事件
	$("#title").on("keydown",function(e){
		//判断键按下的keyCode    13是回车键
		if(e.keyCode === 13 ){
			//输入框内容为空则弹出提示
			if($(this).val() === ""){
				alert("请输入内容！！");
			}else{
				// 先读取本地存储原来的数据
				var local = getData();
				//console.log(local);
				//存储的数据格式  var todolist = [{title: "xxx", done: false}] 数组
				// 把local数组进行更新数据 把最新的数据追加给local数组
				local.push({ title: $(this).val(), done: false });
				 // 把这个数组local 存储给本地存储
				saveData(local);
				//toDoList 本地存储数据渲染加载到页面
				load();
				//清空输入框
				$(this).val("");
			}
		}
	});
	//点击a删除
	$("ol,ul").on("click","a",function(){
		//alert('1')
		var data = getData();
		//根据ID获取index
		var index = $(this).attr("id");
		//删除相应的列
		data.splice(index,1);
		saveData(data);
		load();
		
	});
	// 正在进行和已完成选项操作
	$("ol,ul").on('click','input',function(){
		var data = getData();
		 // 修改数据
		var index = $(this).siblings("a").attr("id");
		data[index].done = $(this).prop('checked');
		saveData(data);
		load();
		
	});
	//从本地获取数据
	function getData(){
		var data = localStorage.getItem('todolist');
		if(data!==null){
			// 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
			return JSON.parse(data);
		}else{
			return [];
		}
	};
	//把数据保存到本地
	function saveData(data){
		// 本地存储里面的数据是字符串格式的 JSON.stringify(data)转换为字符串格式
		localStorage.setItem('todolist', JSON.stringify(data));
		//console.log(data);
	};
	//渲染页面
	function load(){
		var data = getData();
		 // 遍历之前先要清空ol里面的元素内容
		$("ol,ul").empty();
		var todoCount = 0; // 正在进行的个数
		var doneCount = 0; // 已经完成的个数
		$.each(data,function(i,n){
			if(n.done){
				$("ul").prepend('<li><input type = "checkbox" checked = "checked"> <p> '+ n.title +'</p> <a href ="javascript:;" id = '+i+'></a> </li>');
				doneCount++;
			}else{
				 $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
				todoCount++;
			}
		});
		$("#todocount").text(todoCount);
		$("#donecount").text(doneCount);
	}
})