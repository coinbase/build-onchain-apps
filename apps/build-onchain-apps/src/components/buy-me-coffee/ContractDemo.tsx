import { useCallback } from 'react';
import { Grid } from '@radix-ui/themes';
import useOnchainCoffeeMemos from '../../hooks/useOnchainCoffeeMemos';
import FormBuyCoffee from './FormBuyCoffee';
import Memos from './Memos';

export default function BuyMeCoffeeContractDemo() {
  const { memos, refetchMemos } = useOnchainCoffeeMemos();

  const handleOncomplete = useCallback(() => {
    void refetchMemos();
  }, [refetchMemos]);

  return (
    <Grid columns={{ md: '1fr 330px', lg: '1fr 380px' }} gap={{ md: '9' }}>
      <div>
        <div className="mb-6 flex justify-start">
          <h2 className="mb-1 text-4xl font-bold">Messages</h2>
        </div>
        {memos?.length > 0 && <Memos memos={memos} />}
      </div>
      <div className="pt-9">
        <FormBuyCoffee onComplete={handleOncomplete} />
      </div>
    </Grid>
  );
}
