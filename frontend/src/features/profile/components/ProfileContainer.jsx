import { useTranslation } from "react-i18next";
import PageContent from "../../../common/components/PageContent";
import UserDetailsContainer from "./UserDetailsContainer";
import { StyledCard } from "../../../common/styles";
import AddressDetailsContainer from "./AddressDetailsContainer";

const ProfileContainer = () => {
  const { t } = useTranslation("common");

  return (
    <PageContent pageTitle={t("Sidebar.MyAccount")}>
      <StyledCard>
        <UserDetailsContainer />
        <AddressDetailsContainer />
      </StyledCard>
    </PageContent>
  );
};

export default ProfileContainer;
