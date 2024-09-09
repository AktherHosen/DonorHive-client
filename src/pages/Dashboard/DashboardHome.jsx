import React from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
const DashboardHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <SectionTitle title={"Welcome"} subTitle={user?.displayName} />
    </div>
  );
};

export default DashboardHome;
