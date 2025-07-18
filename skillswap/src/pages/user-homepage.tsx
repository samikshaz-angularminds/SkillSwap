import { Helmet } from "react-helmet-async";
import BeforeLoginDashboard from "@/components/dashboard/before-login-dashboard";


const Homepage = ({ title = "Home" }: { title?: string }) => {
  

  return (
    <>
      <Helmet>
        <title>{title} | SkillSwap</title>
        
      </Helmet>
      <BeforeLoginDashboard/>
      
    </>
  );
};

export default Homepage;
