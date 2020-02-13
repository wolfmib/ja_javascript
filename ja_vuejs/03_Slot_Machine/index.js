const next = window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   window.msRequestAnimationFrame ||
   window.oRequestAnimationFrame ||
   function(cb) { window.setTimeout(cb, 1000/60) }







// Load Excel


// Cree the data format:
// Referenced link:   https://stackoverflow.com/questions/8238407/how-to-parse-excel-file-in-javascript-html5

src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"
src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"


//Cree une function 
var ExcelToJSON = function(){
  this.parseExcel = function(file){
    var reader = new FileReader();

    reader.onload = function(e){
      var data = e.target.result;
      var workbook = XLSX.read(data,{type: 'binary'});

      workbook.SheetNames.forEach(function(sheetName){
        //Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSOn.stringify(XL_row_object);
        console.log(json_object)

      })

    };

    reader.onerror = function(ex){
      console.log(ex);
    }

    reader.readAsBinaryString(file);
  };
};




items_r_0_col_1 = ['today','next_week','_last_year','tomorrow_','_yesterday']






const slotMachine = {
	data: function() {
  	return {
      slots: [{
        title: "Col1",
        items: items_r_0_col_1,
        curr_pos: 0,
        row_index: 0
      },{
      	title: "Col2",
        items: [
        	"at home",
          "at work",
          "at school",
          "at the gym",
          "at the park",
          "at the beach",
          "at the sidewalk",
          "at the city",
        ],
        curr_pos:0,
        row_index: 0
        }, {
        title: "Col1",
        items: [
          "aujourd'hui",
          "la semain prochaine",
          "l'anee deriner",
          "demain",
          "hier",
        ],
        curr_pos: 0,
        row_index: 1
        }, {
        title: "Col2",
        items: [
          "chez moi",
          "travalier",
          "ecole",
          "chez gym",
          "chez park",
          "de la mer",
          "chez marcher",
          "dans la centre-ville",
        ],
        curr_pos: 0,
        row_index: 1
        }],
      opts: null,
      startedAt: null,
    }
  },
  
  //Previous template, only one row
  //template: "<div class='slot-machine'><button @click='start'>start</button> <div class='slot' v-for='slot in slots' ref='slots'> <h2>{{ slot.title }}</h2> <div class='slot__window'> <div class='slot__wrap'> <div class='slot__item' v-for='opt in slot.items'>{{ opt }}</div> <div class='slot__item slot__item--copy' >{{ slot.items[0] }}</div></div> </div> </div> </div>",

  //Ok
  template: "<div class='slot-machine'><button @click='start'>start</button>    <div style='position:absolute;top:60;left:60;'>        <div class='slot' v-for='slot in slots' ref='slots' v-if='slot.row_index === 0'>            <h2 v-if='slot.row_index === 0'  align='center'>{{ slot.title }}</h2>            <div class='slot__window' v-if='slot.row_index === 0'>                <div class='slot__wrap'>                    <div class='slot__item' v-for='opt in slot.items'>{{ opt }}</div>                    <div class='slot__item slot__item--copy'>{{ slot.items[0] }}</div>                </div>            </div>        </div>    </div>    <div style='position:absolute;top:400;left:60;'>        <div class='slot' v-for='slot in slots' ref='slots' v-if='slot.row_index === 1'>            <div class='slot__window' v-if='slot.row_index === 1'>                <div class='slot__wrap'>                    <div class='slot__item' v-for='opt in slot.items'>{{ opt }}</div>                    <div class='slot__item slot__item--copy'>{{ slot.items[0] }}</div>                </div>            </div>        </div>    </div></div>",


  methods: {
  	start: function() {
    
    	if (this.opts) {
      	return
      }
    	  		
      this.opts = this.slots.map( (data, i) => {
      	
        // Load slot from here 
        
        const slot = this.$refs.slots[i]
        console.log('Each i in slots.map = ',i)
        console.log(slot)
        // Random Choice Here
        // ------- code ----
            //const choice = Math.floor( Math.random() * data.items.length )
        //-----------------

        // Obtenir the symbol one by one
        choice = data.curr_pos

        // Add one
        data.curr_pos += 1

        // Handle the curr_pos over the limit
        if (data.curr_pos >= data.items.length){
            // On faire en premier encore, zero
            data.curr_pos = 0
        } else {
            console.log('[Jason]: Next choice_index',data.curr_pos,'is not over',data.items.length)
        }

        console.log("   [Jason]: Current choice: ", choice,'col_index ' ,i, 'text: ',data.items[choice])

        const opts = {
        	el: slot.querySelector('.slot__wrap'),
          finalPos: choice * 180,
          startOffset: 2000 + Math.random() * 500 + i * 500,
          height: data.items.length * 180,
          duration: 3000 + i * 700, // milliseconds
          isFinished: false,
        }
        
        return opts
        
      })
      
      console.log("opt size = ",this.opts)
      console.log("Hello")
      next( this.animate )
      
  	},
    
    animate: function(timestamp) {
			if (this.startedAt == null) {
      	this.startedAt = timestamp
      }
      
      const timeDiff = timestamp - this.startedAt
      
      this.opts.forEach( opt => {
        console.log("Each opts = ",opt)
      	if (opt.isFinished) {
        	return
        }
      		
        const timeRemaining = Math.max(opt.duration - timeDiff, 0)
        const power = 3
        const offset = ( Math.pow(timeRemaining, power) / Math.pow(opt.duration, power) ) * opt.startOffset
        
        // negative, such that slots move from top to bottom
        const pos = -1 * Math.floor((offset + opt.finalPos) % opt.height)
        
        opt.el.style.transform = "translateY(" + pos + "px)"
        
        if ( timeDiff > opt.duration ) {
          console.log('finished', opt, pos, opt.finalPost)
        	opt.isFinished = true
        }
        
      })
      
      if (this.opts.every( o => o.isFinished )) {
      	this.opts = null
        this.startedAt = null
        console.log('finished')
      } else {
        next( this.animate )
      }
    }  
  }
}


new Vue({
  el : '#app',
  
  components: { slotMachine },
  
  data: function() {
  	return {}
  },
  
})


var excel_agent = new Vue({
  el: "#excel_app",

  methods: {
    excel_load: function(){
      
    },
    faire_rien: function(){
      console.log("Faire rien")
    }
  }
})