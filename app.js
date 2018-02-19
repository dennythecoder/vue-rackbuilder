app = new Vue({

    el:'#app',
    data:{
        page:1,
        ribbons:ribbons,
        filter:'',
        rack:[],
        rackWidth:3
    },
    computed:{

        rows:function(){
            var ribbons = this.rack.filter(function(ribbon){return true;}).sort(function(a,b){
                if(a.id < b.id) return -1;
                if(a.id > b.id) return 1;
                return 0;
            });
            var result = [];
            var topRowWidth = ribbons.length % this.rackWidth;
            result.push(ribbons.splice(0,topRowWidth));


            for(var i = 0; i < Math.ceil(ribbons.length / this.rackWidth);i++){
                var row = [];
                for(var j = 0; j < this.rackWidth; j++){
                
                    var ribbon = ribbons[j + (this.rackWidth * i)];
                    if(ribbon){
                        row.push(ribbon);
                    }
                    
                }
                result.push(row);
            }

            return result;

        },

        paginatedRibbons:function(){
            var startIndex = (this.page - 1) * 10,
                endIndex = this.page * 10;
            var ribbons = this.filteredRibbons;
            var result = [];
            for(var i = startIndex ; i < endIndex && i < ribbons.length; i++){
                result.push(ribbons[i]);
            }

            return result;
        },
        filteredRibbons:function(){
            var filter = this.filter.toLowerCase();
            return this.ribbons.filter(function(ribbon){
                var name = ribbon.name.toLowerCase();
                return name.indexOf(filter) !== -1;
            });

        },
        maxPage:function(){
            return Math.ceil(this.filteredRibbons.length / 10);
        }
    },
    methods:{
        moveNextPage:function(){
            if(this.page !== this.maxPage){
                this.page++;

            }
                
        },
        movePreviousPage:function(){
            if(this.page !== 1){
                this.page--;

            }
                
        },
        addToRack:function(ribbon){
            var alreadyInRack = false;
            for(var i = 0; i < this.rack.length; i++){
                var existingRibbon = this.rack[i];
                if(existingRibbon.id === ribbon.id){
                    alreadyInRack = true;
                }
            }
            if(!alreadyInRack){
                this.rack.push(ribbon);
            } 
        },
        removeFromRack:function(ribbon){
          
            for(var i = 0; i < this.rack.length; i++){
                if(ribbon.id === this.rack[i].id){
                    this.rack.splice(i,1);
                }
            }
        }
    }

})