import {newClientApplicationRandomSecret} from "./ClientAppRepository";

const randomClientApplicationSecretGenerator = () => {
    return newClientApplicationRandomSecret();
}

export default randomClientApplicationSecretGenerator
