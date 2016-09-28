// Initialize your app
var myApp = new Framework7();
      material: true

// Export selectors engine
var $$ = Dom7;
    $$('#logout').on('click', function (e) {
	    localStorage.setItem('USER_ID', data.DATA[0].null);
	    localStorage.setItem('CONTACT_NUMBER', data.DATA[0].null);
	    localStorage.setItem('BLOOD_GROUP', data.DATA[0].null);
	   mainView.router.loadPage('login.html')
    }); 

    
	   
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: false
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('signup', function (page) {
	$$('#signup-from').on('submitted', function (e) {
			 var xhr = e.detail.xhr; // actual XHR object
			 console.log(xhr);
			 var data = e.detail.data; // Ajax response from action file
			 console.log(data);
			 data = JSON.parse(data);
			 console.log(data);
			if(data.STATUS === 'SUCCESS'){
				$$('#signup-response').html(data.MESSAGE);
				$$('#signup-response').css({color: 'green'});
			}else{
				$$('#signup-response').html(data.MESSAGE);
				$$('#signup-response').css({color: 'red'});
			}
			 
	});
});	

myApp.onPageInit('login', function (page) {
    // run createContentPage func after link was clicked
     $$('#login-from').on('submitted', function (e) {
         var xhr = e.detail.xhr; // actual XHR object
		 console.log(xhr);
         var login = e.detail.data; // Ajax response from action file
		 console.log(login);
		 data = JSON.parse(login);
		 console.log(data);
		 if(data.STATUS === 'SUCCESS'){
			$$('#login-response').html(data.MESSAGE);
			$$('#login-response').css({color: 'green'});
			localStorage.setItem('USER_ID', data.DATA[0].user_id);
			localStorage.setItem('CONTACT_NUMBER', data.DATA[0].contact_number);
	        localStorage.setItem('BLOOD_GROUP', data.DATA[0].blood_group);
			localStorage.setItem('STATUS', data.DATA[0].status);
			mainView.router.loadPage('dashboard.html');
		}
		else{
			$$('#login-response').html(data.MESSAGE);
			$$('#login-response').css({color: 'red'});
		 }
		 
       });
});
myApp.onPageInit('request-blood', function (page) {
    $$('#USER_ID').val(localStorage.getItem('USER_ID'));
	// run createContentPage func after link was clicked
    $$('#resquest-blood').on('submitted', function (e) {
         var xhr = e.detail.xhr; // actual XHR object
		 console.log(xhr);
         var request = e.detail.data; // Ajax response from action file
		 console.log(request);
		 data = JSON.parse(request);
		 console.log(data);
		if(data.STATUS === 'SUCCESS'){
			$$('#request-response').html(data.MESSAGE);
			$$('#request-response').css({color: 'green'});
			//localStorage.setItem('REQUEST_ID', data.DATA[0].request_id);
		}
		else{
			$$('#request-response').html(data.MESSAGE);
			$$('#request-response').css({color: 'red'});
			
		}
		 
    });
});

myApp.onPageInit('dashboard',function (page) {
    
});

myApp.onPageInit('view-profile', function (page) {
	$$("#view-profile>#USER_ID").val(localStorage.getItem("USER_ID"));
	
	$$('#view-profile').on('submitted', function (e) {
         var xhr = e.detail.xhr; // actual XHR object
		 console.log(xhr);
         var request = e.detail.data; // Ajax response from action file
		 console.log(request);
		 data = JSON.parse(request);
		 console.log(data);
		if(data.STATUS === 'SUCCESS'){
			myApp.alert("Account Updated.", "", null);
			//localStorage.setItem('REQUEST_ID', data.DATA[0].request_id);
		}
		else{
			myApp.alert("Account Not Updated. Try Again!", "", null);
			
		}
		 
    });
	
	$$.ajax({
		url: "http://localhost/BugDev/blood_donate/server.php",
		type:"POST",
		data:{"REQUEST_TYPE":"ACCOUNT_VIEW", "USER_ID": localStorage.getItem("USER_ID")},
		dataType: "json",
		success: function(data){
			console.log(data);
			var formData = {
				'NAME': data.DATA[0].name,
				'CONTACT_NUMBER': data.DATA[0].contact_number,
				'BLOOD_GROUP': data.DATA[0].blood_group,
				'GENDER':data.DATA[0].gender,
				'DOB': data.DATA[0].dob,
				'LAST_DONATE':data.DATA[0].last_donate,
				'LOCATION': data.DATA[0].location
			};
			myApp.formFromJSON('#view-profile', formData);
		},
		error: function(a, b, c){
			console.log(a);
			console.log(b);
			console.log(c);
		}
	});

    $$("#delete-account").on('click', function(){
		myApp.showIndicator();
		deleteAccount();
	});
    
});


function deleteAccount(){
	$$.ajax({
		url: 'http://localhost/BugDev/blood_donate/server.php',
		data: {"REQUEST_TYPE":"ACCOUNT_DELETE", "USER_ID": localStorage.getItem("USER_ID"),"STATUS":("2"),},
		type: 'POST',
		dataType: 'json',
		success: function(data){
			//data = JSON.parse(data);
			console.log(data);
			console.log("Testing Account Delete Ends");
			myApp.alert("Account Deleted. Goodbye!", "", function(){ $$('#logout').click(); });
			myApp.hideIndicator();
		},
		error:function(a, b, c){
			console.log(a);
			console.log(b);
			console.log(c);
			myApp.alert("Account was not deleted. Try again!", "", null);
			myApp.hideIndicator();
		}
	});
}
    // run createContentPage func after link was clicked
  /*  $$('#view-profile').on('submitted', function (e) {
         var xhr = e.detail.xhr; // actual XHR object
		 console.log(xhr);
         var request = e.detail.data; // Ajax response from action file
		 console.log(request);
		 data = JSON.parse(request);
		 console.log(data);
		
		if(data.STATUS === 'SUCCESS'){
			$$('#viewprofile-response').html(data.MESSAGE);
			$$('#viewprofile-response').css({color: 'green'});
			$$('.form-from-json').on('click', function(){
				var formData = {
					'NAME': data.DATA[0].name,
					'CONTACT_NUMBER': data.DATA[0].contact_number,
					'BLOOD_GROUP': data.DATA[0].blood_group,
					'GENDER':data.DATA[0].gender,
					'DOB': data.DATA[0].dob,
					'LAST_DONATE':data.DATA[0].last_donate,
					'LOCATION': data.DATA[0].location
				};
			  myApp.formFromJSON('#view-profile', formData);
			});               
		}
		else{
			$$('#viewprofile-response').html(data.MESSAGE);
			$$('#viewprofile-response').css({color: 'red'});
		}
		 
    });*/


// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}