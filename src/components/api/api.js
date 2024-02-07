export async function fetchSurveyResponses() {
    const response = await fetch("https://api.surveysparrow.com/v3/responses?survey_id=1000062379", {
        headers: {
            "Authorization": `Bearer <%=iparams.surveysparrow_api_key%>`
        }
    });
    console.log("Request headers:", response.request.headers);
    const responseData = await response.json();
    return responseData.data;
}