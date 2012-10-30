/*
Had to enlarge some psd files dynamically today with a fixed pixel size.

Unfortunately not possible in actions with arbitrary doc size in canvas size dialog, so I used a small script.

save as .jsx in psd preset folder and run through edit/script
*/

var currDoc = activeDocument;
var doc_width = currDoc.width;var doc_height = currDoc.height;
currDoc.resizeCanvas (doc_width + 4, doc_height +4, AnchorPosition.TOPLEFT); 