export const fetchContacts = async () => {
    
    try {
        const response = await fetch("https://api.surveysparrow.com/v3/contacts", {
            headers: {
                Authorization: `Bearer <%=iparams.surveysparrow_api_key%>`
            }
        });
        if(!response.ok) {
            throw new Error("Failed to fetch contacts");

        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error fetching contacts:", error);
        throw error;

    }
};