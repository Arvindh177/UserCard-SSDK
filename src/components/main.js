import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormInput,
  Heading,
  Link,
  Text,
  Pagination,
  Grid
} from "@sparrowengg/twigs-react";
import { fetchSurveyResponses } from "./api/api";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  UserIcon, EyePlusIcon
} from "@sparrowengg/twigs-react-icons"; 
import Drawer from "./drawer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import htmlToImage from 'html-to-image';


const Main = ({ client }) => {
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [userCards, setUserCards] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  async function handleSubmit() {
    try {
      setIsDisabled(true);
      const apiKey = "<%=iparams.surveysparrow_api_key%>";
      const responses = await fetchSurveyResponses();
      //console.log("Survey Responses:", responses);

      const newUserCards = [];

      responses.forEach(response => {
        const nameAnswer = response.answers.find(answer => answer.question === "Please enter your name?");
        const emailAnswer = response.answers.find(answer => answer.question === "What's the best email address to reach you?");
        const isSponsorAnswer = response.answers.find(answer => answer.question === "Do you wish to be a sponsorer?");
        const afterPartyAnswer = response.answers.find(answer => answer.question === "Are you planning on staying for the afterparty? :)");
        const sponsorAnswer = response.answers.find(answer => answer.question_id == 1000770005);
        

        const name = nameAnswer ? nameAnswer.answer : "";
        const email = emailAnswer ? emailAnswer.answer : "";
        const isSponsor = isSponsorAnswer ? isSponsorAnswer.answer : "";
        const afterParty = afterPartyAnswer ? afterPartyAnswer.answer : "";
        const sponsor = sponsorAnswer ? sponsorAnswer.answer : "";

        const userCard = {
          name: name,
          email: email,
          isSponsor: isSponsor,
          afterParty: afterParty,
          sponsor: sponsor
        };

        newUserCards.push(userCard);
      });

      setUserCards(newUserCards);
      setCurrentPage(1);
      document.getElementById("InputForChatGpt").value = "";
      client.interface.alertMessage("Survey Generated Successfully", { type: "success" });
    } catch (error) {
      document.getElementById("InputForChatGpt").value = "";
      client.interface.alertMessage("Error while generating the survey. If your survey is malformed kindly delete it.", { type: "failure" });
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  }

  const downloadUserCard = () => {
    //to be implemented after quota access
    
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage => Math.max(1, currentPage - 1));
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage => Math.min(Math.ceil(userCards.length / 10), currentPage + 1));
  };

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, userCards?.length || 0); // Ensure userCards is not null

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      css={{
        height: "200vh"
      }}
    >
      <Button
        onClick={() => setIsDrawerOpen(true)}
        leftIcon={<ChevronLeftIcon />}
        css={{
          position: "fixed",
          right: "20px",
          top: "20px"
        }}
      >
        Open Drawer
      </Button>

      {/* Drawer Component */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <Heading
        css={{
          textTransform: "uppercase",
          textAlign: "center",
          color: "$black800",
          letterSpacing: "1.5px",
          marginBottom: "$8",
          border: "0.2px  $black700",
          borderRadius: "8px",
          backgroundColor: '#56b0bb',
          padding: "5px",
          boxShadow: "5px 7px 5px black"
        }}
        size="h4"
        weight="semibold"
      >
        Generate event UserCard
      </Heading>
      <Text
        size="md"
        css={{
          marginBottom: "$6",
          maxWidth: 850,
          textAlign: "center",
          color: "$neutral800"
        }}
      >
        This app generates UserCard only for those who registered with event forms.
      </Text>
      <Text css={{ fontSize: 18 }}>Haven't filled the survey yet?</Text>
      <Link
        css={
          { margin: 10, 
            padding: 10, 
            color: 'White', 
            border:'1px black', 
            borderRadius: '12px',
            backgroundColor: '#56b0bb',
            boxShadow: '2px 2px 2px teal'  
          }}
        href="https://sprw.io/stt-1BGSxDL8vCnwtW4BVsVdRy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Click here!
      </Link>
      <Flex alignItems="flex-end" css={{ marginTop: "$10" }}>
        <FormInput
          css={{ width: 550 }}
          id={"InputForChatGpt"}
          size="xl"
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Enter your 3-PIN to generate card"
        />
        <Button
          size="xl"
          color="primary"
          disabled={isDisabled || !text}
          onClick={handleSubmit}
          rightIcon={<ChevronRightIcon />}
          css={{
            marginLeft: "$12"
          }}
        >
          Get Cards
        </Button>
      </Flex>

      <Grid
        css={{
          marginTop: "$8",
          gap: "$4",
          gridTemplateColumns: "repeat(2, 1fr)"
        }}
      >
        {userCards && userCards.slice(startIndex, endIndex).map((userCard, index) => (
          <Box key={index} css={{ border: "1px solid #ccc", padding: "$4", borderRadius: "$md" }}>
            <Flex flexDirection="row" css={{marginRight: 20}} > <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDt6YUZ8byMEXMW-FqLnk72EfrpTC-hcBKjQ&usqp=CAU" size="lg"/>
            <EyePlusIcon color={userCard.sponsor ? "Gold" : "Default"} />
            <EyePlusIcon color={userCard.sponsor ? "Silver" : "Default"} />
            <EyePlusIcon color={userCard.sponsor ? "Bronze" : "Default"} />
            <EyePlusIcon/>
            </Flex>
            <Heading size="h4">Event</Heading>
            <Text>Name: {userCard.name}</Text>
            <Text>Email: {userCard.email}</Text>
            <Text>After party: {userCard.afterParty? "Yes": "No"}</Text>
            <Text>Sponsor: {userCard.isSponsor ? "Yes" : "No"}</Text>
            

            <Button onClick={downloadUserCard}>Download User Card</Button>
          </Box>
        ))}
      </Grid>

      <Flex alignItems="center" justifyContent="center" css={{ marginTop: "$6" }}>
        <Pagination
          activePage={currentPage}
          itemsPerPage={itemsPerPage}
          total={userCards?.length || 0}
          siblingCount={1}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </Flex>
    </Flex>
  );
};

export default Main;
