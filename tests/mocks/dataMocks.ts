import type { participantsDataType } from "@/types/participantsData";

// Data we expect to be stored in storage
export const MOCK_STORED_PARTICIPANTS_DATA: participantsDataType = {
  websites: [
    {
      name: "TripAdvisor",
      url: "www.tripadvisor.com",
      messages: ["Message 1", "Message 2", "Message 3", "Message 4"]
    }
  ]
};

// Data we expect to be returned from getParticipantsData
export const MOCK_PARTICIPANTS_DATA: participantsDataType = {
  websites: [
    {
      name: "TripAdvisor",
      url: "www.tripadvisor.com",
      messages: ["Message 1", "Message 2", "Message 3", "Message 4"]
    },
    {
      name: "Uber",
      url: "www.uber.com",
      messages: ["Message 1", "Message 2", "Message 3", "Message 4"]
    },
    {
      name: "Amazon",
      url: "www.amazon.com",
      messages: ["Message 1", "Message 2", "Message 3", "Message 4"]
    }
  ]
};

export const MOCK_GOOGLE_RESULTS_WITH_PARTICIPATING_WEBSITE = `
<div>
  <div class="MjjYud">
    <div class="yuRUbf">
      <a href="https://www.tripadvisor.com/">
        <div class="TbwUpd">
          <cite class="iUh30">https://www.tripadvisor.com/</cite>
        </div>
        <div class="TbwUpd">
          <div class="BNeawe vvjwJb AP7Wnd">
            <div class="BNeawe vvjwJb AP7Wnd">Tripadvisor</div> 
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="MjjYud">
    <div class="yuRUbf">
      <a href="https://www.nintendo.com/">
        <div class="TbwUpd">
          <cite class="iUh30">https://www.nintendo.com/</cite>
        </div>
        <div class="TbwUpd">
          <div class="BNeawe vvjwJb AP7Wnd">
            <div class="BNeawe vvjwJb AP7Wnd">Nintendo</div> 
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
`;

export const MOCK_GOOGLE_RESULTS_WITHOUT_PARTICIPATING_WEBSITE = `
<div>
  <div class="MjjYud">
    <div class="yuRUbf">
      <a href="https://www.sega.com/">
        <div class="TbwUpd">
          <cite class="iUh30">https://www.sega.com/</cite>
        </div>
        <div class="TbwUpd">
          <div class="BNeawe vvjwJb AP7Wnd">
            <div class="BNeawe vvjwJb AP7Wnd">Sega</div> 
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="MjjYud">
    <div class="yuRUbf">
      <a href="https://www.nintendo.com/">
        <div class="TbwUpd">
          <cite class="iUh30">https://www.nintendo.com/</cite>
        </div>
        <div class="TbwUpd">
          <div class="BNeawe vvjwJb AP7Wnd">
            <div class="BNeawe vvjwJb AP7Wnd">Nintendo</div> 
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
`;
