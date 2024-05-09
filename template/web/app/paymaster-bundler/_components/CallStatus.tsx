import { useCallsStatus } from 'wagmi/experimental';

/**
 * CallStatus fetches and displays the status of a writeContracts call.
 *
 * @param {Object} props - The props object.
 * @param {string} props.id - The unique identifier for the call.
 * @returns {JSX.Element} A div element displaying the current status of the call or "loading" if the status is not yet available.
 */
export function CallStatus({ id }: { id: string }) {
  const { data: callsStatus } = useCallsStatus({
    id,
    query: {
      refetchInterval: (data) => (data.state.data?.status === 'CONFIRMED' ? false : 1000),
    },
  });

  return <div>Status: {callsStatus?.status || 'loading'}</div>;
}
