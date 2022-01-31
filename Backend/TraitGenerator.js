module.exports = {
    
    titleCase : function (string){
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    },
    addBoost: function ( name, value) {
  
        value = String(value)
        name =  String(name)

            let Boost = {
                "display_type": null,
                "trait_type": this.titleCase(name),
                "value": 0
            }

            if (/^\d+(\.\d+)?%$/.test(value)) {
                console.log(" has percentage sign")
                Boost.display_type = "boost_percentage"
                value = value.replace('%', '')
            } else {
               // no percentage sign
               Boost.display_type = "boost_number"
            }

            value.trim()

            if(value.match(/^-?\d+$/) || value.match(/^\d+\.\d+$/))
            {
                console.log(" passes check")
                Boost.value = parseFloat(value)

            }else{
                return false
              }
    return Boost
    },
    setNumericTraitWithUpperBound: function (name, value, maxVal = "10") {

        
        value = String(value)
        name =  String(name)
        maxVal = String(maxVal)

            let Trait = {
                "trait_type": this.titleCase(name),
                "value": 0,
                "max_value": 0
            }


            value.trim()
            maxVal.trim()

           
            if((value.match(/^-?\d+$/) || value.match(/^\d+\.\d+$/)) && maxVal.match(/^-?\d+$/) || maxVal.match(/^\d+\.\d+$/) )

            {   
                const parsedValue = parseFloat(value)
                const parsedMaxValue = parseFloat(maxVal)

                if (parsedValue > parsedMaxValue)
                    return false

                console.log("passes check")
                Trait.value = parsedValue
                Trait.max_value = parsedMaxValue

            }else{
                return false
              }
    return Trait
    },
    setLiteralTrait: function (name, value) {


        if (!(typeof name === 'string' || name instanceof String) && !(typeof value === 'string' || value instanceof String) ) 
             return false
        
        value.trim()
        name.trim()

        let Trait = {
                "trait_type": this.titleCase(name), 
                "value": this.titleCase(value)
            }
    return Trait
    },
    setNumericTrait: function (name, value) {

        
        value = String(value)
        name =  String(name)
   

            let Trait = {
                "trait_type": this.titleCase(name),
                "value": 0,
                
            }

            value.trim()
           
            if((value.match(/^-?\d+$/) || value.match(/^\d+\.\d+$/)))

            {   
                const parsedValue = parseFloat(value)
                Trait.value = parsedValue
            }else{
                return false
              }
    return Trait
    },
    setGeneration: function (value) {
     
        value = String(value)
        
            let Generation = {
                "display_type": "number", 
                "trait_type": "Generation", 
                "value": 0
                
            }

            value.trim()
           
            if((value.match(/^-?\d+$/) || value.match(/^\d+\.\d+$/)))

            {   
                const parsedValue = parseFloat(value)
                Generation.value = parsedValue
            }else{
                return false
              }
    return Generation
    },
    setDateOfBirth : function (value){
   
          value = String(value)
        
          let BirthDay = {
            "display_type": "date", 
            "trait_type": "birthday", 
            "value": 0 //(must be eposh time stamp - Ex : 1546360800 --> Tuesday January 1st 2019)        
          }

          value.trim()
         
          if((value.match(/^-?\d+$/) || value.match(/^\d+\.\d+$/)))
          {   
              const parsedValue = parseInt(value)
              BirthDay.value = parsedValue
          }else return false
            
        return BirthDay
        
    },
    setBooleanLiteralTrait: function (name, value = false) {


        if (!(typeof name === 'string' || name instanceof String) && typeof(value) !== "boolean" ) 
             return false
     
        name.trim()

        let Trait = {
                "trait_type": this.titleCase(name), 
                "value": value
            }
    return Trait
    },
    
  };