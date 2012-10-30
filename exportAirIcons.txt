/***********
PSD
save this as .jsx in folder -> CS5/Presets/Scripts/ 
restart psd
create and save a psd document
goto file/script and run your script...

Does:
- Exports selected layer (single layer) to AIR icons [128, 48, 32, 16].
- Saves to active documents path.
- Prompts for name

/lnsiu

************/



//set sizes you want to export to...
var sizearr = [128,114,72,48,36,32,16];


function docCheck() 
{
    // check to see that there is at least one document open
    if (!documents.length) {
        alert('There are no documents open.');
        return; // quit
    }
}
docCheck();


//set unit preferences
var strtRulerUnits = app.preferences.rulerUnits;
var strtTypeUnits = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;


//create a new slideshow package
function createAirIcons()
{            
    var orginalDoc = app.activeDocument;
    var orgpath = orginalDoc.path;
    
    var duplicateDoc = app.activeDocument.duplicate();      


    // Set RGB Mode.
    duplicateDoc.changeMode(ChangeMode.RGB);  
                                       
    // All other layers off.
    setInvisibleAllArtLayers(duplicateDoc);
                           
    // Selected layer visible.
    duplicateDoc.activeLayer.visible = true; 


    // file name.
    var fileName = prompt("File Name, No extension, eg background", ""); 
    if(fileName==null) return; // You clicked cancel.
    
    // save options PNG
    var pngOptions = new PNGSaveOptions();
    pngOptions.interlaced = false;
    
    for(var i=0;i<sizearr.length;i++)
    {
        orginalDoc = app.activeDocument;//duplicate
        duplicateDoc = app.activeDocument.duplicate();
        activeDocument.resizeImage(null,sizearr[i],sizearr[i],ResampleMethod.BICUBICSHARPER);
        activeDocument.saveAs(File(orgpath + "/" + fileName + "_" + sizearr[i] + ".png"), pngOptions, true);
        activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }


    //close duplicate
    activeDocument.close(SaveOptions.DONOTSAVECHANGES);
 
}      
// layers off.
function setInvisibleAllArtLayers(obj) {
    for( var i = 0; i < obj.artLayers.length; i++) {
        if (obj.artLayers[i].name != "Background") {
            obj.artLayers[i].allLocked = false;
            obj.artLayers[i].visible = false;
        }
    }
    for( var i = 0; i < obj.layerSets.length; i++) {
        setInvisibleAllArtLayers(obj.layerSets[i]);
    }
}


//create air icons
createAirIcons();