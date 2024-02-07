UserCard  
	This project is made in the huge interest of making easy entry cards/tickets to users who fill the survey form of an Event. Targeted on Event forms since it should be easier for users to receive a mail of their entry cards similar to ticket generation of a show / bus / train etc. 
	The App start by asking for user’s 3 PIN which they might have entered in the survey. This supposedly should be a custom survey with generative unique id for pin, but unfortunately due to narrow of time in submission by default the app runs at admin mode. 
	In Admin mode the survey creator has access to all the userCards and all the details of the users who filled the survey form. 
	User mode should be more like the user enters the 3-pin and it fetches the matching results from the responses at API call – (https://api.surveysparrow.com/v3/responses?survey_id) and only the particular user’s card will be accessed for downloads as pdf/jpeg.  

The userCard:
	It contains a default user icon, name, email, afterParty status, isSponsor status. If the user is willing to participate the afterParty his status is displayed as Yes in the UserCard making admittance to move forward. Same goes to isSponsor. 
	And if the user is a sponsor there are three sponsor categories, Gold, Silver and Bronze. 
-	If the user is a Gold sponsor their card is embedded with 1 Gold Eye Icon and 1 black Icon. 
-	If the user is a Silver sponsor their card is embedded with 1 Silver Eye Icon and 1 black Icon. 
-	If the user is a Bronze sponsor their card is embedded with 1 Bronze Eye Icon and 1 black Icon. 
-	If the user is not a sponsor their card is embedded with default Eye Icon. 
These should come with perks similar to owning a “BoredApe” NFT for sponsors. 

The main goal of this userCard feature is to make a memorable experience with Survey Sparrow’s  survey experience and making a good bond with the users. 

How to Run:
Local server / device
-	Git clone this repository.
git clone https://github.com/Arvindh177/UserCard-SSDK.git
-	Install ssdk. If you don’t have one checkout this link. https://sdk.surveysparrow.dev/docs/getting-started/
-	Then run the program with ssdk run command. 
-	Once run, you should get a response similar to this  
{
webpack 5.74.0 compiled successfully in 5899 ms
Starting local testing server at https://*:30001/    
Append 'dev=true' to your Surveysparrow account URL to start testing
e.g. https://domain.surveysparrow.com/settings/marketplace-apps?dev=true
Quit the server with Control-C.
To test the installation page, visit - https://localhost:30001/custom_configs
} in the terminal 
-	Navigate to the  https://localhost:30001/custom_configs and your Survey Sparrow API key. 
-	If you don’t have an API key, create an account with Survey Sparrow. 
-	Create a custom app -> private app -> Select all privileges -> copy the generated API key.
-	After entering you API key, go to settings -> Apps and Integrations and you domain add dev = true similar to this https://domain.surveysparrow.com/settings/marketplace-apps?dev=true. 
-	That’s it. Checkout the app!

Note: --------------------------------------------------------------------------------------------------------------------------------------------------------------------
	There may be errors in fetching contacts and surveys since I worked on it after my API quota’s limit exceeded and unfortunately wasn’t able to test the application. Feel free to fork the repo and apply fix and make a pull request. 
	And also apologies for having the main.js not so readable for now due time of submission which I might update later in the Git. 
	The project hasn’t been published yet in the developer portal since even myself wasn’t able to test the application. 

Thanks for reaching this far!! Hope you enjoyed

Contact: 
email : mq3752@srmist.edu.in
Domain: https://project126.surveysparrow.com/
