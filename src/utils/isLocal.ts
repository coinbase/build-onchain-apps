import { getCurrentEnvironment, Environment } from '../store/environment';

export default function isLocal() {
  const env = getCurrentEnvironment();
  return env === Environment.localhost;
}
