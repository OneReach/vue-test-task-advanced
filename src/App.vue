<template>
<div>
    <form>
        <div class="wrapper" >
          <input  type="text" placeholder="Select car" list="carlist" v-model="value" @input="getItems" @blur="ReturnCars" @click="getItems();visible=true" >
          <button type="reset" title="Click me to clear the input field" @click="value='' ">&times;</button>  

            <datalist id="carlist" v-show="visible">
              <option v-for="car in result" @click="CompleteInput(car); visible=false" :key="car.model">{{ car.model }}</option>
            </datalist>         
        </div>
      </form>
        </div> 
</template>

<script>
export default {
  name: 'App',
  data() {
    return { 
        cars:[
        {model:'BMW'},
        {model:'Ford'},
        {model:'Audi'},
        {model:'Bentley'},
        {model:'Opel'}
        ],
    result :[],
    value:'',
    visible: false} 
},
  methods:{
    ReturnCars(){
      setTimeout(() => {
        this.result=this.cars
        console.log('Cars reset to original')
      },500)
    },

    CompleteInput(arr){
            this.value=arr.model
            console.log(this.value)
            this.result=this.cars
    },

    getItems() { 
                
                var result = this.cars.filter(car => car.model.includes(this.value))
                //console.log(result)
                if (result.length != []) this.result = result
                else this.result = [{model:'Not match found'}]

                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                     resolve(this.result) ;
                    }, 1000)
                  })      
                  .then((result) => {
                    console.log(this.result);
                  })
       }, 

}
 
}
</script>

<style>
   .wrapper {
    margin: 20px auto;
    position: relative;
    width: 400px;
    font-size: 30px;
      }
    
   .wrapper input {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      outline: none;
      border: 2px solid #aaa;
      border-radius: 5px;
    }
  
  .wrapper  button[type="reset"] {
      position: absolute;
      top: 10px;
      bottom: 10px;
      right: 10px;
      color: #666;
      border: 0;
      display: none;
      padding: 0 10px;
      border-radius: 50%;
      background-color: #fff;
      transition: background 200ms;
      outline: none;
    }
  
   .wrapper input:valid ~ button[type="reset"] {
      display: block;
    }  

</style>
