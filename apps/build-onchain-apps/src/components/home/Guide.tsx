import { Flex } from '@radix-ui/themes';
import CodeBlock from '../CodeBlock';

export default function Guide() {
  return (
    <Flex>
      <CodeBlock>
        <span>$</span> <span>npx @coinbase/build-onchain-apps@latest create</span>
      </CodeBlock>
    </Flex>
  );
}
