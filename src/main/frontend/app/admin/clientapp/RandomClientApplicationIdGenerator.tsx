import { v4 as uuidv4 } from 'uuid';
const randomClientApplicationIdGenerator = () => {
    const randomClientAppID = uuidv4();
    console.log('Your UUID is: ' + randomClientAppID);
    return randomClientAppID;
}

export default randomClientApplicationIdGenerator
