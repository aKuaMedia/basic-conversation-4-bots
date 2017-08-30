"use strinct";

(function() {

    var Entity;

    Entity = (function() {
        function Entity() {}

        Entity.prototype.is = function(obj) {
            if (obj && obj.type && obj.type=="entity") {
                return true;
            } 
            return false;
        };

        Entity.prototype.process = function(obj) {
            console.log('Processing ENTITY "'+obj.name+'"...');

            if (!obj || !obj.values || !obj.values.length>0) {
                console.warn('ENTITY without values: "'+obj.name+'"');
                return false;
            }

            var checkConsistency = true;
            obj.values.forEach(function(value) {
                if (!value.value) {
                    console.warn('ENTITY "'+obj.name+'" has same VALUE MALFORMED: '+JSON.stringify(value));
                    checkConsistency=false;
                }
            }, this);
            if (!checkConsistency) return false;
            


            
            return true;
        }

        return Entity;
    })();

    module.exports = Entity;
}).call(this);
