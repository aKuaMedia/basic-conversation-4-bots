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
            return true;
        }

        return Entity;
    })();

    module.exports = Entity;
}).call(this);
