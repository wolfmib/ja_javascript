var app = new Vue({
    el: '#app_01',
    data:{
        message: "Bonjour Vue!"
    }
});

var _temp = new Vue({
    el: "#app_02",
    data:{
        message_02: "You loadded this page on" + new Date().toLocaleString()
    }
})



var var_loop_03 = new Vue({
    el: "#app_loop_03",
    data: {
        seen: true
    }
})


var var_dom_et_for_04 = new Vue({
    el: "#app_dom_et_for_04",
    data: {
        todo_list:[
            {text: 'Learn JS'},
            {text: 'Learn Vue'},
            {text: 'Build Yourown Application'}
        ]
    }
})