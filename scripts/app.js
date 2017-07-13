
$( document ).ready(function() {

	var myFacebookToken = "EAACEdEose0cBAIArFLsrwDHjJJWZCZBaknfelnEpBwpyYyZAFTC1A4zGdoKKrWYVxcUrnZB7ef059vAU8fKQPQBe2fgRJvu6IpiUGhCs1B7JoQ5oCVnR0d2IKVHnCAEZA0FcHfbXOa9I6TgXiwmo31eP8scijmPbhm2Ro2FX1w7Ue0pv00J8RqlTMogJslbwZD";
	 
	/*Function to display the Home Page to the User*/

	if($(window).width() >= 767) {
	 		
	 	$("#profile-image").fadeIn(500)
		 		
		$("#user-name").fadeIn(500);
	}

	$(document).on("click", "#home, #profile, #feed", function() {

		$("button").attr("aria-expanded","false");

		$("button").addClass("collapsed");
		
		$("#myNav").attr("aria-expanded","false");
		
		$("#myNav").addClass("collapsing").delay(1000).removeClass("collapsing").delay(1000).removeClass("collapse in").addClass("collapse");
		
	});	 		
	
	function getHomePage() {

		$(".navbar-default").css("background-color" , "rgba(0, 119, 181, 0.85");

	 	$("#feed-page").hide();
	 	
	 	$("#profile-page").hide()
	 	
	 	$("#homePage").hide();
	 	
	 	$('.loader').show();
	 	
	 	$("#homePage").delay(2000).fadeIn(500);

	 	$("#home").css("background-color", "#005582");

	 	$("#profile").css("background-color", "rgba(0, 119, 181, 0.80)");

	 	$("#feed").css("background-color", "rgba(0, 119, 181, 0.80)");
	 	
	 	/*Ajax Request to fetch details that are displayed on Home Page including the cover image, profile image, username, location, overview of study and work.*/

	 	$.ajax('https://graph.facebook.com/me?fields=cover,link,picture,name,family,work,education,birthday,location,hometown&access_token='+myFacebookToken,{ 

			success : function(response1){

		 		(response1.picture != undefined) ? $("#profile-image").html('<img width="40px" height="40px" src="' + response1.picture.data.url + '">') : $("#profile-image").html('<img width="40px" height="40px" src="styles/images/profile.jpg">');

				(response1.cover != undefined) ? $("#coverimage").html('<img width="100%" height="320" src="' + response1.cover.source + '">') : $("#coverimage").html('<img width="100%" height="325" src="styles/images/cover.jpg">');

				(response1.name != undefined) ? $("#user-name").html(response1.name.split(" ")[0]) : "";
		 			
		 		(response1.name != undefined) ? $("#home-name-text").text(response1.name) : "";

		/*To Print details of Education and Work (if available) on Home Page*/

		 		(response1.work != undefined) ? $("#overview-work").html('<span> Works at ' + response1.work[0].employer.name + '</span><br><br>') : "";

	            var mySchools = [];
	               
	            (response1.education != undefined) ? ($(response1.education).each(function(index) {

	            	mySchools.push('<span>' + response1.education[index].school.name + '</span>');
	                       		
	            	(response1.education[index].type == "College") ? $("#overview-study").html('<span> Studied at ' + response1.education[index].school.name + '</span><br><br>') : "";
		 		
	            })) : "";
	                       		
	            ($("#overview-study").val() == "" && response1.education != undefined) ? $("#overview-study").html('<span> Studied at: <br>' + mySchools.join("<br>") + '</span><br><br>') : "";
	                       		
	            (response1.location != undefined && response1.hometown != undefined) ? $("#overview-city").html('<span> Lives in ' + response1.location.name + '<br>From ' + response1.hometown.name + '</span><br><br>') : "";
	                       		
	    /*To print Birthdate (if available) in the dd-MM-yyyy format where MM indicates the full month name */        

	            var locale = "en-us";
	              
	            (response1.birthday != undefined) ? ([month1, date, year] = response1.birthday.split("/")) : "";
				
				(response1.birthday != undefined) ? (month = new Date(response1.birthday).toLocaleString(locale, { month: "long" })) : "";
	                       		
	            (response1.birthday != undefined) ? $("#overview-birthday").html('<span>Birthday:<br>' + date + " " +  month + " " + year + '</span><br><br>') : "";
	            

		/*To Print Details about family members on Profile Page */

		 		var familyMembers = [];
		 			
		 		(response1.family != undefined) ? $(response1.family.data).each(function(index) {
	                    	
	                familyMembers.push('<span>' + response1.family.data[index].name + "<br>" + response1.family.data[index].relationship + '</span>');
	                      
	            }) : "";	

	            (response1.family != undefined) ? $("#family").html('<h4>  Family Members  </h4><p>' + familyMembers.join("<br><br>") + '</p>') : $("#family").html('<h4>  Family Members  </h4><p>This information is not available</p>');

	            },

		 	error : function(request,errorType,errorMessage){

	            console.log(request);
	              
	            console.log(errorType);
	                 
	            alert(errorMessage);
	             
	         },

	        timeout:3000, // in ms

	        /*Show loader before fetching details of page */
	        
	        beforeSend : function(){

	        	$('.loader').show();
	               
	        },

	        /*Hide loader after fetching details of page */

	        complete : function(){

	            setTimeout(function() {
			
			        $(".loader").hide(500);
			
				}, 1200);
			
			} //end argument list 

		});  // end ajax call 


		/*Ajax Request to fetch bigger size Profile Image*/

		 	$.ajax('https://graph.facebook.com/me?fields=picture.width(150).height(150)&access_token='+myFacebookToken,{ 

				success : function(response2){
		 			
		 			console.log(response2);
		 			
		 			(response2.picture != undefined) ? $("#home-profile-image").html('<img src="' + response2.picture.data.url + '">') : $("#home-profile-image").html('<img src="styles/images/profile.jpg">');

		 		}        
	                        
			});	

	} // end of function getHomePage

	/*Call function getHomePage on loading the site*/

	getHomePage();

	/*Call function getHomePage on clicking of the links in the navigation bar*/

	$("#user-name, #profile-image, #home, #home-name-text").on('click',getHomePage);



	/*Function to display the Profile Page to the User*/

	function getProfilePage(){

	 	$("#profile-page").accordion({
	 	
	 		header: "h3",
	 		
	 		collapsible: true,
	 		
	 		active: false,
	 		
	 		heightStyle: "content",
	 		
	 		animate: 700
	 	
	 	});

	 	$("#homePage").hide();
	 	
	 	$("#feed-page").hide();
	 	
	 	$("#profile-page").hide()
	 	
	 	$('.loader').show();
	 	
	 	$("#profile-page").delay(2000).fadeIn(500);

	 	$("#home").css("background-color", "rgba(0, 119, 181, 0.80)");

	 	$("#profile").css("background-color", "#005582");

	 	$("#feed").css("background-color", "rgba(0, 119, 181, 0.80)");

	 	/*Ajax Request to fetch all details of the user i.e. birthday, email, interested in, gender languages known, location, hometown, work, education etc.*/

        $.ajax('https://graph.facebook.com/me?fields=bio,birthday,gender,interested_in,email,website,languages,relationship_status,hometown,location,education,work&access_token='+myFacebookToken,{ 

            success : function(response){
                   
                (response.bio != undefined) ? $("#aboutu").html('<h4>  About You  </h4><p>' + response.bio + '</p>') : $("#aboutu").html('<h4>  About You  </h4><p>This information is not available</p>');
                   	 
                (response.birthday != undefined) ? $("#dob").html('<h4>Date of Birth </h4><p>' + response.birthday + '</p>') : $("#dob").html('<h4>Date of Birth </h4><p>This information is not available</p>');
                   
                (response.gender != undefined) ? $("#gender").html('<h4>Gender </h4><p>' + response.gender.charAt(0).toUpperCase() + response.gender.slice(1) + '</p>') : $("#gender").html('<h4>Gender </h4><p>This information is not available</p>');
                    
                (response.interested_in != undefined) ? $("#interested-in").html('<h4>Interested in</h4><p>' + response.interested_in + '</p>') : $("#interested-in").html('<h4>Interested in</h4><p>This information is not available</p>');
                    
                (response.email != undefined) ? $("#emailid").html('<h4>Email Id </h4><p>' + response.email + '</p>') : $("#emailid").html('<h4>Email Id </h4><p>This information is not available</p>');
                   
                (response.website != undefined) ? $("#website").html('<h4>Website </h4><p>' + response.website + '</p>') : $("#website").html('<h4>Website </h4><p>This information is not available</p>') ;
                   
                var allLanguages = [];
                    
                (response.languages != undefined) ? $(response.languages).each(function(index) {
                
                	allLanguages.push('<span>' + response.languages[index].name + '</span>');
                        
                }) : "";

                (response.languages != undefined) ? $("#languages_a").html('<h4>  Languages  </h4><p>' + allLanguages.join("&nbsp;&nbsp;") + '</p>') : $("#languages_a").html('<h4>  Languages  </h4><p>This information is not available</p>') ;
                   
                (response.relationship_status != undefined) ? $("#relationship").html('<h4> Relationship </h4><p>' + response.relationship_status + '</p><br>') : $("#relationship").html('<h4> Relationship </h4><p>This information is not available</p><br>') ;

				(response.hometown != undefined) ? $("#hometown").html('<h4> Home Town </h4><p>' + response.hometown.name + '</p><br>') : $("#hometown").html('<h4> Home Town </h4><p>This information is not available</p><br>') ;
                    
                (response.location != undefined) ? $("#location").html('<h4> Current City </h4><p>' + response.location.name + '</p><br>') : $("#location").html('<h4> Current City </h4><p>This information is not available</p><br>') ;

                var myEducation = [];

					(response.education != undefined) ? ($(response.education).each(function(index) {
						
						var yearClass = (response.education[index].year != undefined) ? "Class of " + response.education[index].year.name + '<br>' : ""; 	
						
						myEducation.push('<span>' + response.education[index].school.name + '<br>' + yearClass + '<span>')
                
                })) : ""; 
                   
                (response.education != undefined) ? $("#education").html('<h4> Education </h4><p>' + myEducation.join("<br>") + '</p>' ) : $("#education").html('<h4> Education </h4><p>This information is not available</p>' );

                var myWork = [];
                    
                (response.work != undefined) ? ($(response.work).each(function(index) {
                        
                    var workPosition = (response.work[index].position != undefined ) ? response.work[index].position.name + '&nbsp;&nbsp;&nbsp;' : "";
                        
                    var workLocation =  (response.work[index].location != undefined) ? response.work[index].location.name : "";
						
					var workStartDate =  (response.work[index].start_date != undefined && response.work[index].start_date != "0000-00") ? response.work[index].start_date : "";
						
					var workEndDate =  (response.work[index].end_date != undefined && response.work[index].end_date != "0000-00") ? response.work[index].end_date : "";

					var workDate = (workStartDate != "" && workEndDate != "") ? (workStartDate + ' to ' + workEndDate) : "";

					myWork.push('<span>' + response.work[index].employer.name + '<br>' + workPosition +  workLocation + '<br>' + workDate + '<br><span> ');
                
                })) : "";

                (response.work != undefined) ? $("#work").html('<h4> Work </h4><p>' + myWork.join("<br>") + ' </p><br>') : $("#work").html('<h4> Work </h4><p>This information is not available</p><br>');

            },

            error : function(request,errorType,errorMessage){

                console.log(request);
                    
                console.log(errorType);
                    
                alert(errorMessage);
            
            },

            timeout:3000, // in ms

            complete : function() {

               	setTimeout(function() {
					  
					$(".loader").hide(500);
					
				}, 1300);
					  
			}//end argument list 

		});// end ajax call 

    }// end getProfilePage

    /*Function call of getProfilePage*/

    $("#profile").on('click',getProfilePage)


	/*Function to fetch the details of Feed Page*/
	
	
	function getFeedPage(){

		$("#homePage").hide();
		
		$("#profile-page").hide()
		
		$("#feed-page").hide()
	 	
	 	$('.loader').show();
	 	
	 	var postPicture;
	 	
	 	$("#feed-page").delay(2000).fadeIn(1000);

	 	$("#home").css("background-color", "rgba(0, 119, 181, 0.80)");

	 	$("#profile").css("background-color", "rgba(0, 119, 181, 0.80)");

	 	$("#feed").css("background-color", "#005582");
	 	
		/*Ajax Request to fetch the details of Feed Page*/

		$.ajax('https://graph.facebook.com/me/feed?fields=created_time,application,privacy,name,picture,likes,comments,story,from,message,link,description,full_picture,status_type,type,caption,place&access_token='+myFacebookToken,{ 

            success : function(response){
                    
      			var myPosts = [];
                    
                var postImage = [];
                    
                (response.data != undefined) ? ($(response.data).each(function(index1) {

                    var locale = "en-us";

                   	[createdDate, Time] = response.data[index1].created_time.split("T");
                    	
                    [createdTime] = Time.split("+");
                    	
                    [year, month, date] = createdDate.split("-");
                    	
                    month = new Date(createdDate).toLocaleString(locale, { month: "long" })
                    	
                    var sourceName = (response.data[index1].application != undefined) ? (response.data[index1].application.name) : "";
                    	
                    var privacy = (response.data[index1].privacy.description != "") ? (response.data[index1].privacy.description) : "Public";

                    var placePost = (response.data[index1].place != undefined) ? (response.data[index1].place.location.city) : "";

                    var descPost = (response.data[index1].description != undefined) ? (response.data[index1].description) : "";

                    var namePost = (response.data[index1].name != undefined) ? (response.data[index1].name) : "";

                    var captionPost = (response.data[index1].caption != undefined) ? (response.data[index1].caption) : "";

                    var linkPost = (response.data[index1].link != undefined) ? (response.data[index1].link) : "";

                    var picturePost = (response.data[index1].full_picture != undefined) ? ('<div class="postimg" style="border-radius:4px"><img width="100%" height="300" src="' + response.data[index1].full_picture + '"></div>') : ""; 

                    var picturePost = (response.data[index1].description != undefined) ? ('<a href="' + linkPost + '" target="_blank"><div class="figimage" style="background-color:#F5F5F5;padding-bottom:5px;border-radius:4px;";><figure><img width="100%" height="250" src="' + response.data[index1].full_picture + '"><figcaption><div style="padding-bottom:5px; padding-top:7px;" class="picname">' + namePost + '</div><div class="picdesc">' + descPost + '</div><div class="piccaption">' + captionPost + '</div></figcaption></figure></div></a>') : picturePost;

                    var fromName = (response.data[index1].from != undefined) ? (response.data[index1].from.name) : "";

                    var msgpost = (response.data[index1].message != undefined) ? (response.data[index1].message) : "";

                    var postLikes = [];

                    var postComments = [];

                    (response.data[index1].likes != undefined) ? ($(response.data[index1].likes.data).each(function(index2) {

                    	postLikes.push('<span class="commentname">' + response.data[index1].likes.data[index2].name + '</span><br>');

                    })) : postLikes.push('<span>No Likes</span>');

                    (response.data[index1].comments != undefined) ? ($(response.data[index1].comments.data).each(function(index2) {

                    	postComments.push('<span class="commentname">' + response.data[index1].comments.data[index2].from.name + '&emsp;<p class="commentmsg">' + response.data[index1].comments.data[index2].message + '</p>' + '</span>');

                    })) : postComments.push('<span>No Comments</span>');

                    var likeComment = ('<div class="likelink" style="padding-top:10px"><a data-toggle="collapse" href="#collapseE'+[index1]+'" aria-expanded="false" aria-controls="collapseE'+[index1]+'"><i class="ion-ios-chatboxes"></i>&nbsp;Likes</a><div class="collapse" id="collapseE'+[index1]+'"><div class="well">'+postLikes.join(" ")+'</div></div>'+'<br>'+'<a data-toggle="collapse" href="#collapseB'+[index1]+'" aria-expanded="false" aria-controls="collapseB'+[index1]+'"><i class="ion-thumbsup"></i>&nbsp;Comments</a><div class="collapse" id="collapseB'+[index1]+'"><div class="well">'+postComments.join(" ")+'</div></div></div>');
                    	
                    if (response.data[index1].story != undefined){

                    	var storyMsg = (response.data[index1].message != undefined) ? (response.data[index1].message) : "";

                    	var strfound = response.data[index1].story.search("added a life event");

                    	(strfound != -1) ? (myPosts.push('<span><h4 class="postT">'+response.data[index1].story.split(":")[0].split("from")[0]+'</h4>'+'<p class="postD">'+date+" "+month+" "+year+" at "+createdTime+"&emsp;"+sourceName+"&emsp;" + placePost + "&emsp;Privacy: "+privacy+'</p><br>'+'<p class="postmsg1">'+response.data[index1].story.split(":")[1]+'</p>'+response.data[index1].story.split(":")[0].split("from")[1]+'<br>'+likeComment+'<span>')) : (myPosts.push('<span><h4 class="postT">'+response.data[index1].story+'</h4>'+'<p class="postD">'+date+" "+month+" "+year+" at "+createdTime+"&emsp;"+sourceName+"&emsp;" + placePost + "&emsp;Privacy: "+privacy+'</p><br>'+'<p class="postmsg">'+storyMsg+'</p>'+picturePost+'<br>'+likeComment+'<span>'));

                    }

                    else {

   						myPosts.push('<span><h4 class="postT">' + fromName + '</h4>' + '<p class="postD">' + date + " " + month + " " + year + " at " + createdTime + "&emsp;" + sourceName + "&emsp;" + placePost + "&emsp;Privacy: " + privacy + '</p><br>'  + '<p class="postmsg1">' + msgpost + '</p>' + picturePost  + '<br>' + likeComment + '<span>');	
                    	  
                    }

					})) : "";

              	    $(".post1").html(myPosts.join("<br><br><br><hr>"));
                   
                },

                error : function(request,errorType,errorMessage){

                    console.log(request);
                    
                    console.log(errorType);
                    
                    alert(errorMessage);
                
                },

                timeout:5000, // in ms

                complete : function(){

                   setTimeout(function() {
					 
					  $(".loader").hide(500);
					
					}, 200);

                }

            }//end argument list 



        );// end ajax call 


    }// end get facebook info

    /*Function call to display the details of Feed Page*/

$("#feed").on('click',getFeedPage)

});
