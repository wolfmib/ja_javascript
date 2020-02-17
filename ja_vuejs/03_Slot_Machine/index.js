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
src = "jqyery-1.4.2min.js"


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



//Example Col Row
/*
          col1    col2    col3    col4    col5
row_0
row_1
row_2

*/



// [Input-Method-Un: Utiliser configure text dans la code]
items_r_0_col_1 = ['today','next_week','_last_year','tomorrow_','_yesterday']

// Initial global variable example
var items_r_0_col_2 = []


// [Input-Method-Deux]: Utiliser json_file
// Referenced Link: https://stackoverflow.com/questions/7346563/loading-local-json-file
// Rrefernexed LInk for how to load jquery :https://www.digitalocean.com/community/tutorials/an-introduction-to-jquery
    /*
      <script>
        var myJSON = '{"name":"John", "age":31, "city":"New York"}';
        var myObj = JSON.parse(myJSON);
        document.getElementById("demo").innerHTML = myObj.name;
        </script>
    */

$.getJSON('./rolling_table.json',function(json){
  console.log("[Jean]: Le JOSN text est ...");
  console.log(json);
  console.log("-----------------------------");
  json.forEach(x => {console.log(x.name,x.values); });
}); 


load_all_json_object = $.getJSON('./rolling_table.json',function(json){
  var objects = [];
  // For loop each object example
  for (var i in json){

    console.log('typeof json[i]   = ',(typeof json[i]))
    console.log('json[i]          =',json[i])
    console.log("test_i           = ",i)

    _obj_ = json[i]
    if (_obj_.name == "row_0_col_2"){
      console.log("Got the key   =",_obj_.name)
      console.log("with value    =",_obj_.values)

      // For loop each object's values and push into array example
      _obj_.values.forEach(function(item,index,array){
        console.log("Add the   ",item,"  with index ",index," into items_r_0_col_2 by push ")
        items_r_0_col_2.push(item)
      })
    }  
  };
})



/* Not used 
fetch('rolling_table.json')
  .then(response => response.json())
  .then(json => console.log(json));
//items_r_0_col_2 = 
*/


console.log("[Jason]: load_all_json_object as foolowing...")
console.log(load_all_json_object)
console.log("[Jason]: the rolling_symbols from jsonfiles ...")
console.log(items_r_0_col_2)





const slotMachine = {
	data: function() {
  	return {
      slots: [{
        title: "Col1",
        items: items_r_0_col_1,  // [Input-Method-Un: Utiliser configure text dans la code]
        curr_pos: 0,
        row_index: 0
      },{
      	title: "Col2",
        items: items_r_0_col_2,  // [Input-Method-Deux]: Utiliser json_file 
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


