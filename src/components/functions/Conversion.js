

    export const convertDate = (currentDate) => {
    let newDate = new Date(currentDate);
    let options = {year: 'numeric', month: 'long', day: 'numeric'}
    if (currentDate == null){
        return "In Progress"
    }else{
        return newDate.toLocaleDateString("en-US", options)
    }
   
    }

    export const calculateCost=(array)=>{
        console.log(array)
        if (array.length > 0){
            let cost = array.map((item)=>item.milestoneActualCost)
            console.log(cost)
            let reduceCost =  cost.reduce((a,b)=> a+b)
            if (reduceCost == null){
                return 0
            }else{
                return reduceCost.toFixed(2)
            }
            
        }else{
            return 0
     
        }
  
  
    }

    export const calculateProgress=(array)=>{
        const total = array.length
        const completed = array.filter((item)=> item.completedDate != null)
        const progress = completed.length *10/total *10
        if(total == 0){
            return 0 +'%'
        }else{
            return progress.toFixed(0) +"%"
        }
    
 
  
  
    }
  


