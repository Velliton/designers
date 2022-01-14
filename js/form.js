"use strict"
//проверка что документ загружен
document.addEventListener('DOMContentLoaded',function(){
	//создаём переменную записываем в неё форму`
	const form=document.getElementById('form');	
	
	// при событии сабмит вызываем функцию фрмсенд
	form.addEventListener('submit', formsend);
   // обявляем функцию формсенд
	async function formsend(e){
		//перехватываем управление сабмитом
		e.preventDefault();
			
		//записываем в еррор результат функции фарм валидат
		let error = formValidate(form);

		let formData = new FormData(form);


		if (error===0) {
			form.classList.add('_sending');
			let response=await fetch('sendmail.php',{method: 'POST', body:formData});
		if (response.ok){
			let result = await response.json();
			alert(result.message);
			form.reset();
		} else {
			alert("ошибка");
		}

		} else {
			alert('заполните обязательные поля');
		}


	}

	function formValidate(form){
		let error =0;
		
		//имэйл и имя записываем в формрек
		let formReq = document.querySelectorAll('._req');
		
		for (let index = 0; index < formReq.length; index++){
			const input = formReq[index];			
			formRemoveError(input);
			if(input.classList.contains('_email')){
				if(emailTest(input)){
					error++;
					formAddError(input);
				}
			} else {
				if (input.value==='') {
					formAddError(input);
					error++;
				}
			}
		}

		return error;
	}

	function formAddError(input){
		//input.parentElement.classList.add('_error');
		input.classList.add('_error');
		
	}

	function formRemoveError(input){
		//input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}


	//функция теста email
	function emailTest(input)
	{
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}


})


