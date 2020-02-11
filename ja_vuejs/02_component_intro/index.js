// Create component

Vue.component('todo-item' , {
    props: ['todo'],
    template: '<li> {{todo.str}} </li>'
})


var my_comp = new Vue({
    el: '#app_comp',
    data: {
        product_list:[
            {id: 0 , str: "Some Product_01"},
            {id: 1,  str: "Some Product_02"},
            {id: 2,  str: "Some Product_03"}
        ]
    }
})