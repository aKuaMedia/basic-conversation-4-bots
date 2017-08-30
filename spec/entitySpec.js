describe("Entity class unit tests", function() {

    it("Instance of Entity", function() {
        var entityClass = require("./../app/entity/entityClass.js");
        var entityObj = new entityClass();
        expect(entityObj.constructor.name==="Entity").toBe(true);
    });

    it("> Obj is not a json object", function() {
        var entityClass = require("./../app/entity/entityClass.js");
        var entityObj = new entityClass();
        var isEntityObj = entityObj.is("some text, but not a json");
        expect(isEntityObj).toBe(false);
    });

    it("> Obj is not entity", function() {
        var entityClass = require("./../app/entity/entityClass.js");
        var entityObj = new entityClass();
        var isEntityObj = entityObj.is({
            "name": "testEntity",
            "type": "notAnEntity"
        });
        expect(isEntityObj).not.toBe(true);
    });

    it("> Obj is an entity", function() {
        var entityClass = require("./../app/entity/entityClass.js");
        var entityObj = new entityClass();
        var isEntityObj = entityObj.is({
            "name": "testEntity",
            "type": "entity",
            "values": [
                {
                "value": "dias",
                "synonyms": [
                    "días",
                    "mañana"
                ]
                }
            ]
        });
        expect(isEntityObj).toBe(true);
    });

    it("> Obj is an entity and NOT has any value", function() {
        var entityClass = require("./../app/entity/entityClass.js");
        var entityObj = new entityClass();
        var processResult = entityObj.process({
            "name": "testEntity",
            "type": "entity",
            "values": []
        });
        expect(processResult).toBe(false);
    });

    it("> Obj is an entity and has any value", function() {
        var entityClass = require("./../app/entity/entityClass.js");
        var entityObj = new entityClass();
        var processResult = entityObj.process({
            "name": "testEntity",
            "type": "entity",
            "values": [
                {
                    "value": "dias",
                    "synonyms": [
                        "días",
                        "mañana"
                    ]
                }
            ]
        });
        expect(processResult).toBe(true);
    });

    it("> Obj is an entity, has any value and are NOT well formatted", function() {
        var entityClass = require("./../app/entity/entityClass.js");
        var entityObj = new entityClass();
        var processResult = entityObj.process({
            "name": "testEntity",
            "type": "entity",
            "values": [
                {
                    "name": "dias",
                    "synonyms": [
                        "días",
                        "mañana"
                    ]
                }
            ]
        });
        expect(processResult).toBe(false);
    });
    it("> Obj is an entity, has any value and are NOT well formatted", function() {
        var entityClass = require("./../app/entity/entityClass.js");
        var entityObj = new entityClass();
        var processResult = entityObj.process({
            "name": "testEntity",
            "type": "entity",
            "values": [
                {
                    "value": "dias",
                    "synonyms": [
                        "días",
                        "mañana"
                    ]
                }
            ]
        });
        expect(processResult).toBe(true);
    });
});
