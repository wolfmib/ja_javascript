const next = window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   window.msRequestAnimationFrame ||
   window.oRequestAnimationFrame ||
   function(cb) { window.setTimeout(cb, 1000/60) }

const slotMachine = {
	data: function() {
  	return {
      slots: [{
        title: "Col1",
        items: [
          "today",
          "next week",
          "last year",
          "tomorrow",
          "yesterday",
        ],
        curr_pos: 0,
        row_index: 0
      }, {
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
      	title: "Col3",
        items: [
        	"cycling",
          "walking",
          "swimming",
          "flying",
        ],
        curr_pos: 0,
        row_index: 1
      }, {
      	title: "Col4",
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
        row_index: 2
      }, {
      	title: "Col5",
        items: [
        	"cycling",
          "walking",
          "swimming",
          "flying",
        ],
        curr_pos: 0,
        row_index: 2
      }],
      opts: null,
      startedAt: null,
    }
  },
  
  //Previous template, only one row
  template: "<div class='slot-machine'><button @click='start'>start</button> <div class='slot' v-for='slot in slots' ref='slots'> <h2>{{ slot.title }}</h2> <div class='slot__window'> <div class='slot__wrap'> <div class='slot__item' v-for='opt in slot.items'>{{ opt }}</div> <div class='slot__item slot__item--copy' >{{ slot.items[0] }}</div></div> </div> </div> </div>",
    
  //test - 01 fail
  //template: "<div class='slot-machine'><button @click='start'>start</button><div class='slot' v-for='slot in slots' ref='slots'><h2>{{ slot.title }}</h2><div style='position:fixed;top:20;left:20;'>    <div class='slot__window' v-if='slot.row_index === 0'>        <div class='slot__wrap'>            <div class='slot__item' v-for='opt in slot.items'>{{ opt }}</div> <div class='slot__item slot__item--copy'>{{ slot.items[0] }}</div>        </div>    </div></div></div></div>",

  // test-02: fail
  //template: "<div class='slot-machine'><button @click='start'>start</button><div class='slot' v-for='slot in slots' ref='slots'>    <h2>{{ slot.title }}</h2>    <div class='slot__window' style='position:fixed;top:20;left:20;' v-if='slot.row_index === 0'>        <div class='slot__wrap'>            <div class='slot__item' v-for='opt in slot.items'>{{ opt }}</div>            <div class='slot__item slot__item--copy'>{{ slot.items[0] }}</div>        </div>    </div></div></div>",
  methods: {
  	start: function() {
    
    	if (this.opts) {
      	return
      }
    	  		
      this.opts = this.slots.map( (data, i) => {
      	
        const slot = this.$refs.slots[i]
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
      
      next( this.animate )
      
  	},
    
    animate: function(timestamp) {
			if (this.startedAt == null) {
      	this.startedAt = timestamp
      }
      
      const timeDiff = timestamp - this.startedAt
      
      this.opts.forEach( opt => {
      
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