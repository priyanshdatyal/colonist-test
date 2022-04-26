var app = {
	//initial variables
	canvas  : null,
	context : null,

	//resizing
	width   : document.body.offsetWidth,
	height  : document.body.offsetHeight,

	//nodes
	nodes   : [],

	//timing
	timestamp  : 0,
	now        : 0,
	lastUpdate : 0,


	init : function(){
		this.canvas  = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		this.render();
		this.onInit();
	},
	render : function(){
		this.clear();
		this.update();

		window.requestAnimationFrame(this.render.bind(this));
	},
	clear  : function(){
		this.context.clearRect(0, 0, this.width, this.height);
	},
	update : function(){
	    var dt = Date.now() - this.lastUpdate;

		this.onUpdate(dt);

		for(var index in this.nodes){
			var node = this.nodes[index];

			this.context.fillStyle = node.color;
			this.context.fillRect(node.x, node.y, node.width, node.height);

			if(node.id="ball"){
				this.context.fillStyle=node.color;
				this.context.beginPath();
				this.context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
				this.context.closePath();
				this.context.fill();
				this.context.lineWidth = 1;
				this.context.strokeStyle = 'WHITE';
				this.context.stroke();
			}
		}

		this.lastUpdate = Date.now();
		this.timestamp+=dt;
	},
	getNode : function(id){
		for(var index in this.nodes){
			var node = this.nodes[index];

			if(node.id == id){
				return node;
			}
		}

		return { x : null, y : null, width : null, height : null };
	},
	drawText : function(){},
	// pause:function(){},
	reset:function(){},
	//events
	onInit   : function(){},
	onUpdate : function(){}
};

window.onload = function(){
	app.init();
};