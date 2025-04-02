import Tasks  from './StaticDatas.js';
import dotenv from 'dotenv';
dotenv.config()
const firstFiveTasks = Tasks.Tasks.slice(0, 5);
const firstFiveTechMessages = Tasks.TechGroupMessages.slice(0, 5);
const firstFiveSalesMessages = Tasks.SalesGroupMessages.slice(0, 5);  
const firstFiveDesignMessages = Tasks.DesignGroupMessages.slice(0, 5);  
const GROQ_API_KEY=process.env.GROQ_API_KEY;
console.log(GROQ_API_KEY)
const SYSTEM_PROMPT_ = `
    You are an Agent with access to static data regarding individuals' performance, group messages, and tasks. 
    Below is the available data:
    give the answers in plane text not in any markdown format keep the answer very short in small paragraph and do not do any bold or anything with texts
    Tasks are: ${JSON.stringify(firstFiveTasks)}
    Tech Group Messages are: ${JSON.stringify(firstFiveTechMessages)}
    Sales Group Messages are: ${JSON.stringify(firstFiveSalesMessages)}
    Design Group Messages are: ${JSON.stringify(firstFiveDesignMessages)}
    Follow these guidelines:
    1. When asked about an individual's performance, provide details about their contributions, skills, and achievements based on the available static data.
    2. If asked about an individual's education or experience, refer to the corresponding fields available in the static data.
    3. Always respond with clear, concise, and relevant information from the data.
    4. If a detail is missing or unavailable, politely inform the user that the information is not available.
    5. Provide factual, objective overviews based on the individual's profile data when requested.
`;
export default async function AIAgent(question){
    try {
     
      if (!question) {
        return { error: "Query is required" };
      }
  
      const SYSTEM_PROMPT =SYSTEM_PROMPT_
        try {
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
              model: 'deepseek-r1-distill-llama-70b',
              messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: question },
              ],
              temperature: 0.7,
              max_tokens: 500,
            }),
          });
          const { choices } = await response.json();
        //   console.log(choices)
          const answer = choices[0].message.content;
          const cleanAnswer = answer.replace(/<think>[\s\S]*?<\/think>/g, '');
        //   console.log(cleanAnswer)
          return { answer: cleanAnswer,error:false };
        } catch (error) {
        //   console.error(`Error with API key ...: ${error}`);
        return {error:true}
        }
  
      return { error: true };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
};

// AIAgent("What is going on in Tech group")