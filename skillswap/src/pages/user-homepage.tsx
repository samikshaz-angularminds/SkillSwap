import { Helmet } from "react-helmet-async";
import BeforeLoginDashboard from "@/components/dashboard/before-login-dashboard";
import { isAuthenticated } from "@/services/token.service";
import AfterLoginDashboard from "@/components/dashboard/after-login-dashboard";


const Homepage = ({ title = "Home" }: { title?: string }) => {

  const isLoggedIn  = isAuthenticated();

  // console.log("is logged In? ",isLoggedIn);

  return (
    <>
      <Helmet>
        <title>{title} | SkillSwap</title>
        
      </Helmet>
      {
        isLoggedIn ? <AfterLoginDashboard/> : <BeforeLoginDashboard/>
      }
      
      
    </>
  );
};

export default Homepage;
