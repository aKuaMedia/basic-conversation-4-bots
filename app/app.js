var fs = require('fs');
var path=require("path");
var EntityClass = require('./entity');
var entity = new EntityClass();
var IntentClass = require('./intent');
var intent = new IntentClass();

var args = process.argv.slice(2, process.argv.length);
var processedDirs = 0;
var processedItems = 0;
var skippedItems = 0;
var processedEntities = 0;
var processedIntents = 0;

init();

function init() {
    
    if (!args || args.length<1) {
        console.info('Processing ALL directories');
        args = new Array();
        args.push(process.cwd()); //['.'];
    }

    var initialFolder = args[0];


    args.forEach(function(argItem) {
        //console.log('\nARG '+itNum+':\t'+argItem);
        if (fs.existsSync(argItem)) {

            // Check if absolute or relative path
            if (argItem.substr(0, 1)!=="/") {
                // Relative Path
                argItem = process.cwd() + "/" + argItem;
            }

            // Remove slash if closing arg
            if (argItem.substr(argItem.length-1, 1)==="/") {
                argItem = argItem.substr(0, argItem.length-1);
            }

            filestats = fs.lstatSync(argItem);
            if (filestats.isDirectory()) {
                listItemsInDir(argItem);
            } else if (filestats.isFile()) {
                processFile(argItem);
            } else {
                console.warn('Element NOT PROCESSED: "'+argItem+'"');
                skippedItems++;
            }
        }
    }, this);
    // console.log('SUMMARY:\n');
    // console.log('Proccessed '+processedDirs+' directories\n');
    // console.log('Proccessed '+processedItems+' files\n');
    // console.log('Skipped '+skippedItems+' elements\n');
    // console.log('\nEND\n\n');
}

function listItemsInDir(dirPath) {
    console.info('Proccesing directory "'+dirPath+'"');
    processedDirs++;
    fs.readdir(dirPath, (err, files) => {
        if (err) throw err;

        files.forEach(function(element) {
            filestats = fs.lstatSync(dirPath+'/'+element);
            if (filestats.isDirectory()) {
                listItemsInDir(dirPath+'/'+element);
            } else if (filestats.isFile()) {
                processFile(dirPath+'/'+element);
            } else {
                console.warn('Element NOT PROCESSED: "'+dirPath+'/'+element+'"');
                skippedItems++;
            }
        }, this);
        //console.log(files);
    });
};

function processFile(pathToFile) {
    //filestats = fs.lstatSync(pathToFile);
    processedItems++;
    console.info('Processing file "'+pathToFile+'"');

    var fileObjContent = require(pathToFile);
    if (entity.is(fileObjContent)) {
        
        fileObjContent.name = path.basename(pathToFile, path.extname(pathToFile));
        if (entity.process(fileObjContent)) {
            console.info('Entity processed: "'+fileObjContent.name+'"');
            processedEntities++;
        }
    } else if(intent.is(fileObjContent)) {

        fileObjContent.name = path.basename(pathToFile, path.extname(pathToFile));
        if (intent.process(fileObjContent)) {
            console.info('Intent processed: "'+fileObjContent.name+'"');
            processedIntents++;
        }
    } else {
        console.warn('File NOT PROCESSED (neither entity nor intent type): "'+pathToFile+'"');
    }
}

