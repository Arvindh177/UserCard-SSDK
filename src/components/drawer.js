import React, {useState, useEffect} from "react";
import { Drawer, DrawerHeader, DrawerBody, Button, DropdownMenu, DropdownMenuItem } from "@sparrowengg/twigs-react";
import { fetchSurveys } from "./surveys";
import { fetchContacts } from "./contacts";

const MyDrawer = ({ isOpen, onClose}) => {
    const [surveys, setSurveys] = useState([]);
    const [isFetchingSurvey, setIsFetchingSurvey] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [isFetchingContact, setIsFetchingContact] = useState(false);
    const handleFetchSurveys = async () => {
        setIsFetchingSurvey(true);
        try {
          const data = await fetchSurveys();
          setSurveys(data);
        } catch (error) {
          console.error("Error fetching surveys:", error);
        } finally {
          setIsFetchingSurvey(false);
        }
      };

      const handleFetchContacts = async () => {
        setIsFetchingContact(true);
        try {
          const data = await fetchContacts();
          setContacts(data);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        } finally {
          setIsFetchingContact(false);
        }
      };
    return (
        <Drawer isOpen={isOpen} onClose={onClose} css={{ width: "200px" }}>
          <DrawerHeader>
            <h2>Menu</h2>
          </DrawerHeader>
          <DrawerBody>
            <Button onClick={handleFetchSurveys} disabled={isFetchingSurvey} css={{margin: "10px"}}>
                 {isFetchingSurvey ? "Fetching Surveys..." : "Surveys"} </Button>
            <DropdownMenu>
            {surveys.map((survey) => (
                <DropdownMenuItem key={survey.id}>{survey.name}</DropdownMenuItem>
            ))}
            </DropdownMenu>
            <Button variant="primary" onClick={handleFetchContacts} disabled={isFetchingContact} css={{margin: "10px"}}>
          {isFetchingContact ? "Fetching Contacts..." : "Contacts"}
            </Button>
            <DropdownMenu>
          {contacts.map((contact) => (
            <DropdownMenuItem key={contact.id}>{contact.name}</DropdownMenuItem>
          ))}
            </DropdownMenu>

          </DrawerBody>
        </Drawer>
      );
} ;

export default MyDrawer;