"use strinct";

(function() {

    var Intent;

    Intent = (function() {
        function Intent() {}

        Intent.prototype.is = function(obj) {
            if (obj && obj.type && obj.type=="intent") {
                return true;
            } 
            return false;
        };

        Intent.prototype.process = function(obj) {
            console.log('Processing INTENT "'+obj.name+'"...');
            return true;
        }

        return Intent;
    })();

    module.exports = Intent;
}).call(this);
