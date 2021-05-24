import PoolDisplay from 'components/pools/PoolDisplay';
import { useRouter } from "next/router";

export const getStaticProps = () => {
  
  return {
    test: 'test'
  };
}

const Pool = () => 
{
  const router = useRouter();
  if (router.query.slug)
  {
    return (
      <PoolDisplay slug={router.query.slug} />
    );
  }
  return null;
}

export default Pool;