import React, { useState } from "react";
const App = () => {
  const [githubUserName, setGithubUserName] = useState("");
  const [githubProfileData , setGithubProfileData] = useState("")

  const getUserProfile = async () => {
    try{
console.log(githubUserName, "githubUserName");
    const userProfile = await fetch(
      `https://api.github.com/users/${githubUserName}`,
    ).then((res) => res.json());
    console.log(userProfile, "userProfile");
setGithubProfileData(userProfile)
    
    }catch(error){
        console.log(error);
        
    }
    
  }; 
  console.log(githubProfileData , "githubProfileData");
//   console.log(githubUserName);
const uiRender = ()=>{

    return (
 githubProfileData.message == "Not Found" ?  (
        <div> <h1>User Not Found</ h1></div> 
    ) : <div>
    <img width={400} src={githubProfileData.avatar_url} alt="" />
          <h1>{githubProfileData.name}</h1>
    <p>{githubProfileData.bio}</p>
    <p>{githubProfileData.company}</p>
    
    </div> 
    )
       
 

   
}
// return (
    

      

// )
  return (
    <div>

    {/* Search Container */}
    <div>
          <input
        style={{ width: "200px" }}
        type="text"
        placeholder="Enter your github userName"
        onChange={(e) => {
          setGithubUserName(e.target.value);
        }}
      />
      <button onClick={getUserProfile}>Search</button>
    </div>

{/* Card container */}

{
    uiRender()
}
    

    </div>
  );

    } 

export default App;
