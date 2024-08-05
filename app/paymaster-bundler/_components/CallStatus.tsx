import { useCallsStatus, UseCallsStatusReturnType } from 'wagmi/experimental';

type CallStatusData = {
  state: {
    data?: {
      status?: string;
    };
  };
};

type CallStatusProps = {
  id: string;
};

/**
 * CallStatus uses the call id to fetch and display the status of a writeContracts call.
 *
 * @returns {JSX.Element} A div element displaying the current status of the call or "loading" if the status is not yet available.
 */
export function CallStatus({ id }: CallStatusProps): JSX.Element {
  const { data: callsStatus } = useCallsStatus({
    id,
    query: {
      refetchInterval: (data: CallStatusData) =>
        data.state.data?.status === 'CONFIRMED' ? false : 1000,
    },
  }) as UseCallsStatusReturnType;

  return (
    <div>
      <br />
      <strong>Status:</strong> {callsStatus?.status ?? 'loading'}
    </div>
  );
}
