import React from 'react';
import AdminTemplate from "../../component/AdminTemplate";
import MenuCardContainer from "../../component/MenuCardContainer";
import HomePageMenuItem, {homeMenuContent} from "./HomePageMenuItem";

const HomePage = () => {
    return (
        <AdminTemplate maxWidth="xl" page={"Home"}>
            <MenuCardContainer spacing={3}>
                <HomePageMenuItem content={homeMenuContent.clientApplications} />
                <HomePageMenuItem content={homeMenuContent.roles} />
                <HomePageMenuItem content={homeMenuContent.accounts} />
            </MenuCardContainer>

        </AdminTemplate>
    )
}

export default HomePage