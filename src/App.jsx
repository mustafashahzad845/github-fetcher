import React, { useState } from "react";

const App = () => {
  const [githubUserName, setGithubUserName] = useState("");
  const [githubProfileData, setGithubProfileData] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getUserProfile = async (e) => {
    e.preventDefault();
    if (!githubUserName.trim()) return;
    setSearchAttempted(true);
    setIsLoading(true);
    try {
      const userProfile = await fetch(
        `https://api.github.com/users/${githubUserName}`,
      ).then((res) => res.json());
      setGithubProfileData(userProfile);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const uiRender = () => {
    if (!searchAttempted) return null;

    if (isLoading) {
      return (
        <div style={skeletonWrapperStyle}>
          <div style={skeletonAvatarStyle} />
          <div style={skeletonLineStyle} />
          <div style={{ ...skeletonLineStyle, width: "80%" }} />
          <div style={skeletonLineStyle} />
        </div>
      );
    }

    if (githubProfileData && githubProfileData.message == "Not Found") {
      return (
        <div style={notFoundStyle}>
          <h1>User Not Found</h1>
        </div>
      );
    }

    const profileUrl = githubProfileData.html_url;

    return (
      <div style={cardStyle}>
        <img
          src={githubProfileData.avatar_url}
          alt={githubProfileData.name}
          style={avatarStyle}
        />
        <h1 style={nameStyle}>{githubProfileData.name}</h1>
        {githubProfileData.bio && <p style={bioStyle}>{githubProfileData.bio}</p>}
        {githubProfileData.company && <p style={companyStyle}>{githubProfileData.company}</p>}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={viewButtonStyle}
        >
          View on GitHub
        </a>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={getUserProfile} style={formStyle}>
        <h1 style={headingStyle}>GitHub Fetcher</h1>
        <input
          type="text"
          placeholder="Search your github username"
          value={githubUserName}
          onChange={(e) => setGithubUserName(e.target.value)}
          style={inputStyle}
        />
      </form>
      {uiRender()}
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "32px",
  gap: "28px",
  background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e40af 100%)",
  color: "#f1f5f9",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const headingStyle = {
  margin: "0",
  fontSize: "28px",
  fontWeight: "700",
  color: "#f1f5f9",
};

const inputStyle = {
  width: "360px",
  padding: "14px 20px",
  fontSize: "16px",
  border: "2px solid #60a5fa",
  borderRadius: "16px",
  outline: "none",
  backgroundColor: "#ffffff",
  color: "#0f172a",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const skeletonWrapperStyle = {
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  maxWidth: "360px",
  width: "100%",
  backgroundColor: "#1e293b",
};

const skeletonAvatarStyle = {
  width: "96px",
  height: "96px",
  borderRadius: "50%",
  backgroundColor: "#334155",
  margin: "0 auto 16px auto",
};

const skeletonLineStyle = {
  height: "16px",
  borderRadius: "4px",
  backgroundColor: "#334155",
  marginBottom: "8px",
};

const cardStyle = {
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  maxWidth: "360px",
  width: "100%",
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
};

const avatarStyle = {
  width: "96px",
  height: "96px",
  borderRadius: "50%",
  objectFit: "cover",
  display: "block",
  margin: "0 auto 12px auto",
};

const nameStyle = {
  margin: "0 0 8px 0",
  fontSize: "20px",
  fontWeight: "600",
  color: "#f1f5f9",
};

const bioStyle = {
  margin: "4px 0 4px 0",
  color: "#cbd5e1",
  fontSize: "14px",
};

const companyStyle = {
  margin: "4px 0 4px 0",
  color: "#94a3b8",
  fontSize: "14px",
};

const viewButtonStyle = {
  display: "inline-block",
  marginTop: "16px",
  padding: "8px 16px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#60a5fa",
  border: "1px solid #3b82f6",
  borderRadius: "6px",
  textDecoration: "none",
  transition: "background-color 0.2s",
};

const notFoundStyle = {
  padding: "40px",
  textAlign: "center",
  color: "#fca5a5",
  fontSize: "18px",
  backgroundColor: "#1e293b",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  maxWidth: "360px",
  width: "100%",
};

export default App;
