import { getCurrentEnvironment } from '../store/environment';

const env = getCurrentEnvironment()

export default function isLocal() {
    if (env === "localhost") {
        return true;
    }
    return false;
}