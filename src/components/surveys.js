export const fetchSurveys = async () => {

    try {
        const response = await fetch("https://api.surveysparrow.com/v3/surveys", {
            headers: {
                Authorization: `Bearer <%=iparams.surveysparrow_api_key%>`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch surveys");
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error fetching surveys:", error);
        throw error;
    }
};