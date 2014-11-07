//Camera App Framework Plugin 

/*
Copyright (c) 2013 Intel(R) Corporation

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
*/

//This object is called using $().cameraPlugin()
(function($){
    $.fn.cameraPlugin=function(){
	
		return {
		
			//This is just a simple test function 
			helloWorld:function() {
			
				alert("hello world");
			
			},
			
			
			capturePhoto:function() {
				AppMobi.camera.takePicture(50,false,"jpg");
			},
			
			onCamera:function(evt) {
			
				console.log("in onCamera event");

				if (evt.type == "appMobi.camera.picture.add")
				{
					if (evt.success == true)
					{
						// create image 
						var largeImage = document.getElementById('largeImage');

						//show the filename in the console
						console.log(evt.filename);

						//save the image
						largeImage.src=AppMobi.camera.getPictureURL(evt.filename);
						largeImage.style.width="100%";
						largeImage.style.display="block";
					}
					else
					{
						if (evt.message != undefined)
						{
							alert(evt.message);
						}
						else
						{
							alert("error taking picture");
						}
					}
				}
				
				if (evt.type == "appMobi.camera.picture.busy")
				{
					console.log("busy");
				}
						
				if (evt.type == "appMobi.camera.picture.cancel")
				{
					console.log("canceled");
				}
			},
			
			importPicture:function() {
				AppMobi.camera.importPicture();	
			},
			
			showPictureList:function() {
			
				console.log("in show picture list");
			
				var arrPictureList = AppMobi.camera.getPictureList();
				if (arrPictureList.length > 1)
				{
				  AppMobi.camera.deletePicture(arrPictureList[0]);
				  arrPictureList = AppMobi.camera.getPictureList();
				}
				document.getElementById("largeImage").style.display="none";
				for (var x=0;x<arrPictureList.length;x++)
				{
					// create image 
					var newImage = document.createElement('img');
					newImage.src=AppMobi.camera.getPictureURL(arrPictureList[x]);
					newImage.setAttribute("style","width:100px;height:100px;");
					newImage.id=document.getElementById("img_" + arrPictureList[x]);
					document.body.appendChild(newImage);
				}
			},
			
			init:function(cameraPanelDiv) {
			
			    console.log("camera plugin initialized");
			
				document.addEventListener("appMobi.camera.picture.add",$().cameraPlugin().onCamera); 
				document.addEventListener("appMobi.camera.picture.busy",$().cameraPlugin().onCamera); 
				document.addEventListener("appMobi.camera.picture.cancel",$().cameraPlugin().onCamera); 

				console.log("camera object wrapper initialized");

				document.getElementById(cameraPanelDiv).innerHTML = "";
			
				//inject a div to display an image and a camera button
				cameraDiv = document.createElement('div');
				cameraDiv.id = "cameradiv";
				document.getElementById(cameraPanelDiv).appendChild(cameraDiv);

				imgLarge = document.createElement('img');
				imgLarge.id = "largeImage";
				imgLarge.setAttribute("style","display:none;width:100%;");
				document.getElementById("cameradiv").appendChild(imgLarge);

				/*
				btnCapture = document.createElement('button');
				btnCapture.id = "btnPicture";
				btnCapture.innerText = "Take Picture";
				btnCapture.addEventListener("touchstart",objCamera.capturePhoto);
				document.getElementById("cameradiv").appendChild(btnCapture);
				*/
			
			}
			
		}
				

	
 
    };
})(af)

//Include the ID of the DIV ID to update with the map here
$().cameraPlugin().init("cam");

