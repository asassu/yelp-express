var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword

        // TODO: lookup restaurants whose names contain the given keyword
        //var rs = [restaurants[6], restaurants[10]] // hardcoded for 'Pizza'
        function findRestaurants(element){
            if(~element.name.indexOf(keyword)){
                return element
            }

        }
        var rs = restaurants.filter(findRestaurants)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants good for  :x
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        function findGoodFor(element){
            if(element.attributes["Good For"]){
                if((element.attributes["Good For"][x])){
                    return element
                }
            }
        }
        var rs = restaurants.filter(findGoodFor)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        function findAmbience(element){
            if(element.attributes["Ambience"]){
                if(element.attributes["Ambience"][x])
                    return element
            }
        }
        var rs = restaurants.filter(findAmbience)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants belonging to category :x
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        function findCategory(element){
            if(element["categories"]){
                for(i=0; i < element["categories"].length; i++){
                    if(element["categories"][i] == x){
                        return element
                    }
                }
            }
        }
        var rs = restaurants.filter(findCategory)
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        // TODO: lookup restaurants with starts higher or lower than :number
       // var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        function findRelation(element){
            if(relationship == "above"){
                if(element.stars > number){
                    return element
                }
            }
            if(relationship == "below"){
                if(element.stars < number){
                    return element
                }
            }
        }
        var rs = restaurants.filter(findRelation)
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/q', function(req, res) {
                
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience    
        
        console.log('req.query: ', req.query)    
        
        // // TODO: lookup restaurants with the given query parameters
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        function findRes(element){
            var retName=true
            var retMin=true
            var retCat=true
            var retAmb=true
            if(name){
                if(~element.name.indexOf(name))
                    retName=true
                else
                    retName=false
            }
            if(minStars){
                if(element.stars >= minStars)
                    retMin=true
                else
                    retMin=false
            }
            if(category){
                if(element["category"]){
                    if(element["category"].includes(category))
                        retCat=true
                }
                else
                    retCat=false
            }
            if(ambience){
                if(element.attributes["Ambience"]){
                    if(element.attributes["Ambience"][ambience])
                        retAmb=true
                }
                else
                    retAmb=false
            }
            if(retName&&retMin&&retCat&&retAmb)
                return element
        }
        var rs=restaurants.filter(findRes)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

}