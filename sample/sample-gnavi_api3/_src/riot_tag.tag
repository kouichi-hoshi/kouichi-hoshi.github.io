<clicktest>

	<button type=button onclick={ red }>red</button>
	<button type=button onclick={ clear }>clear</button>

	this.red = function() {
		jQuery('body').css('background-color','red');
	}

	this.clear = () => {
		rem(); //外部jsファイルに定義してあるstyle属性を削除する関数を実行
	}

</clicktest>

<slide>

	<div class="sd_slideshow">
		<img each={ items } src={ src }>
	</div>

	this.items = [
		{'src': 'https://placehold.jp/b6e3dc/ffffff/1640x1000.png'},
		{'src': 'https://placehold.jp/dbe3b6/ffffff/1640x1000.png'},
		{'src': 'https://placehold.jp/e3d3b6/ffffff/1640x1000.png'}
	]

	this.on('mount', function(){

		let slid = new sd_slideshow(3000);

		//スライドショウ実行
		slid.slideshow();

		//スライド高さセット実行
	 	slid.heightSet();

	 	//スライドショウ高さ再セット実行
		jQuery(window).on('resize',function() {
			slid.heightSet();
		});

	});

</slide>

<todo>

	<h3>{ title }</h3>
	<ul>
		<li each={ items }>{ title }</li>
	</ul>
	<form onsubmit={ add }>
		<input>
		<button>Add #{ items.length + 1 }</button>
	</form>

	<style>
		todo { display: block }
		todo h3 { font-size: 3rem }
	</style>

	this.title = 'ヘディング';
	this.items = []

	add(e) {
		var input = e.target[0]
		this.items.push({ title: input.value })
		input.value = ''
	}

</todo>
